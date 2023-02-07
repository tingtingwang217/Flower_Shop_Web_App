require("dotenv").config();
const connectDB = require("../config/db");
connectDB();

const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");
const userData = require("./users");
const orderData = require("./orders");

const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");

//The async function declaration declares an async function where the await keyword is permitted within the function body. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.
const importData = async () => {
  try {
    //delete all data first
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();

    await Category.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Order.collection.deleteMany({});

    //if the thrid arg from command line is not -d, import all data, otherwise, delete all data
    //the command is defined in package.json backend
    if (process.argv[2] !== "-d") {
      await Category.insertMany(categoryData);
      const reviews = await Review.insertMany(reviewData);
      
      //add corresponding review to products
      const sampleProducts = productData.map((product) => {
        reviews.map((review) => { 
          product.reviews.push(review._id);
        });
        return { ...product };
      });

      await Product.insertMany(sampleProducts);
      await User.insertMany(userData);
      await Order.insertMany(orderData);

      console.log("Seeder data imported successfully");
      process.exit();
      return
    }
    console.log("Seeder data deleted successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();

