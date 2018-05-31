import axios from "axios";

import {
  GET_MESSAGES,
  MESSAGES_LOADING,
  GET_ERRORS,
  GET_SENT_MESSAGES,
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

// Get messages
export const getSentMessages = () => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get("api/messages/sent")
    .then(res =>
      dispatch({
        type: GET_SENT_MESSAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SENT_MESSAGES,
        payload: {}
      })
    );
};

// Send message
export const sendMessage = (postData, handle, subject) => dispatch => {
  axios
    .post(`api/messages/post/${handle}/${subject}`, postData)
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
