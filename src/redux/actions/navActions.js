import {NAV_STATE_CHANGE} from '../types/types';

export const bottomNavStateChange = (data) => {
  return (dispatch) => {
    dispatch({
      type: NAV_STATE_CHANGE,
      payload: data,
    });
  };
};
