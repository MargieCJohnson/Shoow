import React, {useState} from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import "./EpisodeItem.scss";
import { SignedIn, SignedOut } from "../UserState/UserState";
import EpisodeServers from "../Servers/EpisodeServers";

function EpisodeItem({
  episodeNumber,
  seasonNumber,
  title,
  name,
  poster,
  year,
  description,
  addEpisode,
  id,
  removeEpisode,
  watched,
  showId,
  vote_average,
  imdb_id,
  }) 
  
  {
  let checkBox;
    const show = {
      id: showId,
      imdb_id: imdb_id,
      episodeNumber,
      seasonNumber,
  };


  const [opentab, setShow] = useState(false);

  const closetab = () => {
      setShow(false)
    };

  if (watched) {
    checkBox = (
      <button className="episodeCheckbox" onClick={() => removeEpisode(show)}>
      </button>
    );
  } else {
    checkBox = (
      <button className="episodeCheckbox" onClick={() => addEpisode(show)}>
      </button>
    );
  }

  return (
    <div className="episodeItem">
    <EpisodeServers
        isOpen={opentab}
        hideFunc={closetab}
        showId={showId}
        episodeNumber={episodeNumber}
        seasonNumber={seasonNumber}
        name={name}
        url={poster}
        title={title}
        imdb_id={imdb_id}
        />
      <div className="image-wrapper">
        <ImageWithFallback
          src={poster}
          imgSize="original"
          mediaType="tv"
          alt={`Poster for ${name}`}
          className="episodePic"
        />
        <div className="play-btn">
        <svg onClick={() => setShow(true)} fill="#ffff" viewBox="0 0 512 512"><title>Play</title><path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"></path></svg>
        </div>
      </div>
      <div className="episodeTextBox">
        <h1 className="episodeTitle">
          {episodeNumber}
          &nbsp;
          {name}
          {id}
        </h1>
        <div className="episodeTextContent">{description}</div>
      </div>
      <SignedIn>{() => checkBox}</SignedIn>
    </div>
  );
}

EpisodeItem.defaultProps = {
  poster: "", // some episodes have no image
};

EpisodeItem.propTypes = {
  episodeNumber: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  description: PropTypes.string.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  watched: PropTypes.bool.isRequired,
  showId: PropTypes.string.isRequired,
};

export default EpisodeItem;
