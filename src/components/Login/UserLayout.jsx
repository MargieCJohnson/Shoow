import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { SignedIn, SignedOut } from "../UserState/UserState";
import { Mobile, Desktop } from "../Responsive";
import DarkModeToggle from "../Darkmode/DarkModeToggle";

import "./LoginButton.scss";

function UserLayout({
  onSignOutClick,
  handleChange,
  signInClick,
  email,
  password,
}) {

  const logoutSvg =  <svg fill="currentColor" viewBox="0 0 512 512"><title>Log Out</title>
  <path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zM459.31 244.69l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z"></path></svg>;

  const loginSvg = <svg fill="currentColor" viewBox="0 0 512 512">
  <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z"></path></svg>;

  return (
    <Fragment>
      <Desktop>
        <SignedIn>
          {(user) => (
            <div class="user-settings">
              <img
                class="user-img"
                src={`https://avatars.dicebear.com/v2/identicon/${user.uid}.svg`}
                alt="User avatar"
              />
              <div class="user-name">{user.email}</div>
              <button onClick={onSignOutClick}>
                <svg fill="currentColor" viewBox="0 0 512 512"><title>Log Out</title>
<path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zM459.31 244.69l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z"></path></svg>
              </button>
              <div class="notify">
                <DarkModeToggle />
              </div>
            </div>
          )}
        </SignedIn>
        <SignedOut>
          <div class="user-settings">
            <Link className="signup-button" to="/login">
              <div class="notify">
                <div class="notification"></div>
                <svg fill="currentColor" viewBox="0 0 512 512">
<path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z"></path></svg>
              </div>
            </Link>
            <div class="notify">
              <DarkModeToggle />
            </div>
          </div>
        </SignedOut>
      </Desktop>
      <Mobile>
        <SignedIn>
          {() => (
          <>
           <a className="sidebar-link" onClick={onSignOutClick}>{logoutSvg}<span className="side-text">Logout</span></a>
           <a className="sidebar-link"><DarkModeToggle /><span className="side-text">Light / Dark</span></a>
         </>
          )}
        </SignedIn>
        <SignedOut>
            <Link className="sidebar-link" to="/login">{loginSvg}<span className="side-text">Login</span></Link>
            <a className="sidebar-link"><DarkModeToggle /><span className="side-text">Light / Dark</span></a>
        </SignedOut>
      </Mobile>
    </Fragment>
  );
}

UserLayout.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default UserLayout;
