import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOGIN_BEGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
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

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
