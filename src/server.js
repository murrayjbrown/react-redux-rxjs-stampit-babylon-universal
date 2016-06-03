import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './index';
import PrettyError from 'pretty-error';
import http from 'http';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import makeRoutes from './routes';


const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');


const pretty = new PrettyError();
const app = new Express();

const server = new http.Server(app);


app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));


const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || `${__dirname}/server/cloud/main.js`,
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myAppId', // Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:3000/api,',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'] // List of classes to support for query subscriptions
  }
});

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: process.env.SERVER_URL || 'http://localhost:3000/api',
      appId: process.env.APP_ID || 'myAppId',
      masterKey: process.env.MASTER_KEY || 'myAppId', // Add your master key here. Keep it secret!
      appName: 'MyApp'
    }],

  users: [
    {
      user: 'admin',
      pass: 'password'
    }
  ]

}, true);

ParseServer.createLiveQueryServer(server);


// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/api';
app.use(mountPath, api);

app.use('/parse-dashboard', dashboard);


app.use((req, res) => {
  if (__DEV__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const initialState = { global: { loading: true } };
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(initialState, memoryHistory);
  const routes = makeRoutes(store);
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.router,
  });

  function hydrateOnClient() {
    res.send(`<!doctype html>\n${ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes, location: req.url || '/' }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <RouterContext children={routes} {...renderProps} />
          </div>
        </Provider>
      );

      res.status(200);

      global.navigator = { userAgent: req.headers['user-agent'] };


      res.send(`<!doctype html>\n${ReactDOM.renderToString(
        <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`);
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

