import axiosInstance from "../../axiosConfig.js";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from "../../constant/productConstant.js";
export const listProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axiosInstance.get(`/product?keyword=${keyword}`);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

// Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await axiosInstance.delete(`/product/remove/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update product details
export const updateProduct = (id, updatedProduct) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const { data } = await axiosInstance.put(
      `/product/update/${id}`,
      updatedProduct
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Add a new product

export const addProduct = (newProductFields) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST });

    // Convert the fields into FormData to match the expected structure on the backend
    const formData = new FormData();
    Object.keys(newProductFields).forEach((key) => {
      formData.append(key, newProductFields[key]);
    });

    const { data } = await axiosInstance.post(`/product/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
