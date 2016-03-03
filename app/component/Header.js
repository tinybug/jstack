import React, { Component, PropTypes } from 'react';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleLanguageSwitch = this.handleLanguageSwitch.bind(this);
  }

  handleLanguageSwitch(e) {
    this.props.switchLocale(e.target.value);
  }

  render() {
    const { locale } = this.props;
    return (
      <div>
        <form>
          <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
            <select value={locale} onChange={this.handleLanguageSwitch}>
              <option value="zh">ZH</option>
              <option value="en">EN</option>
            </select>
          </fieldset>
        </form>
      </div>
    );
  }
}

Header.propTypes = {
  switchLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Header;
