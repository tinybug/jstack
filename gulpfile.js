/* eslint-disable strict */
'use strict';

const gulp = require('gulp');
const gulpPkg = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackWebProdConfig = require('./webpack.config.web.prod');
const del = require('del');
const sequence = require('run-sequence');

const PATH_SPEC = {
  APP_FILE: './dist',
};

const FILE_SPEC = {
  ENV: '.env.json',
  MAIN_HTML: 'app/www/index.html',
};

gulp.task('clean', (cb) => {
  del([
    PATH_SPEC.APP_FILE,
  ]);
  cb();
});

gulp.task('setEnv', (cb) => {
  gulpPkg.env({
    file: FILE_SPEC.ENV,
  });
  cb();
});

gulp.task('webpack', (cb) => {
  let webpackConfig = webpackWebProdConfig;
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gulpPkg.util.PluginError('webpack', err);
    gulpPkg.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('copy', () => {
  return gulp.src([
    FILE_SPEC.MAIN_HTML,
  ]).pipe(gulp.dest(PATH_SPEC.APP_FILE));
});

gulp.task('default', ['setEnv'], (cb) => {
  sequence('clean', 'webpack', 'copy', cb);
});
