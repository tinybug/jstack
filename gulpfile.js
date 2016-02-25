/* eslint-disable strict */
'use strict';

const gulp = require('gulp');
const gulpPkg = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackWebDevConfig = require('./webpack.config.web.dev');
const webpackWebProdConfig = require('./webpack.config.web.prod');

gulp.task('setEnv', (cb) => {
  gulpPkg.env({
    file: '.env.json',
  });
  cb();
});

gulp.task('webpack', (cb) => {
  let webpackConfig = null;

  if (process.env.NODE_ENV === 'production') {
    webpackConfig = webpackWebProdConfig;
  } else {
    webpackConfig = webpackWebDevConfig;
  }

  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gulpPkg.util.PluginError('webpack', err);
    gulpPkg.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('default', ['setEnv', 'webpack']);
