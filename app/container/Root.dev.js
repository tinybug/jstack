import React, { Component, PropTypes } from 'react';
import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../route';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import * as i18n from '../i18n';

class Root extends Component {
  render() {
    const { history, application: { locale } } = this.props;
    const intlData = {
      locale,
      messages: i18n[locale],
    };
    return (
      <div>
        <IntlProvider {...intlData}>
          <div>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </IntlProvider>
      </div>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

export default connect(
  ({ application }) => ({ application })
)(Root);
