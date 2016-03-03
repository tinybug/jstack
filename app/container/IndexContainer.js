import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as appAction from '../action/application';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  helloWorld: {
    id: 'index.helloWorld',
    description: 'hello world',
    defaultMessage: 'hello world',
  },
  hello: {
    id: 'index.hello',
    description: 'hello',
    defaultMessage: 'hello',
  },
  tellYourName: {
    id: 'index.tellYourName',
    description: 'tell your name',
    defaultMessage: 'tell your name',
  },
});

class IndexContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  refInput(ref) {
    this._input = ref;
  }

  handleClick(e) {
    e.preventDefault();
    this.props.sayYourName(this._input.value);
  }

  render() {
    const { application: { name } } = this.props;
    return (
      <div>
        <div><FormattedMessage {...messages.helloWorld} /></div>
        <div><FormattedMessage {...messages.tellYourName} /></div>
        <input type="text" ref={this.refInput} />
        <input
          type="button"
          value="submit"
          onClick={this.handleClick}
        />
        { name ?
          <div><FormattedMessage {...messages.hello} />{`, ${name}`} </div>
          : ''
        }
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
  appAction
)(IndexContainer);
