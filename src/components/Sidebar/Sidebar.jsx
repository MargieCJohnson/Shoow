import React, { Fragment as F, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SidebarNavLink from "./SidebarNavLink/SidebarNavLink";
import { SignedIn, SignedOut } from "../UserState/UserState";
import { Desktop, Mobile } from "../Responsive";
import LoginHandler from "../Login/LoginHandler";
import "./Sidebar.scss";

// list of icons [switch, hide, home, movies, tv-shows, settings, helpcenter, discord]
import SwitchIcon from "../../assets/switch.svg";
import HideIcon from "../../assets/hide.svg";
import HomeIcon from "../../assets/home.svg";
import MoviesIcon from "../../assets/movie.svg";
import TvIcon from "../../assets/tv.svg";
import SettingsIcon from "../../assets/settings.svg";
import HelpIcon from "../../assets/help.svg";
import DiscordIcon from "../../assets/discord.svg";

// user lists icons [watching, planning, completed, dropped] 
import WatchingIcon from "../../assets/watching.svg";
import PlannedIcon from "../../assets/planned.svg";
import CompletedIcon from "../../assets/completed.svg";
import DroppedIcon from "../../assets/dropped.svg";


function Sidebar({ isOpen, handleChange, handleExpand }) {
  const currentURL = window.location.pathname;
  const [sidebarState, sidebarVisible] = useState(true);

   useEffect(() => {
        let pop_status = localStorage.getItem('sidebar-status');
        if(pop_status) {
          sidebarVisible(true)
        } else {
          sidebarVisible(false)
        }
    }, [sidebarVisible]);


  const showSidebar = () => {
    localStorage.setItem('sidebar-status', 1);
    sidebarVisible(true);
    handleExpand();
  };

  const lessSidebar = () => {
    localStorage.removeItem('sidebar-status');
    sidebarVisible(false);
    handleChange();
  };

  const exclude = window.location.pathname;
  if (exclude === "/player/movie/" || exclude == "/player/tv/") return null;

  const sidebarStatus = isOpen ? "open" : "closed";
  const sidebarContent = sidebarState ? "sidebar-content" : "sidebar-content is-active";
  const HomeActive = currentURL === "/" ? "sidebar-link is-active" : "sidebar-link";

  return (
    <F>
      <div id="sidebar" className={sidebarStatus}>
        <div
          className={sidebarContent}
        >
          <div className="sidebar">
            <span className="logo" onClick={showSidebar}>
              <SwitchIcon fill="currentColor" />
            </span>
            <div className="logo-expand">SHOOW!<HideIcon fill="currentColor" onClick={lessSidebar} width="15px" /></div>
            <div className="side-wrapper">
              <div className="side-title">MENU</div>
              <div className="side-menu">
                <SidebarNavLink
                  className={HomeActive}
                  exact
                  to="/"
                >
                <HomeIcon fill="currentColor" />
                <span className="side-text">Home</span>
                </SidebarNavLink>

                <SidebarNavLink to="/movies">
                <MoviesIcon fill="currentColor" />
                <span className="side-text">Movies</span>
                </SidebarNavLink>

                <SidebarNavLink to="/shows">
                <TvIcon fill="currentColor" />
                <span className="side-text">TV-shows</span>
                </SidebarNavLink>

                <SidebarNavLink to="/settings">
                <SettingsIcon fill="currentColor" />
                <span className="side-text">Settings</span>
                </SidebarNavLink>
              </div>
            </div>
            <div className="side-wrapper">
              <div className="side-title">MISC</div>
              <div className="side-menu">
                <Mobile>
                  <LoginHandler />
                </Mobile>
                <SidebarNavLink to="/help">
                  <HelpIcon fill="currentColor" />
                  <span className="side-text">Help Center</span>
                </SidebarNavLink>
                <SidebarNavLink to="/discord">
                  <DiscordIcon fill="currentColor" />
                  <span className="side-text">Discord</span>
                </SidebarNavLink>
              </div>
            </div>
            <div className="side-wrapper">
              <div className="side-title">MY LIST</div>
              <Desktop>
                <SignedOut>
                  <div className="notif">Log in to view your lists</div>
                </SignedOut>
              </Desktop>
              <SignedIn>
                {(user) => (
                  <div className="side-menu">
                    <SidebarNavLink to={`/user/${user.uid}/watching/`}>
                    <WatchingIcon fill="currentColor" />
                      <span className="side-text">Watching</span>
                    </SidebarNavLink>
                    <SidebarNavLink to={`/user/${user.uid}/plan_to_watch/`}>
                      <PlannedIcon fill="currentColor" />
                      <span className="side-text">Planned</span>
                    </SidebarNavLink>
                    <SidebarNavLink to={`/user/${user.uid}/completed/`}>
                    <CompletedIcon fill="currentColor" />
                      <span className="side-text">Completed</span>
                    </SidebarNavLink>
                    <SidebarNavLink to={`/user/${user.uid}/dropped/`}>
                      <DroppedIcon fill="currentColor" />
                      <span className="side-text">Dropped</span>
                    </SidebarNavLink>
                  </div>
                )}
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </F>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
