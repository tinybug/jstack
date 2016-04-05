const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const _ = require('lodash');

const config = _.merge({}, baseConfig);

config.devtool = 'cheap-module-eval-source-map';
config.entry = {
  bundle: './app/index.js',
};
config.target = 'electron';
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.RUNTIME': '"electron"',
    'process.env.NODE_ENV': '"development"',
  }),
];

module.exports = config;
