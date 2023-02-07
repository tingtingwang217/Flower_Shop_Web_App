import * as actionTypes from "../constants/cartConstants";
import axios from "axios"; //a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data

//add to cart
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    //axios make a request with product id through route "/api/products/get-one/${productId}": get a product through its id
    //we use await so the function is async
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {  //data interested in transporting to the server when making an API request are the following:
            productID: data._id,
            name: data.name,
            price: data.price,
            image: data.images[0] ?? null,
            count: data.count,
            quantity,
        },
    })

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}


//remove from cart
export const removeFromCart = (productID, quantity, price) =>  (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: {productID: productID, quantity: quantity, price: price}
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}
