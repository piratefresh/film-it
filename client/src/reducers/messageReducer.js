import {
  GET_MESSAGES,
  MESSAGES_LOADING,
  SEND_MESSAGE,
  GET_SENT_MESSAGES
} from "../actions/types";

const initialState = {
  messages: null,
  sentMessages: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [action.payload, ...state.posts]
      };
    }
    case GET_SENT_MESSAGES: {
      return {
        ...state,
        sentMessages: action.payload,
        loading: false
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
}
