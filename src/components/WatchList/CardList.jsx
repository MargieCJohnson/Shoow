import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { Link } from "react-router-dom";
import { getFullImgPath } from "../../api/tmdb";
import ListDeleteBtn from "./ListDeleteBtn";
import AddToListBtn from "../../containers/AddToEdit";
import LoadingCardList from "../Loading/LoadingCardList";
import "./CardList.scss";

function checkProgress(movie) {
  if (movie.media_type === "tv") {
    return (
      <Link to={`/tv/${movie.id}/episodes/`}>
        {movie.progress || "See progress"}
      </Link>
    );
  }
  return movie.progress || "-";
}

function CardList({ entries, isEditMode, deleteEntry, onMove, isLoading }) {
  let content;
  if (isLoading) {
    content = <LoadingCardList />;
  } else {
    content = entries.map(movie => {
      const icon = movie.media_type === "movie" ? "film" : "tv";
      const url = `/${movie.media_type}/${movie.id}`;
      return (
        <div key={movie.id} className="card-list-item-wrapper">
          <li className="card-list-item">
            <Link className="poster" to={url}>
              <img
                src={getFullImgPath(movie.poster_path, "w185")}
                alt={`Poster of ${movie.title}`}
              />
            </Link>
            <h1 className="title">
              <Link to={url}>
                {movie.title} ({movie.release_year})
              </Link>
            </h1>
            <div className="info">
              <div className="progress">{checkProgress(movie)}</div>
              <div className="rating">
                {movie.vote_average || "-"}
              </div>
              <div className="added">
                Added {moment(movie.added.toDate()).fromNow()}
              </div>
              <div className="media-type">
              </div>
            </div>
          </li>
          <div className="buttonWrapper">
            {isEditMode && <AddToListBtn currentMovie={movie} />}
            {isEditMode && <ListDeleteBtn onClick={() => deleteEntry(movie)} />}
          </div>
        </div>
      );
    });
  }
  return (
    <div className="card-list">
      <ul>{content}</ul>
    </div>
  );
}

CardList.propTypes = {
  entries: PropTypes.array.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default CardList;
