import { injectReducer } from '../../store/reducers';
import { endLoading } from '../../store/modules/global';
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

export default (store) => ({
  path: 'game',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const Game = require('./containers/GameContainer').default;
      const reducer = require('./modules/game').default;

      /*  Add the reducer to the store on key 'game'  */
      injectReducer(store, { key: 'game', reducer });

      /*  Return getComponent   */
      if (store.getState().router.locationBeforeTransitions.pathname
      === nextState.location.pathname) {
        cb(null, Game);
        store.dispatch(endLoading(nextState.location.pathname));
      }

      /* Webpack named bundle   */
    }, 'game');
  }
});
