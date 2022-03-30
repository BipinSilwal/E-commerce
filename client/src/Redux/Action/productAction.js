import {
  ALL_PRODUCTS_BEGIN,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
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

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
