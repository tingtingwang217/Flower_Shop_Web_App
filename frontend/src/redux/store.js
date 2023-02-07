import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from './reducers/userReducers';
import { getCategoriesReducer } from "./reducers/categoryReducers";


//combine reducer into a single reducer function
const reducer = combineReducers({
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer,
    getCategories: getCategoriesReducer, 
})

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: sessionStorage.getItem("userInfo")
? JSON.parse(sessionStorage.getItem("userInfo"))
: {}




const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
        itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
        cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price, item) => price + item.price * item.quantity, 0) : 0
    },
    userRegisterLogin: { userInfo: userInfoInLocalStorage }
}

const middleware = [thunk]; //allows us to dispatch actions manually, gives us the power to incorporate some logic or run some asynchronous code before dispatching an action
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)))//set up the middleware



export default store;

