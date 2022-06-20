import React from "react";
import PropTypes from "prop-types";
import "./LoadingText.scss";

function LoadingText({ type }) {
  switch (type) {
    case "word":
      return <div className="loading-text word" />;
    case "short":
      return <div className="loading-text short" />;
    case "long":
      return <div className="loading-text long" />;
    case "half":
      return <div className="loading-text half" />;
    case "xl":
      return <div className="loading-text xl" />;
    case "paragraph":
      return (
        <div className="loading-text-paragraph">
          <div className="loading-text long" />
          <div className="loading-text xl" />
          <div className="loading-text short" />
          <div className="loading-text half" />
          <div className="loading-text short" />
          <div className="loading-text xl" />
          <div className="loading-text half" />
          <div className="loading-text half" />
        </div>
      );
    default:
      break;
  }
}

LoadingText.propTypes = {
  type: PropTypes.oneOf(["word", "short", "long", "half", "xl", "paragraph"])
    .isRequired,
};

export default LoadingText;
