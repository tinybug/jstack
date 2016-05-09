const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const path = require('path');
const _ = require('lodash');

const config = _.merge({}, baseConfig);

config.devtool = 'cheap-module-eval-source-map';
config.devServer = {
  contentBase: 'app/www',
  devtool: 'cheap-module-eval-source-map',
  hot: true,
  inline: true,
  port: 3000,
  
  // all routes will return index.html
  historyApiFallback: {
    index: 'index.html',
  },
};
config.entry = [
  'webpack/hot/dev-server',
  'webpack/hot/only-dev-server',
  path.join(__dirname, 'app/index.js'),
];
config.historyApiFallback = true;
config.output.chunkFilename = '[id].chunk.js';
config.output.publicPath = '/';
config.output.path = path.join(__dirname, 'app/www');
config.output.filename = 'bundle.js';
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('share.js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.RUNTIME': '"web"',
    'process.env.NODE_ENV': '"development"',
  }),
];

module.exports = config;
