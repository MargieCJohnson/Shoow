import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getYearFromDate } from "../../api/tmdb";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import "./PosterCard.scss";

class PosterCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    linkTo: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    mediaType: PropTypes.string.isRequired,
  };

  state = {
      loaded: false,
  }

  static defaultProps = {
    releaseDate: "",
    posterPath: "",
  };

  render() {
    const {
      id,
      title,
      posterPath,
      linkTo,
      voteAverage,
      releaseDate,
      mediaType,
      notHD,
      viewText,
    } = this.props;
    const releaseYear = releaseDate ? `${getYearFromDate(releaseDate)}` : "";

    const fallbackUrl = `/${mediaType}/${id}`;
    const ggtype = mediaType;
    const nameCapitalized = ggtype.charAt(0).toUpperCase() + ggtype.slice(1);

    return (
      <div>
        <Link className="poster-card" to={linkTo || fallbackUrl} draggable>
            <ImageWithFallback
              src={posterPath}
              imgSize="original"
              notHD={notHD}
              mediaType={mediaType}
              alt={`Poster for ${title}`}
              className="poster"
            />
          <p title={title} style={{ display: viewText ? "none" : "" }} className="title">
            {title}
          </p>
            <div class="meta" style={{ display: viewText ? "none" : "" }}>
            {releaseYear}
            <i class="dot"></i>
            {voteAverage} <svg
                fill="#f2b01e"
                width="10"
                height="10"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg> <i class="type">{nameCapitalized}</i>
            </div>
        </Link>
      </div>
    );
  }
}

export default PosterCard;
