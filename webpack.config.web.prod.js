const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.assign({}, baseConfig);

config.entry = {
  bundle: './app/index.js',
};
config.output.publicPath = '/static/';
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('share.js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
];

module.exports = config;
