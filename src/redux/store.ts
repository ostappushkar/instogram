import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import posts from './posts';
import login from './user';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
let middleware = compose(applyMiddleware(logger, thunk));
const Store = createStore(combineReducers({login, posts}), middleware);

export default Store;
