import React from 'react';
import { render } from 'react-dom';
import Root from './container/Root';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import history from './config/history';

addLocaleData(zh);
addLocaleData(en);

const initialState = {
  application: {
    locale: 'zh',
  },
};

const store = configureStore(initialState);

const syncHistory = syncHistoryWithStore(history, store);

function start() {
  render(
    (
      <Provider store={store}>
        <Root history={syncHistory} />
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
