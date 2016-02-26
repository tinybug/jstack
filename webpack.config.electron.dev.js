const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.assign({}, baseConfig);

config.devtool = 'cheap-module-eval-source-map';
config.entry = {
  bundle: './app/index.js',
};
config.target = 'electron';
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.RUNTIME': '"electron"',
  }),
];

module.exports = config;
