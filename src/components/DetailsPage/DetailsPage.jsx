import React from "react";
import PropTypes from "prop-types";
import DetailsBanner from "../DetailsBanner/DetailsBanner";
import DetailsTitle from "../DetailsTitle/DetailsTitle";
import MovieInformation from "../MovieInformation/MovieInformation";
import LoadingDetailsPage from "../Loading/LoadingDetailsPage";

/**
 * Markup for the details page
 */



function DetailsPage({ currentMovie, isLoading }) {
  if (isLoading) return <LoadingDetailsPage />;
    
  return (
    <div id="detailspage">
      <DetailsBanner backdropPath={currentMovie.backdrop_path} />
      <DetailsTitle movie={currentMovie} />
      <MovieInformation currentMovie={currentMovie} />
    </div>
  );
}

DetailsPage.propTypes = {
  currentMovie: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DetailsPage;
