/* jscs:disable */
/* eslint-disable */
'use strict';

require('./electron.env');
const electron = require('electron');
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;  

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL('file://' + __dirname + '/electron.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});