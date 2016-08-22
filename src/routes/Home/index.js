import { endLoading } from '../../store/modules/global';
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HomeView = require('./components/HomeView').default;

      /*  Return getComponent   */
      if (store.getState().router.locationBeforeTransitions.pathname ===
      nextState.location.pathname) {
        cb(null, HomeView);
        store.dispatch(endLoading(nextState.location.pathname));
      }

      /* Webpack named bundle   */
    }, 'home-view');
  },
});
