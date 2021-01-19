import axios from 'axios';
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOADING,
} from '../types/types';
import {
  storeObject,
  storeString,
  getObject,
  getString,
} from '../../middlewares/AsyncStorage/index';

const LOCALHOST = 'http://192.168.1.171:5000';

export const loginUser = (data) => {
  return (dispatch) => {
    // console.log('data action', data);

    axios
      .post(`${LOCALHOST}/api/auth/login`, data)
      .then((res) => {
        // console.log('login response --->', res.data);
        storeObject('user', res.data.user);
        storeString('token', res.data.token);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('error --->', err);
        storeString('token', null);
        storeObject('user', null);
        try {
          dispatch({
            type: USER_LOGIN_FAILED,
            payload: err.data,
          });
        } catch (e) {
          dispatch({
            type: USER_LOGIN_FAILED,
            payload: {message: 'Network Error'},
          });
        }
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    storeString('token', null);
    storeObject('user', null);
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    let token = await getString('token');
    let user = await getObject('user');
    // console.log('dispatching----load user', token, user);
    if (user && token) {
      dispatch({
        type: USER_LOADING,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
    }
  };
};
