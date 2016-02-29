import React, { Component, PropTypes } from 'react';
import Message from '../component/Message';
import { connect } from 'react-redux';
import { sayYourName } from '../action';

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
    const { name } = this.props;
    return (
      <div>
        <Message msg="hello world" />
        <div>tell me your name</div>
        <input type="text" ref={this.refInput} />
        <input
          type="button"
          value="submit"
          onClick={this.handleClick}
        />
        {name ? <Message msg={`hello, ${name}`} /> : ''}
      </div>
    );
  }
}

IndexContainer.propTypes = {
  name: PropTypes.string.isRequired,
  sayYourName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.reducer.name,
  };
}

export default connect(mapStateToProps, {
  sayYourName,
})(IndexContainer);
