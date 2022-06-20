import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment-mini";
import ListDeleteBtn from "./ListDeleteBtn";
import ListMoveBtn from "./ListMoveBtn";
import PosterCard from "../PosterCard/PosterCard";
import LoadingTableList from "../Loading/LoadingTableList";
import "./TableList.scss";
import AddToListBtn from "../../containers/AddToEdit";


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

function TableList({ entries, isEditMode, deleteEntry, onMove, isLoading }) {
  let content;
  if (isLoading) {
    content = <LoadingTableList />;
  } else {
    content = entries.map(movie => (
      <tr key={movie.id}>
        <td className="poster-name">
          <PosterCard
            className="poster"
            key={movie.id}
            id={movie.id}
            linkTo={`/${movie.media_type}/${movie.id}`}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            mediaType={movie.media_type}
            voteAverage={movie.vote_average}
            viewText="true"
          />
        </td>
        <td>{movie.media_type}</td>
        <td>{movie.vote_average || "-"}</td>
        <td>{checkProgress(movie)}</td>
        <td>{moment(movie.added.toDate()).fromNow()}</td>
        {isEditMode && (
          <td>
            <AddToListBtn currentMovie={movie} />
          </td>
        )}
        {isEditMode && (
          <td>
            <ListDeleteBtn onClick={() => deleteEntry(movie)} />
          </td>
        )}
      </tr>
    ));
  }
  return (
    <table className="watch-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Rating</th>
          <th>Progress</th>
          <th>Added</th>
          {isEditMode && <th className="move-text">Move</th>}
          {isEditMode && <th className="delete-text">Delete</th>}
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
}

TableList.propTypes = {
  entries: PropTypes.array.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TableList;
