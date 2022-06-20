import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Searchbar.scss";

/**
 * Reusable generic searchbar component with event handlers for
 * value change and submit, and a clear input button
 */
class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  };

  inputRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.inputRef.current;
    this.props.search(value);
  };

  onChange = (e) => {
    const { value } = e.target;
    this.props.search(value);
  };

  clearText = (e) => {
    e.preventDefault();
    this.props.setSearchbarValue("");
    this.inputRef.current.focus();
  };

  render() {
    const { onChange, onSubmit } = this;
    const { value } = this.props;
    const exclude = window.location.pathname;
    if (exclude === "/login" || exclude === "/signup" || exclude === "/forgot_password" || exclude === "/help" || exclude === "/discord" ) return null;
    
    return (
      <form className="searchbar" onSubmit={onSubmit}>
        <div className="search-menu">
          <div className="search-bar">
            <input
              type="text"
              className="search-box"
              ref={this.inputRef}
              value={value}
              onChange={onChange}
              placeholder="Search"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Searchbar;
