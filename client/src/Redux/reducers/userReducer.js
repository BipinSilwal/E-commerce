import {
  CLEAR_ERRORS,
  LOGIN_BEGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../constant/userConstant';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
