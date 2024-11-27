import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../actions/userAction.js";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case SEARCH_USER_REQUEST:
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload), // Assuming you return the ID of deleted user
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case EDIT_USER_FAIL:
    case DELETE_USER_FAIL:
    case SEARCH_USER_FAIL:
    case GET_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
