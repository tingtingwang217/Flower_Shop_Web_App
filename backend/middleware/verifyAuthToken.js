const jwt = require("jsonwebtoken")

//check if log in by verifying the access token
const verifyIsLoggedIn = (req, res, next) => {
    
    try {
        const token = req.cookies.access_token
        //no toekn in cookie
        if(!token) {
           return res.status(403).send("A token is required for authentication") 
        }

        //token exist
        try {
            //get the verfied decoded user object if have access token and has been verified
           const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
          return res.status(401).send("Unauthorized. Invalid Token")  
        }

    } catch(err) {
        next(err)
    }
}

const verifyIsAdmin = (req, res, next) => {
    //check if the token is admin: check the isAdmin section of the user in database
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).send("Unauthorized. Admin required")
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin }
