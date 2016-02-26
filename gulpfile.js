/* eslint-disable strict */
'use strict';

const gulp = require('gulp');
const gulpPkg = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackWebDevConfig = require('./webpack.config.web.dev');
const webpackWebProdConfig = require('./webpack.config.web.prod');
const webpackElectronDevConfig = require('./webpack.config.electron.dev');
const webpackElectronProdConfig = require('./webpack.config.electron.prod');
const packager = require('electron-packager');
const del = require('del');
const sequence = require('run-sequence');

gulp.task('clean', (cb) => {
  del(['./dist', './build']);
  cb();
});

gulp.task('setEnv', (cb) => {
  gulpPkg.env({
    file: '.env.json',
  });
  cb();
});

gulp.task('webpack', (cb) => {
  let webpackConfig = null;

  if (process.env.RUNTIME === 'web') {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig = webpackWebProdConfig;
    } else {
      webpackConfig = webpackWebDevConfig;
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig = webpackElectronProdConfig;
    } else {
      webpackConfig = webpackElectronDevConfig;
    }
  }

  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gulpPkg.util.PluginError('webpack', err);
    gulpPkg.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('copy', () => {
  return gulp.src(['package.json', 'app/electron.html', 'app/electron.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('package', (cb) => {
  packager({
    dir: './dist',
    name: 'easub',
    platform: process.env.PLATFORM,
    asar: true,
    arch: process.env.ARCH,
    version: '0.36.8',
    out: './build',
    overwrite: true,
  }, (err, appPath) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(appPath);
      cb();
    }
  });
});

gulp.task('default', (cb) => {
  sequence('clean', 'setEnv', 'webpack', 'copy', 'package', cb);
});
