const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

//get users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password"); //no show password
    return res.json(users);
  } catch (err) {
    next(err);
  }
};




//register user and create cookie with access token
const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    //create user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists"); //if email already register
    } else {
      const hashedPassword = hashPassword(password);//hash password so no see avoid hacker
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      //
      res
        .cookie( // create cookies(text file) sent to web browser(saved in web browser)
          "access_token", //cookie name is "access_token"(key)
          generateAuthToken( //generate access token, token saved in web browser, then each reuqest sent by user, access token will be verified to confirm user is logged in
            user._id, //args
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true, //cookie cannot be used in http
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({ //return json without password
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};





//log in user and generate cookie with access token 
const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email }).orFail();
    //compare input password with hashed password in the data base
    if (user && comparePasswords(password, user.password)) {
      //define cookie parameters
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        //if not log out, create new cookie object, will be able to log in the browser in next 7 days after closing web browser without giving name and password
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};






//update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    //assign properties
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    //if new password different from the password in database, assign new hashed password
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};




//get user profile
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        return res.send(user);
    } catch(err) {
        next(err)
    }
}




//write reviews
const writeReview = async (req, res, next) => {
    try {

        const session = await Review.startSession(); //database transaction: to provide reliable units of work that allow correct recovery from failures and keep a database consistent even in cases of system failure

        // get comment, rating from request.body:
        const { comment, rating } = req.body;
        // validate request:
        if (!(comment && rating)) {
            return res.status(400).send("All inputs are required");
        }

        // create review id manually because it is needed also for saving in Product collection
        //in product, there is a field of an array of review, which is array of review id
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = ObjectId();
        session.startTransaction();
        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
            }
        ],{ session: session })

        //populate all reviews for specific product
        const product = await Product.findById(req.params.productId).populate("reviews").session(session);
        

        //one user can only write one review for one product
        //if reviews' user id = current user, cannot review
        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send("product already reviewed");
        }


        //add reviews
        let prc = [...product.reviews];
        prc.push({ rating: rating }); //add product rating to prc array
        product.reviews.push(reviewId);
        //calculate rating
        if (product.reviews.length === 1) { //only 1 review
            product.rating = Number(rating); //product rating = this rating
            product.reviewsNumber = 1;
        } else {
            product.reviewsNumber = product.reviews.length;
            //calculate a product rating: sum of all rating/no. of reviews
            let ratingCalc = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
            product.rating = Math.round(ratingCalc)
        }
        await product.save();

        await session.commitTransaction();//if all previous step of the transaction succeed, save the transaction in the database
        session.endSession();
        res.send('review created')
    } catch (err) {
        await session.abortTransaction();
        next(err)   
    }
}




//get user by id
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail();
        return res.send(user);
    } catch (err) {
       next(err); 
    }
}






//update user
const updateUser = async (req, res, next) => {
    try {
       const user = await User.findById(req.params.id).orFail(); 

        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin

        await user.save();

        res.send("user updated");

    } catch (err) {
       next(err); 
    }
}





//delete user
const deleteUser = async (req, res, next) => {
    try {
       const user = await User.findById(req.params.id).orFail();
       await user.remove(); 
       res.send("user removed");
    } catch (err) {
        next(err);
    }
}

module.exports = { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser };

