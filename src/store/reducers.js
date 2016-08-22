import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import global from './modules/global';

export const reducers = (asyncReducers) =>
  combineReducers({
    // Add sync reducers here
    router,
    global,
    ...asyncReducers
  });


export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(reducers(store.asyncReducers));
};

export default reducers;
