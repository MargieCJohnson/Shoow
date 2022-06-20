import React, { useState } from "react";
import PropTypes from "prop-types";
import { getFullImgPath } from "../../api/tmdb";
import Img from 'react-cool-img';
import "./ImageWithFallback.scss";

/**
 * Reusable image component which displays a fallback if src is null/undefined
 */

function ImageWithFallback({ src, imgSize, mediaType, alt, className, notHD }) {
    const [showText, setshowText] = useState(false);

    let infoLine;
    infoLine = (<div class="overlay-text" style={showText ? {} : {display: 'none'}}>
      <div class="overlay-text-rating">HD</div></div>);

  if (src) {
    // draggable is disabled in order to disallow only the image to be dragged
    // we want the _whole_ PosterCard to be dragged
    return (
        <>
      <Img
        className={`${className} img-with-fb ${showText ? "box-shadow" : "" }`}
        src={getFullImgPath(src, imgSize)}
        placeholder="https://i.ibb.co/Q9Y7ck1/placeholder.png"
        loading="lazy"
        decode="true"
        alt={alt}
        onContextMenu={event => event.preventDefault()}
        onLoad={() => setshowText(true)}
        />
          {notHD ? infoLine : ""}
      </>
    );
  }


  let icon;
  switch (mediaType) {
    case "movie":
      icon = "film";
      break;
    case "tv":
      icon = "tv";
      break;
    case "person":
      icon = "user";
      break;
    default:
      icon = "image";
      break;
  }
  return (
  <Img
        className={`${className} img-with-fb`}
        src="https://i.ibb.co/Q9Y7ck1/placeholder.png"
        cached="true"
        lazy="true"
        decode="true"
        debounce="400"
        alt="No poster found!"
      />
  );
}

ImageWithFallback.defaultProps = {
  src: null,
  imgSize: "original",
  alt: "",
  className: "",
  mediaType: "",
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  /* imgSize examples: "w342", "w500" etc */
  imgSize: PropTypes.string,
  mediaType: PropTypes.oneOf(["movie", "tv", "person", ""]),
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageWithFallback;
