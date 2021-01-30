import {combineReducers} from 'redux';
import {authReducer} from './reducers/authReducer';
import {activeReducer} from './reducers/navReducer';
import {searchReducer} from './reducers/searchReducer';

export const rootReducer = combineReducers({
  userState: authReducer,
  navState: activeReducer,
  searchState: searchReducer,
});
