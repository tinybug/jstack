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
const innosetup = require('innosetup-compiler');

const PATH_SPEC = {
  APP_FILE: './dist',
  APP_PACKAGE: './build',
  APP_INSTALLER: './installer',
};

const FILE_SPEC = {
  ENV: '.env.json',
  PACKAGE: 'package.json',
  MAIN_HTML: 'app/electron.html',
  MAIN_JS: 'app/electron.js',
  APP_ENV: 'app/electron.env.js', 
  MAC_INSTALL_CONFIG: 'app/spec/mac/appdmg.json',
  WIN_INSTALL_CONFIG: 'app/spec/win/installer.iss',
};

const APP_SPEC = {
  APP_NAME: 'fdb',
  RUNTIME_VERSION: '0.36.8',
};

gulp.task('clean', (cb) => {
  del([
    PATH_SPEC.APP_FILE,
    PATH_SPEC.APP_PACKAGE,
    PATH_SPEC.APP_INSTALLER,
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
  return gulp.src([
    FILE_SPEC.PACKAGE,
    FILE_SPEC.MAIN_HTML,
    FILE_SPEC.MAIN_JS,
    FILE_SPEC.APP_ENV,
  ]).pipe(gulp.dest(PATH_SPEC.APP_FILE));
});

gulp.task('package', (cb) => {
  packager({
    dir: PATH_SPEC.APP_FILE,
    name: APP_SPEC.APP_NAME,
    platform: process.env.PLATFORM,
    asar: true,
    arch: process.env.ARCH,
    version: APP_SPEC.RUNTIME_VERSION,
    out: PATH_SPEC.APP_PACKAGE,
    overwrite: true,
  }, (err, appPathArr) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(appPathArr);
      cb();
    }
  });
});

gulp.task('dmg', () => {
  return gulp.src('')
    .pipe(gulpPkg.shell(
      [
        'mkdir -p <%= releaseDir %>',
        'node_modules/.bin/appdmg <%= configFile %> <%= releaseDmg %>',
      ], {
        templateData: {
          configFile: FILE_SPEC.MAC_INSTALL_CONFIG,
          releaseDir: PATH_SPEC.APP_INSTALLER,
          releaseDmg: `${PATH_SPEC.APP_INSTALLER}/${APP_SPEC.APP_NAME}.dmg`,
        },
      })
    );
});

gulp.task('exe', (cb) => {
  return innosetup(
    FILE_SPEC.WIN_INSTALL_CONFIG,
    { O: PATH_SPEC.APP_INSTALLER },
    (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      cb();
    });
});

gulp.task('default', ['setEnv'], (cb) => {
  if (process.env.PLATFORM === 'darwin') {
    sequence('clean', 'setEnv', 'webpack', 'copy', 'package', 'dmg', cb);
  } else {
    sequence('clean', 'setEnv', 'webpack', 'copy', 'package', 'exe', cb);
  }
});
