import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PosterCard from "../PosterCard/PosterCard";
import { normalizeMovie } from "../../api/tmdb";
import "./PosterGrid.scss";
import Scroll from "../Scroll/Scroll";
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';


/**
 * A responsive grid of PosterCards
 * 
 * <div className="poster-grid">
      {movies.map(mov => {
        const movie = normalizeMovie(mov);
        return (
          <PosterCard
            key={movie.id}
            id={movie.id}
            linkTo={`/${movie.media_type}/${movie.id}`}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            mediaType={movie.media_type}
            voteAverage={movie.vote_average}
            notHD="false"
          />
        );
      })}
    </div>
 */

function PosterGrid({ movies, view }) {
  let posterContent;

  if(view) {
    posterContent = (
      <Scroll arrayLength={movies.length}>
        {movies.map(mov => {
          const movie = normalizeMovie(mov);
          return (
            <div className="card" key={movie.id}>
              <PosterCard
                key={movie.id}
                id={movie.id}
                linkTo={`/${movie.media_type}/${movie.id}`}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                mediaType={movie.media_type}
                voteAverage={movie.vote_average}
                notHD="false"
              />
            </div>
          );
        })}
      </Scroll>
      );
  } else {
    posterContent = (
      <div className="poster-grid">
      {movies.map(mov => {
        const movie = normalizeMovie(mov);
        return (
          <PosterCard
            key={movie.id}
            id={movie.id}
            linkTo={`/${movie.media_type}/${movie.id}`}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            mediaType={movie.media_type}
            voteAverage={movie.vote_average}
            notHD="false"
          />
        );
      })}
    </div>
      );
  }
  return (
  <>
  {posterContent}
  </>
  );
}

PosterGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PosterGrid;
