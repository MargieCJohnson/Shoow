import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PrimaryButton.scss";

/**
 * Reusable button with the secondary button style
 */
function PrimaryButton(props) {
  if (!props.to) {
    return <button {...props} className="primary-btn" />;
  }
  return <Link {...props} className="primary-btn" />;
}

PrimaryButton.defaultProps = {
  to: "",
};

PrimaryButton.propTypes = {
  to: PropTypes.string,
};

export default PrimaryButton;
