import {
  GET_MESSAGES,
  MESSAGES_LOADING,
  SEND_MESSAGE,
  GET_CURRENT_MESSAGE
} from "../actions/types";

const initialState = {
  conversations: null,
  currentMessage: null,
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
        conversations: [action.payload, ...state.posts]
      };
    }
    case GET_CURRENT_MESSAGE: {
      return {
        ...state,
        currentMessage: action.payload,
        loading: false
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        conversations: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
}
