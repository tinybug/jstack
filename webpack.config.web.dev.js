const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.assign({}, baseConfig);

config.devtool = 'cheap-module-eval-source-map';
config.entry = {
  bundle: ['webpack-hot-middleware/client?reload=true', './app/index.js'],
};
config.output.chunkFilename = '[id].chunk.js';
config.output.publicPath = '/static/';
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
