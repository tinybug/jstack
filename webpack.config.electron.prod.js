const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.assign({}, baseConfig);

config.entry = {
  bundle: './app/index.js',
};
config.target = 'electron';
config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
  new webpack.DefinePlugin({
    'process.env.RUNTIME': '"electron"',
    'process.env.NODE_ENV': '"production"',
  }),
];

module.exports = config;
