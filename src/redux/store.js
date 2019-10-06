import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherData from './weatherData';

let combinedReducers = combineReducers({
    data: weatherData,
})

let store = createStore(combinedReducers,applyMiddleware(thunk));
window.store = store;
export default store ; 