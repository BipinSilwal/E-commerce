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
  USER_PROFILE_BEGIN,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
} from '../constant/userConstant';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
    case SIGNUP_BEGIN:
    case LOAD_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_FAIL:
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SIGNUP_FAIL:
    case LOAD_USER_FAIL:
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };
    case USER_PROFILE_RESET:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
