import {changeSearchValue} from '../actions/searchActions';
import {CHANGE_SEARCH_VALUE} from '../types/types';

const initialState = {
  search: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};
