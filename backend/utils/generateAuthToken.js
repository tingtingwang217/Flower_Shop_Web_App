const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" } //token expire in 7 hours
  );
};
module.exports = generateAuthToken
