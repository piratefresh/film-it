import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  EDIT_POST
} from "./types";

// Add Post
export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Get Post
export const getPostByPostId = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Posts
export const getPostsBySearch = query => dispatch => {
  dispatch(setPostLoading);
  axios
    .get(`/api/posts?search=${query}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Posts by user
export const getPostsById = id => dispatch => {
  dispatch(setPostLoading);
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Edit Post
export const editPost = (id, postData, history) => dispatch => {
  dispatch(setPostLoading);
  axios
    .put(`api/posts/${id}/edit`, postData)
    .then(res =>
      dispatch({
        type: EDIT_POST,
        payload: res.data
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add like
export const addApplication = (id, data, history) => dispatch => {
  dispatch(setPostLoading);
  axios
    .post(`/api/posts/${id}/apply`, data)
    .then(res => dispatch(getPosts()))
    .then(res => history.push(`/posts/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  dispatch(setPostLoading);
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
