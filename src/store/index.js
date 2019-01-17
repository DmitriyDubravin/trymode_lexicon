import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import {
    categoriesList
} from './reducers';


const reducers = combineReducers({
    categoriesList
});


const store = createStore(reducers, {}, applyMiddleware(logger));

export default store;
