import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as appAction from '../action/application';
import { FormattedMessage } from 'react-intl';
import history from '../config/history';

class IndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  refInput = (ref) => {
    this._input = ref;
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.sayYourName(this._input.value);
  };
  
  gotoDashboard = () => {
    history.push('/dashboard');
  };

  render() {
    const { application: { name } } = this.props;
    return (
      <div>
        <div><FormattedMessage id="index.helloWorld" /></div>
        <div><FormattedMessage id="index.tellYourName" /></div>
        <input type="text" ref={this.refInput} />
        <input
          type="button"
          value="submit"
          onClick={this.handleClick}
        />
        { name ?
          <div><FormattedMessage id="index.hello" />{`, ${name}`} </div>
          : ''
        }
        <div onClick={this.gotoDashboard}>dashboard</div>
      </div>
    );
  }
}

IndexContainer.propTypes = {
  application: PropTypes.object.isRequired,
  sayYourName: PropTypes.func.isRequired,
};

export default connect(
  ({ application }) => ({ application }),
  { ...appAction }
)(IndexContainer);
