import React, { Component, Fragment as F } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "../Responsive";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "./Header.scss";

/**
 * The header, which includes search bar and user info
 */
class Header extends Component {
  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const query = url.get("query") || "";
    this.props.setSearchbarValue(query);
  }

  render() {
    return (
      <F>
        <Desktop>
          <DesktopHeader {...this.props} />
        </Desktop>
        <Mobile>
          <MobileHeader {...this.props} />
        </Mobile>
      </F>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired, // from react-router
  toggleSidebar: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
};

export default withRouter(Header);
