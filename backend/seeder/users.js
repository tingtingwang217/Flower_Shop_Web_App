const bcrypt = require("bcryptjs") //a library hash your password
const ObjectId = require("mongodb").ObjectId;

const users = [
      {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
      _id: ObjectId("625add3d78fb449f9d9fe2ee"),
    name: 'Sara',
    lastName: 'Green',
    email: 'sara@green.com',
    password: bcrypt.hashSync('sara@green.com', 10),
  },

]

module.exports = users
