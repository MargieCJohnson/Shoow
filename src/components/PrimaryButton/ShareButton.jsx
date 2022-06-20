import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ShareButton.scss";

/**
 * Reusable button with the secondary button style
 */


function ShareButton(props) {
	const icon = <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>;
	if (!props.to) {
    return <button {...props} class="like">{icon} {props.title}</button>;
  }
  return <Link {...props} class="like">{icon} {props.title}</Link>;
}

ShareButton.defaultProps = {
  to: "",
};

ShareButton.propTypes = {
  to: PropTypes.string,
};

export default ShareButton;
