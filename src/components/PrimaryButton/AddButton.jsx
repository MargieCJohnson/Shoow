import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./AddButton.scss";

/**
 * Reusable button with the secondary button style
 */


function AddButton(props) {
  if (!props.to) {
    return  <button {...props} class="like1 red" />;
  }
  return <Link {...props} className="like1 red" />;
}

AddButton.defaultProps = {
  to: "",
};

AddButton.propTypes = {
  to: PropTypes.string,
};

export default AddButton;
