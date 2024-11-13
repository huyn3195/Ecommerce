import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "../actions/categoryAction.js";

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true, categoryId: action.payload };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
