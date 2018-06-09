import axios from "axios";
import {
  GET_MESSAGES,
  MESSAGES_LOADING,
  GET_ERRORS,
  GET_CURRENT_MESSAGE,
  GET_UNREAD_MESSAGE_COUNT,
  SEND_MESSAGE
} from "./types";

// Get messages
export const getMessages = () => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get("/api/messages")
    .then(res =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: {}
      })
    );
};

// Get Unread messages count
export const getUnreadMessagesCount = data => dispatch => {
  dispatch({
    type: GET_UNREAD_MESSAGE_COUNT,
    payload: data.count
  }).catch(err =>
    dispatch({
      type: GET_UNREAD_MESSAGE_COUNT,
      payload: {}
    })
  );
};

// Get message by id
export const getMessageById = id => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get(`/api/messages/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_MESSAGE,
        payload: {}
      })
    );
};

// Send message
export const sendMessage = postData => dispatch => {
  axios
    .post(`api/messages/convo`, postData)
    .then(res =>
      dispatch({
        type: SEND_MESSAGE,
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

// Profile loading
export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING
  };
};
