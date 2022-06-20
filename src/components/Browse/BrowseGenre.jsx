import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import TitleGrid from "../TitleGrid/TitleGrid";

function BrowseGenre({ genres, type }) {
  const genreLinks = {};

  if (type === "movies") {
    return (
      <section>
        <Route
          exact
          path="/movies/genre/:id?"
          render={() => {
            genres.forEach(genre => {
              genreLinks[genre.name] = `/movies/genre/${genre.id}`;
            });
            return <TitleGrid links={genreLinks} />;
          }}
        />
      </section>
    );
  }

  if (type === "shows") {
    return (
      <section>
        <Switch>
          <Route
            exact
            path="/shows/genre/:id?"
            render={() => {
              genres.forEach(genre => {
                genreLinks[genre.name] = `/shows/genre/${genre.id}`;
              });
              return <TitleGrid links={genreLinks} />;
            }}
          />
        </Switch>
      </section>
    );
  }
}

BrowseGenre.propTypes = {
  genres: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default BrowseGenre;
