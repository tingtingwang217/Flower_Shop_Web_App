const bcrypt = require("bcryptjs") //enables storing of passwords as hashed passwords instead of plaintext
const salt = bcrypt.genSaltSync(10) //generate random string to hide the passcode

const hashPassword = password => bcrypt.hashSync(password, salt) //hash passcode
const comparePasswords = (inputPassword, hashedPassword) => bcrypt.compareSync(inputPassword, hashedPassword)

module.exports = { hashPassword, comparePasswords }