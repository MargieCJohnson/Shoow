import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SecondaryButton.scss";

/**
 * Reusable button with the secondary button style
 */
function SecondaryButton(props) {
  if (!props.to) {
    return <button {...props} className="secondary-btn" />;
  }
  return <Link {...props} className="secondary-btn" />;
}

SecondaryButton.defaultProps = {
  to: "",
};

SecondaryButton.propTypes = {
  to: PropTypes.string,
};

export default SecondaryButton;
