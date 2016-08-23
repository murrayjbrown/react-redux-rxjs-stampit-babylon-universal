import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import makeRoutes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/createStore';

// ========================================================
// Mount Setup
// ========================================================
const MOUNT_ELEMENT = document.getElementById('root');

// ========================================================
// Router and History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const store = createStore(window.__data, browserHistory,
  window.devToolsExtension && window.devToolsExtension()
);// eslint-disable-line no-underscore-dangle
let routes = makeRoutes(store);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

// ========================================================
// Render Setup
// ========================================================
let render = (key = null) => {
  const Root = require('./containers/Root').default;// eslint-disable-line global-require
  routes = require('./routes/index').default(store);// eslint-disable-line global-require
  let App = null;
  if (__DEV__) {
    App = (
      <AppContainer>
        <Root routerKey={key} store={store} history={history} routes={routes} />
      </AppContainer>
    );
  } else {
    App = (
      <Root store={store} history={history} routes={routes} />
    );
  }
  ReactDOM.render(App, MOUNT_ELEMENT);
};

// ========================================================
// HMR Setup
// ========================================================
// Enable HMR and catch runtime errors in RedBox.
// This code is excluded from production bundle.
if (__DEV__ && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');// eslint-disable-line global-require
    ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT);
  };
  render = () => {
    try {
      renderApp(Math.random());
    } catch (e) {
      renderError(e);
    }
  };
  module.hot.accept(['./containers/Root', './routes/index.js'], () => {
    render();
  });
}

// Use Redux DevTools chrome extension if debugging is enabled
if (__DEVTOOLS__) {
  if (window.devToolsExtension) window.devToolsExtension.open();
}

// ========================================================
// GO!
// ========================================================

/**
 * This magic allows router to load correct reducer and
 * components depending on which route we are in
 */
match({ history, routes }, () => {
  render();
});
