const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: ['webpack-hot-middleware/client?reload=true', './app/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('share.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      { test: /\.(jpg|png)$/, loader: 'url?limit=8192' },
    ],
  },
};
