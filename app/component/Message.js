import React, { Component, PropTypes } from 'react';

class Message extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div>
        { msg }
      </div>
    )
  }
}

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message
