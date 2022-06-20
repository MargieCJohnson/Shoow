import React from "react";
import PropTypes from "prop-types";
import Searchbar from "../Searchbar/Searchbar";
import LoginHandler from "../Login/LoginHandler";
import { MediumRes } from "../Responsive";
import "./Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 */
function DesktopHeader({
  setSearchbarValue,
  searchbarValue,
  searchHandler,
  toggleSidebar,
}) {
  return (
    <header id="app-header-desktop" className="app-header">
      <Searchbar
        value={searchbarValue}
        search={searchHandler}
        setSearchbarValue={setSearchbarValue}
      />
      <LoginHandler />
    </header>
  );
}

DesktopHeader.propTypes = {
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default DesktopHeader;
