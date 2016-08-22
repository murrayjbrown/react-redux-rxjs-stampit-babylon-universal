import { injectReducer } from '../../store/reducers';
import { endLoading } from '../../store/modules/global';
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer').default;
      const reducer = require('./modules/counter').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer });

      /*  Return getComponent   */
      if (store.getState().router.locationBeforeTransitions.pathname
      === nextState.location.pathname) {
        cb(null, Counter);
        store.dispatch(endLoading(nextState.location.pathname));
      }

      /* Webpack named bundle   */
    }, 'counter');
  },
});
