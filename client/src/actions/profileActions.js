import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

import { logoutUser } from "./authActions";

/* // Get current profile
export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  const res = await axios.get("/api/profile");

  dispatch({ type: GET_PROFILE, payload: res.data }).catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  );
}; */

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addProfilePicture = (imgData, history) => dispatch => {
  axios
    .post("/api/profile/profilepic", imgData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Delete Account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("You sure you want to delete account?")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch(logoutUser()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
