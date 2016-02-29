import React from 'react';
import { render } from 'react-dom';
import Root from './container/Root';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

let history = null;
if (process.env.RUNTIME === 'web') {
  const { browserHistory } = require('react-router');
  history = syncHistoryWithStore(browserHistory, store);
} else {
  const { hashHistory } = require('react-router');
  history = syncHistoryWithStore(hashHistory, store);
}

render(<Root store={store} history={history} />, document.getElementById('app'));
