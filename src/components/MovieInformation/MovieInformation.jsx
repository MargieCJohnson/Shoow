import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import PosterCard from "../PosterCard/PosterCard";
import { normalizeMovie } from "../../api/tmdb";
import Scroll from "../Scroll/Scroll";
import Trailers from "../Trailers/Trailers";
import "./MovieInformation.scss";
import "../Scroll/Scroll.scss";
import Img from 'react-cool-img';

/**
 * Markup for the main content of the movie details page
 */
function MovieInformation({ currentMovie }) {
  let cast;
  if (currentMovie.credits.cast.length === 0) {
    cast = <div>No cast to show</div>;
  } else {
    const castSorted = currentMovie.credits.cast.sort(
      (a, b) => a.order - b.order,
    );
    cast = (
      <Scroll arrayLength={castSorted.length}>
        {castSorted.map(person => {
          if (person.profile_path === null) {
            return (
              <div key={person.id} className="card1">
                <Link to={`/person/${person.id}`}>
                  <div className="">
                  <img
                      className="cast"
                      src={`https://i.ibb.co/Q9Y7ck1/placeholder.png`}
                      alt="No Picture"
                    />
                </div>
                  <p>
                    <b className="name-border">{person.name}</b>
                    <br /><div class="name-border-hidden">{person.character}</div>
                  </p>
                </Link>
              </div>
            );
          }
          return (
            <div className="card1" key={person.id}>
              <Link to={`/person/${person.id}`}>
                <img
                  className="cast"
                  src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
                  alt={person.name}
                />
                <p>
                  <b className="name-border">{person.name}</b>
                  <br /> <div class="name-border-hidden">{person.character}</div>
                </p>
              </Link>
            </div>
          );
        })}
      </Scroll>
    );
  }

  let recommendations;
  if (currentMovie.recommendations.results.length === 0) {
    recommendations = (
      <div className="bot-padding">No recommendations to show</div>
    );
  } else {
    recommendations = (
      <Scroll arrayLength={currentMovie.recommendations.results.length}>
        {currentMovie.recommendations.results.map(mov => {
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
  }

  return (
    <section className="movie-info">
      <h2>Synopsis</h2>
      <div class="synopsis">{currentMovie.overview}</div>
      <h2>Trailers</h2>
      <Trailers trailers={currentMovie.videos.results} />
      <h2>Cast</h2>
      {cast}
      <h2>You may also like</h2>
      {recommendations}
    </section>
  );
}

MovieInformation.propTypes = {
  currentMovie: propTypes.object.isRequired,
};

export default MovieInformation;
