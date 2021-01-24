import {NAV_STATE_CHANGE} from '../types/types';

const initialState = {
  active: 0,
};

export const activeReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV_STATE_CHANGE:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};
