import { argv } from 'yargs';

import webpackConfig from './config/webpack.test.config';
import _debug from 'debug';

const debug = _debug('app:karma');
debug('Create configuration.');

const karmaConfig = {
  basePath: '', // project root in relation to bin/karma.js
  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,
  autoWatchBatchDelay: 300,
  files: [
    {
      pattern: './tests/test-bundler.js',
      watched: true,
      served: true,
      included: true
    }
  ],
  colors: true,
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  captureTimeout: 60000,
  preprocessors: {
    //'tests/test-bundler.js': ['webpack']
     'tests/test-bundler.js': ['webpack', 'sourcemap']
  },
  client: {
    mocha: {
      reporter: 'html', // change Karma's debug.html to the mocha web reporter
      ui: 'bdd',
      timeout: 15000
    }
  },
  browsers: ['Chrome'],

  webpack: {
     devtool: 'inline-source-map',
    //devtool: 'cheap-module-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
// Enzyme fix, see:
// https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    quiet: false,
    noInfo: true,
    hot: true,
    inline: true,
    progress: true,
    lazy: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  },
  coverageReporter: {
    reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
    ]
  }
};


karmaConfig.reporters.push('coverage');
karmaConfig.webpack.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  include: new RegExp('src'),
  loader: 'isparta',
  exclude: /node_modules/
}];

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);

