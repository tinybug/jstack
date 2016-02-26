import React from 'react';
import { Router } from 'react-router';
import rootRoute from './routes';

if (process.env.RUNTIME === 'web') {
  const { browserHistory } = require('react-router');
  module.exports = () => (
    <Router history={browserHistory} routes={rootRoute} />
  );
} else {
  const { hashHistory } = require('react-router');
  module.exports = () => (
    <Router history={hashHistory} routes={rootRoute} />
  );
}
