import {combineReducers} from 'redux';
import {authReducer} from './reducers/authReducer';

export const rootReducer = combineReducers({
  userState: authReducer,
});
