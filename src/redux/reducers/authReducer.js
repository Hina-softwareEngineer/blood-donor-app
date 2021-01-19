import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOADING,
} from '../types/types';
import {getObject, getString} from '../../middleware/AsyncStorage';

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  token: null,
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
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoaded: true,
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload.message,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
