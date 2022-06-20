import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { minutesToHours } from "../../utils";
import AddToListBtn from "../../containers/AddToListBtn";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import ShareButton from "../PrimaryButton/ShareButton";
import { Link } from "react-router-dom";
import MovieServers from "../Servers/MovieServers";
import Ads from "../Ads/Ads";
import "./DetailsTitle.scss";
import Seo from '../Seo';


function handleName(name) {
  if (name.includes(":")) {
    return name.replace(": ", ":\n");
  } else {
    return name;
  }
}

function DetailsTitle({ movie }) {

  const [show, setShow] = useState(false);
  const closetab = () => {
    setShow(close);
  };


  const {
    // movie info
    title,
    imdb_id,
    genres,
    runtime,
    year,
    description,
    backdrop_path,
    vote_average: rating,
    poster_path: posterPath,
    release_date: releaseDate,

    // tv info
    name,
    status,
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    episode_run_time: episodeRunTime,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    id,

  } = movie;

// Continue to Watch Feature
  useEffect(() => {
    localStorage.setItem('img', posterPath);
    localStorage.setItem('title', title || name);
    localStorage.setItem('id', id);
    localStorage.setItem('type', isMovie ? 'movie' : 'tv');
    window.scrollTo({ top: 250, left: 100, behavior: 'smooth' });
    let windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      window.scrollTo({ top: 150, left: 100, behavior: 'smooth' });
    }
  });


  let infoLine;
  let isMovie = false;

  // if title is defined, it's a movie
  if (title) {
    isMovie = true;
    infoLine = (
        <>
        <MovieServers
          isOpen={show}
          hideFunc={closetab}
          imdb={imdb_id}
          runtime={minutesToHours(runtime)}
          title={title}
          id={id}
          rating={rating}
          poster={posterPath}
          url={backdrop_path}
          year={moment(displayDate).format("YYYY")}
        />
      <div className="video-p-detail">
        <div className="video-p-name">
          {genres.map((item, i) => {
            return (
              <Link
                className="video-p-genre"
                to={`/movies/genre/${item.id}`}
                key={i}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="video-p-sub">
          {minutesToHours(runtime)}
          <span> • </span>
          {moment(releaseDate).format("MMM Do YYYY")}
          <span> • </span> 
          {rating} <svg fill="#ffff00" width="10" height="10" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path></svg>
        </div>
      </div>
      </>
    );

  } else {
    const endingYear =
      status === "Ended" || status === "Canceled"
        ? moment(lastAirDate).format("YYYY")
        : "";
    infoLine = (
      <div className="video-p-detail">
        <div className="video-p-name">
          {genres.map((item, i) => {
            return (
              <Link
                className="video-p-genre"
                to={`/movies/genre/${item.id}`}
                key={i}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="video-p-sub">
          <span class="video-p-data">
            {minutesToHours(episodeRunTime[0])} per episode{" "}
          </span>
          <span class="video-p-data">
            • {numberOfEpisodes} episodes, {numberOfSeasons} seasons{" "}
          </span>
          <span class="video-p-data">• {status} </span>
          <span class="video-p-data">
            • {moment(firstAirDate).format("YYYY")}-{endingYear}{" "} 
          </span>
          <span class="video-p-data">
          {" "}• {rating}{" "}<svg fill="#ffff00" width="10" height="10" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path></svg>
          </span>
        </div>
      </div>
    );
  }

  let buttons;

  if (isMovie) {
    buttons = (
      <>
        <div className="button-wrapper">
            <ShareButton onClick={() => setShow(true)} title="Play" />
            <AddToListBtn currentMovie={movie} />
        </div>
      </>
    );
  } else {
    buttons = (
      <>
        <div className="button-wrapper">
            <ShareButton to={`${id}/episodes/`} title="Seasons" />
          <AddToListBtn currentMovie={movie} />
        </div>
      </>
    );
  }

  const displayName = title || name;
  const displayDate = releaseDate || firstAirDate;
  const titles = handleName(displayName);

  return (
    <>
    <div className="details-title">
        <Seo title={`${displayName} (${moment(displayDate).format("YYYY")})`} 
        pathSlug={`${isMovie ? "movie/" : "tv/"}${id}`} 
        coverImg={`https://image.tmdb.org/t/p/w500${posterPath}`}
        descriptions={`Stream ${displayName} (${moment(displayDate).format("YYYY")}) in 1080p, 720p, 480p HD Quality for free. Download ${displayName} (${moment(displayDate).format("YYYY")}) Google Drive, Mega.nz, Uptobox, 1fichier, torrent, yify`} />
          <ImageWithFallback
            className="poster"
            src={posterPath}
            imgSize="w500"
            alt={`Poster for ${title}`}
            mediaType={isMovie ? "movie" : "tv"}
          />
        <div className="text">
          <h1 className="title">{titles}</h1>
          <div className="info">{infoLine}</div>
          <div className="bottom">{buttons}</div>
        </div>
      </div>
    </>
  );
}

DetailsTitle.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default DetailsTitle;
