import axiosInstance from "../../axiosConfig.js";

export const EDIT_USER_REQUEST = "EDIT_USER_REQUEST";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const SEARCH_USER_REQUEST = "SEARCH_USER_REQUEST";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAIL = "SEARCH_USER_FAIL";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const editUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_USER_REQUEST });
    const { data } = await axiosInstance.put(`/user/update/${id}`, userData);
    dispatch({ type: EDIT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    await axiosInstance.delete(`/user/delete/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
export const searchUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USER_REQUEST });
    const { data } = await axiosInstance.get(`/user/search/${id}`);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const { data } = await axiosInstance.get(`/user/profile`);
    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
