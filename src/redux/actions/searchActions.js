import {CHANGE_SEARCH_VALUE} from '../types/types';

export const changeSearchValue = (value) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SEARCH_VALUE,
      payload: value,
    });
  };
};
