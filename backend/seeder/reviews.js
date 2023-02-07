const ObjectId = require("mongodb").ObjectId

const reviews = [
    {
    comment: "The flower is pretty and price is also good. The only issue is the floral is not enough.",
    rating: 4,
    user: { _id: ObjectId(), name: "Sara Green" },
  },
  {
    comment: "Very fresh flower. Best shopping experience online ever!",
    rating: 5,
    user: { _id: ObjectId(), name: "Ann White" },
  },
  {
    comment: "Beautiful bouquet, but too expensive, not worth the price.",
    rating: 3,
    user: { _id: ObjectId(), name: "Katty Lee" },
  },
  {
    comment: "Love the pink color, hopefully I can buy purple lily soon from this shop.",
    rating: 4,
    user: { _id: ObjectId(), name: "Lin Wang" },
  },
  {
    comment: "Bought red rose for my girl frend, she really loves it, definitely recommend!",
    rating: 5,
    user: { _id: ObjectId(), name: "Ho Phi" },
  },
]

module.exports = reviews
