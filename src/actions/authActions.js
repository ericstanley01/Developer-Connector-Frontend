import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types"

const baseApiURL = process.env.REACT_APP_API_URL;

// register user
export const registerUser = (userData, history) => dispatch => {
   axios.post(baseApiURL + '/api/users/register', userData)
      .then(user => {
         history.push('/login');
         dispatch({
            type: CLEAR_ERRORS
         });
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         }));
}

// login and get user token
export const loginUser = (userData) => dispatch => {
   axios.post(baseApiURL + '/api/users/login', userData)
      .then(user => {
         // save to local storage
         const { token } = user.data;
         // set token to local storage
         localStorage.setItem('jwtToken', token);
         // set token to auth header
         setAuthToken(token);
         // decode token to get user data
         const decodedToken = jwtDecode(token);
         // set current user
         dispatch(setCurrentUser(decodedToken));
         dispatch({
            type: CLEAR_ERRORS
         });
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         }));
}

// set logged in user
export const setCurrentUser = (decodedToken) => {
   return {
      type: SET_CURRENT_USER,
      payload: decodedToken
   }
}

// logout user
export const logoutUser = () => dispatch => {
   // remove token from local storage
   localStorage.removeItem('jwtToken');
   // remove auth header for future requests
   setAuthToken(false);
   // set current user to empty object which will also set isAuthenticated to false
   dispatch(setCurrentUser({}));
}