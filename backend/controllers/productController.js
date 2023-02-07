const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");

//get products with criterias: filter and search
const getProducts = async (req, res, next) => {
  try {
    let query = {}; //filter criteria(put all type of query conditions together)
    let queryCondition = false;

    //FILTERS
    //price criteria
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      //criteria: price less than Number
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    //rating criteria
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      //filter based on the rating, the rating is splitted by ","
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    //category criteria
    let categoryQueryCondition = {};
    //select category from search bar
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      //replace , to / to get the full route
      let a = categoryName.replaceAll(",", "/");
      //add "^" to become regex and only get category with such route
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }
    //select from the left filter part
    if (req.query.category) {
      queryCondition = true;
      //we can choose several categories and seprate them by ,
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      //overried the first search criteria
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    //attribute criteria
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ]
      //map through each element with reduce
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // removes first item: ram or color
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);//add to the accumulator(acc is required for reduce function)
          // console.dir(acc, { depth: null })
          return acc;
        } else return acc;
      }, []);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
    }

    //pagination: assign page number, if not exist, assign 1 to page number
    const pageNum = Number(req.query.pageNum) || 1;


    //SORT
    // sort by name, price etc.
    let sort = {};
    const sortOption = req.query.sort || "";
    //if sortoptions exist, get the sort option
    //the value of sort options is "price_1", split the value into two parts an get the first part
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      //sortOpt=1:asc; -1:desc; dynamic value, so put sortOpt[0] in[]
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }


    //TYPE IN SEARCH BAR 
    //type text in the search bar
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = {
        //score represent the accuracy of search result
        score: { $meta: "textScore" },
      };
      //sort based on score in asc order
      sort = { score: { $meta: "textScore" } };
    }

    //$and: "and" all query conditions(products satisfy all conditions at the same time)
    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    //GET RESULTS BASED ON ALL ABOVE CONDITIONS
    const totalProducts = await Product.countDocuments(query);//no of total products
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1)) //do not show the previous products on nth page, skip previous products
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage), //pagination link number up limit
    });
  } catch (error) {
    next(error);
  }
};






//get product by id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};








//get best sellers
const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } }, //category asc and sales desc orders
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },//group by category and only top sales with "first"
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },//sales must greater than 0
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },//only keep these fields in the results
      { $limit: 3 }, //get the top 3 categories
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};





//admin find products
const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 }) //sort in asc order
      .select("name price category"); //only need name, price and category
    return res.json(products);
  } catch (err) {
    next(err);
  }
};





//admin remove product by id
const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "product removed" });
  } catch (err) {
    next(err);
  }
};





//admin create new product
const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};





//admin update product
const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
     //set product name =new name; if new name is empty, set it to existing name 
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};





//admin upload files
const adminUpload = async (req, res, next) => {
    //upload to cloudinary when deploy the site remotely
    if (req.query.cloudinary === "true") {
        try {
            let product = await Product.findById(req.query.productId).orFail();
            product.images.push({ path: req.body.url });
            await product.save();
        } catch (err) {
            next(err);
        }
       return  //return since if upload remotely, no need to upload to database
    } 

  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    //get uploaddirectory
    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectory = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    ); //get path of image(directory)

    //find product for the corresponding image
    let product = await Product.findById(req.query.productId).orFail();

    //create array for a series of images
    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images; //several images
    } else {
      imagesTable.push(req.files.images); //only one image
    }

    //for each image, get upload path and move to specific directory
    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name); //random name for the file + extension
      var uploadPath = uploadDirectory + "/" + fileName;//entire path+name+file extension
      product.images.push({ path: "/images/products/" + fileName });
      //move uplaoded files to specified directory
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};






//admin delete images
const adminDeleteProductImage = async (req, res, next) => {
  //decode the path
  //if image on cloudinary, no need to remove from database
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
           await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail(); 
            return res.end();
        } catch(er) {
            next(er);
        }
        return
    }

  //remove from database  
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");//require file system
    fs.unlink(finalPath, (err) => {  //unlink 
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId }, //find it
      { $pull: { images: { path: imagePath } } } //pull the item from the array(remove)
    ).orFail();
    return res.end(); //does not return anything, but need to return
  } catch (err) {
    next(err);
  }
};





module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};

