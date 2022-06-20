import React from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import "./DetailsBanner.scss";

/**
 * The backdrop banner for the movie details page
 */

function DetailsBanner({ backdropPath }) {
  return (
    <div id="banner">
      <ImageWithFallback className="banner-img" src={backdropPath} />
      <div className="gradient" />
      <div class="curve-edge"></div>
    </div>
  );
}

DetailsBanner.defaultProps = {
  backdropPath: "",
};

DetailsBanner.propTypes = {
  backdropPath: PropTypes.string,
};

export default DetailsBanner;
