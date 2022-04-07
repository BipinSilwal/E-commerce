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
  USER_PASSWORD_BEGIN,
  USER_PASSWORD_FAIL,
  USER_PASSWORD_SUCCESS,
  USER_PROFILE_BEGIN,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
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

export const passwordUpdate = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_PASSWORD_BEGIN,
      });

      const { data } = await axios.put('/api/v1/password/update', userData);

      console.log(data);

      dispatch({
        type: USER_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
};

export const profileUpdate = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_PROFILE_BEGIN,
      });

      const { data } = await axios.put('/api/v1/profile/update', userData);

      console.log(data);

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
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

export const passwordForgot = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const { data } = await axios.post(`/api/v1/password/forgot`, email);
      console.log(data);

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.msg,
      });
      console.log(error);
    }
  };
};

export const passwordReset = (currentPassword, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `/api/v1/reset/${token}`,
        currentPassword
      );
      console.log(data);

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
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
