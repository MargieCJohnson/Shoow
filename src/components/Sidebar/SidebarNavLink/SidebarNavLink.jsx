import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarNavLink.scss";

/**
 * Component for navigation links in the sidebar, which change appearance
 * if you are on the url they link to
 */
function SidebarNavLink(props) {
  return (
    <NavLink {...props} className="sidebar-link" activeClassName="is-active" />
  );
}

export default SidebarNavLink;
