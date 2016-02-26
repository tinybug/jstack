const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
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
