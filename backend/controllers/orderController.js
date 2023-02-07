const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

//get the specific user's orders
const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: ObjectId(req.user._id) });
        res.send(orders);
    } catch (error) {
        next(error)
    }
}



//get orders details by order's object id. Show user's name, not show password, isAdmin...
const getOrder = async (req, res, next) => {
    try {
       const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        res.send(order);
    } catch (err) {
        next(err)
    }
}




//create new orders
const createOrder = async (req, res, next) => {
    try {
        const { cartItems, orderTotal, paymentMethod } = req.body;
        //if any of these para not exist, remind
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }

        //map through the items in the cart, return each product id        
        let ids = cartItems.map((item) => {
            return item.productID;
        })
        //return number of items in the cart
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        })

        //find items which id is in ids array(all cart items)
        await Product.find({ _id: { $in: ids } }).then((products) => {
            products.forEach(function (product, idx) {
                //for each products, increase the number of sales and save it
                product.sales += qty[idx];
                product.save();
            })
        })
        //create new order object
        const order = new Order({
            user: ObjectId(req.user._id),
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
        })
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);

    } catch (err) {
        next(err)
    }
}




//update order to paid status
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);

    } catch (err) {
        next(err);
    }
}





//update order to paid status
const updateOrderToDelivered = async (req, res, next) => {
    try {
       const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}




//get all orders and show users sort in desc order
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user","-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (err) {
        next(err)
    }
}





//get orders in a time range
const getOrderForAnalysis = async (req, res, next) => {
    try {
        const start = new Date(req.params.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.date);
        end.setHours(23, 59, 59, 999);

        const order = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({ createdAt: "asc" });
        res.send(order);

    } catch (err) {
        next(err)
    }
}

module.exports = {getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderForAnalysis}
