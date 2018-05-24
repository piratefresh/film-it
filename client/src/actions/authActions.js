import {
  GET_ERRORS,
  SET_CURRENT_USER,
  FETCH_GOOGLE_USER,
  LOGOUT_GOOGLE_USER
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import getCookie from "../components/common/CheckCookie";
import deleteCookie from "../components/common/DeleteCookie";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/local/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/local/login", userData)
    .then(res => {
      // Save to localstorage
      console.log(res.data);
      const { token } = res.data;
      // Set Token to LS
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  window.location.replace("/auth/logout");
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  deleteCookie("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

/* Google Login */
/* export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/users/current");

  dispatch({ type: FETCH_GOOGLE_USER, payload: res.data }); // changed res to res.data
}; */

/* Google Login */
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/users/current");
  console.log(res);
  try {
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginGoogleUser = () => dispatch => {
  // Get Cookie JWTTOKEN
  const token = getCookie("jwtToken");
  // Set token to Auth Header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
};

export const logoutGoogleUser = () => async dispatch => {
  await axios.get("/auth/logout");
  deleteCookie("jwtToken");
  const emptyState = {};

  dispatch({ type: LOGOUT_GOOGLE_USER, payload: emptyState });
};
