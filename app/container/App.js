import React, { Component, PropTypes } from 'react';
import Header from '../component/Header';
import { connect } from 'react-redux';
import * as appAction from '../action/application';

class App extends Component {
  render() {
    const { children, switchLocale, application: { locale } } = this.props;
    return (
      <div>
        <Header locale={locale} switchLocale={switchLocale} />
        { children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  application: PropTypes.object.isRequired,
  switchLocale: PropTypes.func.isRequired,
};

export default connect(
  ({ application }) => ({ application }),
  appAction
)(App);
