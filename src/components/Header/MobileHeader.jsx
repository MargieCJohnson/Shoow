import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import "./Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 * The state is only for UI within this component, so this doesn't count
 * as a container component
 */
class MobileHeader extends Component {
  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    searchbarValue: PropTypes.string.isRequired,
    searchHandler: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      state.location !== props.location &&
      !props.location.pathname.includes("search")
    ) {
      return {
        searchIsVisible: false,
        location: props.location,
      };
    }
    return { location: props.location };
  }

  state = {
    searchIsVisible: false,
  };

  componentDidUpdate(prevProps) {
    if (this.state.searchIsVisible) {
      // if the searchbar becomes visible, focus on the input
      this.searchbarRef.current.inputRef.current.focus();
    }
  }

  searchbarRef = React.createRef();

  showSearch = () => {
    this.setState({ searchIsVisible: true });
  };

  hideSearch = () => {
    this.setState({ searchIsVisible: false });
  };

  render() {
    const {
      toggleSidebar,
      setSearchbarValue,
      searchbarValue,
      searchHandler,
    } = this.props;
      const exclude = window.location.pathname;

    if (this.state.searchIsVisible) {
      return (
        <header id="app-header-mobile" className="app-header">
          <button id="search-hide" onClick={this.hideSearch}>
            <svg viewBox="0 0 64 64">
            <path data-name="layer1" fill="currentColor" stroke-miterlimit="10" stroke-width="2" d="M24 32.001L38 46l4-4.485-9.515-9.514L42 22.487 38 18 24 32.001z" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </button>
          <Searchbar
            ref={this.searchbarRef}
            value={searchbarValue}
            search={searchHandler}
            setSearchbarValue={setSearchbarValue}
          />
        </header>
      );
    }
    return (
      <header id="app-header-mobile" className="app-header">
        <button id="toggle-btn" onClick={toggleSidebar}>
        <svg fill="none" stroke="currentColor" stroke-width="2.2" width="24" height="24" stroke-linecap="round" stroke-miterlimit="10" viewBox="0 0 24 24">
        <line class="st0" x1="12.2" y1="6.6" x2="18.4" y2="6.6"/>
        <line class="st0" x1="6.4" y1="18.4" x2="13" y2="18.4"/>
        <line class="st0" x1="6.4" y1="12.5" x2="18.4" y2="12.5"/>
        </svg>
        </button>
        <button id="header-search-btn"
        style={{ display: exclude == '/help' ||
            exclude == '/login' || exclude == '/signup' ||
            exclude == '/forgot_password' || exclude == '/download' || exclude == '/torrent' ? 'none' : 'block'}} onClick={this.showSearch}>
             <svg stroke-width="2.2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity">
             <svg stroke-width="2.2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
             <circle cx="11" cy="11" r="8"></circle>
             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
             </svg>
             </svg>
        </button>
      </header>
    );
  }
}

export default withRouter(MobileHeader);
