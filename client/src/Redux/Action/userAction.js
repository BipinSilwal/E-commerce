import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOAD_USER_BEGIN,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  SIGNUP_BEGIN,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from '../constant/userConstant';

export const loginUser = (currentUser) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_BEGIN,
      });

      const { data } = await axios.post('/api/v1/login', currentUser);

      console.log(data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.msg,
      });
    }
  };
};

export const signUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SIGNUP_BEGIN,
      });

      const { data } = await axios.post('/api/v1/signup', userData);

      console.log(data);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.msg,
      });
    }
  };
};
export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_USER_BEGIN,
      });

      const { data } = await axios.post('/api/v1/me');

      console.log(data);

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await axios.get('api/v1/logout');
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
};

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
