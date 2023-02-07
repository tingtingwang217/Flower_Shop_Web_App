import { LOGIN_USER, LOGOUT_USER } from '../constants/userConstants'
import axios from 'axios'

//set user state
export const setReduxUserState = (userCreated) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: userCreated
    })
}


//logout
export const logout = () => (dispatch) => {
    document.location.href = "/login";
    axios.get('/api/logout')
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    dispatch({ type: LOGOUT_USER })
}
