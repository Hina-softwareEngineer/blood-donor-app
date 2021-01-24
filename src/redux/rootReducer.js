import {combineReducers} from 'redux';
import {authReducer} from './reducers/authReducer';
import {activeReducer} from './reducers/navReducer';

export const rootReducer = combineReducers({
  userState: authReducer,
  navState: activeReducer,
});
