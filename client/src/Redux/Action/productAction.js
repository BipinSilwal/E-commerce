import {
  ALL_PRODUCTS_BEGIN,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  SINGLE_PRODUCT_BEGIN,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from '../constant/productConstant';

import axios from 'axios';

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_BEGIN });
      const { data } = await axios.get('/api/v1/products');

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.msg,
      });
      console.log(error);
    }
  };
};

// single products........................

export const oneProduct = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      dispatch({ type: SINGLE_PRODUCT_BEGIN });
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log(data);

      dispatch({
        type: SINGLE_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_PRODUCT_FAIL,
        payload: error.response.data.msg,
      });
      console.log(error);
    }
  };
};

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
