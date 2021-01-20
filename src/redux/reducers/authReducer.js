import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOADING,
} from '../types/types';

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_LOADING:
      return {
        ...state,
        isLoaded: true,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoaded: true,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
