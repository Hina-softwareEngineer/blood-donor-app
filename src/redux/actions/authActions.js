import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOADING,
} from '../types/types';

import {signUpUser} from '../../middleware/queries/signup';

const LOCALHOST = 'http://192.168.1.171:5000';

export const loginSignupUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  };
};
export const loginSignupError = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: data,
    });
  };
};

export const loadingUserState = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOADING,
      payload: data,
    });
  };
};
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  };
};
