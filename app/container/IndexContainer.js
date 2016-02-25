import React, { Component } from 'react';
import Message from '../component/Message';

class IndexContainer extends Component {
  render() {
    return (
      <div>
        <Message msg="hello world" />
      </div>
    );
  }
}

export default IndexContainer;
