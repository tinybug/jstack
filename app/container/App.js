import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App
