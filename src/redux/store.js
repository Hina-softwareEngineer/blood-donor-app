import {rootReducer} from './rootReducer';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const middlewares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
