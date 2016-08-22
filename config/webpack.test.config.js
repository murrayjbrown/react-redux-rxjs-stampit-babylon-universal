// Webpack config for creating the production bundle.
var path = require('path');
var cssnano = require('cssnano');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));


module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'babel-polyfill',
      'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
      'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  resolve: { alias: {} },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: 'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ],
  progress: true,
  resolve: {
    root: path.resolve(__dirname, '../src'),
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      },
      __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    webpackIsomorphicToolsPlugin
  ]
};



