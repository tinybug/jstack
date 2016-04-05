const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const _ = require('lodash');

const config = _.merge({}, baseConfig);

config.entry = {
  bundle: './app/index.js',
};
config.output.chunkFilename = '[id].chunk.js';
config.output.publicPath = '/static/';
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('share.js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
  new webpack.DefinePlugin({
    'process.env.RUNTIME': '"web"',
    'process.env.NODE_ENV': '"production"',
  }),
];

module.exports = config;
