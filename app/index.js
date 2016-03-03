import React from 'react';
import { render } from 'react-dom';
import Root from './container/Root';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import zh from 'react-intl/lib/locale-data/zh';
import en from 'react-intl/lib/locale-data/en';

addLocaleData(zh);
addLocaleData(en);

const initialState = {
  application: {
    locale: 'zh',
  },
};

const store = configureStore(initialState);

let history = null;
if (process.env.RUNTIME === 'web') {
  const { browserHistory } = require('react-router');
  history = syncHistoryWithStore(browserHistory, store);
} else {
  const { hashHistory } = require('react-router');
  history = syncHistoryWithStore(hashHistory, store);
}

function start() {
  render(
    (
      <Provider store={store}>
        <Root history={history} />
      </Provider>
    ),
    document.getElementById('app')
  );
}

if (!global.Intl) {
  require.ensure(['intl'], require => {
    /* eslint-disable */
    require('intl').default;
    start();
  }, 'IntlBundle');
} else {
  start();
}
