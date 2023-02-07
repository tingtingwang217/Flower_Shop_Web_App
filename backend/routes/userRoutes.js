const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const {getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser} = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)

// user logged in routes:
router.use(verifyIsLoggedIn); //use it for any user routes
router.put("/profile", updateUserProfile);
router.get('/profile/:id', getUserProfile)
router.post('/review/:productId', writeReview)

// admin routes:
router.use(verifyIsAdmin);//use it for any user routes
router.get("/", getUsers) //api/users
router.get("/:id", getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
