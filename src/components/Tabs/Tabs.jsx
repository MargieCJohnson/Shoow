import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Tabs.scss";

function allTab(links) {
  if (links.All) {
    return (
      <li>
        <NavLink className="tab-link" to={links.All}>
          All
        </NavLink>
      </li>
    );
  }
  return null;
}

function Tabs({ links }) {
  return (
    <nav className="tabs">
      <ul>
        {// if there is a tab called All, always put it first
        allTab(links)}
        {Object.entries(links)
          .filter(([name]) => name !== "All")
          .map(([name, url]) => (
            <li key={name}>
              <NavLink className="tab-link" to={url}>
                {name}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
}

Tabs.propTypes = {
  // key is name of tab, value is url tab should navigate to
  links: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Tabs;
