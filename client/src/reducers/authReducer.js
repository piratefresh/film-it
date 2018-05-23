import {
  SET_CURRENT_USER,
  FETCH_GOOGLE_USER,
  LOGOUT_GOOGLE_USER
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case FETCH_GOOGLE_USER:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGOUT_GOOGLE_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    default:
      return state;
  }
}
