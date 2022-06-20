import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./TitleGrid.scss";

function TitleGrid({ links }) {
  return (
    <div className="title-grid">
      {Object.entries(links).map(([name, url]) => (
        <NavLink key={name} className="title-element" exact to={url}>
          {name}
        </NavLink>
      ))}
    </div>
  );
}

TitleGrid.propTypes = {
  links: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default TitleGrid;
