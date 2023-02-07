const ObjectId = require("mongodb").ObjectId

//22 dummy orders and map through it, first variable no need, second is the index
const orders = Array.from({length: 22}).map((_, idx) => {
    let day = 20
    if(idx < 10) {
        var hour = "0" + idx
        var subtotal = 100
    } else if(idx > 16 && idx < 21) {
        var hour = idx
        var subtotal = 100 + 12*idx
    } else {
        var hour = idx
        var subtotal = 100
    }
    return {
        user:ObjectId("625add3d78fb449f9d9fe2ee"),
        orderTotal: {
            itemsCount: 6,
            cartSubtotal: subtotal
        },
        cartItems: [
            {
                name: "Flowers",
                price: 80,
                image: {path: "/images/lilyRed.jpg"},
                quantity: 3,
                count: 12
            }
        ],
        paymentMethod: "PayPal",
        isPaid: false,
        isDelivered: false,
        createdAt: `2023-01-${day}T${hour}:12:36.490+00:00`
    }
})

module.exports = orders
