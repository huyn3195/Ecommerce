import axiosInstance from "../../axiosConfig.js";

export const CREATE_CATEGORY_REQUEST = "CREATE_CATEGORY_REQUEST";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAIL = "CREATE_CATEGORY_FAIL";

export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL";

export const UPDATE_CATEGORY_REQUEST = "UPDATE_CATEGORY_REQUEST";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAIL = "UPDATE_CATEGORY_FAIL";

export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAIL = "DELETE_CATEGORY_FAIL";

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const { data } = await axiosInstance.post(`/category/create`, categoryData);

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const { data } = await axiosInstance.get(`/category/all`);
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

export const updateCategory =
  (categoryId, categoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
      const { data } = await axiosInstance.put(
        `/category/update/${categoryId}`,
        categoryData
      );
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    await axiosInstance.delete(`/category/delete/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
