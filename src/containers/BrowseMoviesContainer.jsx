import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage/BrowsePage";
import {
  getMoviesFromType,
  getGenreMovies,
  getMovieGenres,
  getMoviesFromYear,
} from "../api/tmdb";
import { createDebouncedFunc } from "../utils";

class BrowseMoviesContainer extends Component {
  state = {
    movies: [],
    genreTitle: "",
    genres: [],
    isLoading: false,
    error: "",
    searchWords: "",
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    getMovieGenres().then(genres => {
      this.setState({ genres });
      this.getMoviesFromTab();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getMoviesFromTab();
    }
  }

  searchHandler = query => {
    this.setSearchbarValue(query);
    this.search(query);
  };

  search = createDebouncedFunc(query => {
    // don't need to search if the user just clears the search bar
    if (query === "") return;
    this.props.history.push(`/movies/year/${query}`);
  });

  setSearchbarValue = searchWords => {
    this.setState({ searchWords });
  };

  setGenreTitle(id) {
    this.state.genres.forEach(genre => {
      if (genre.id.toString() === id) {
        this.setState({ genreTitle: `(${genre.name})` });
      }
    });
  }

  getMoviesFromTab() {
    const { filter, id } = this.props.match.params;
    this.setState({
      movies: [],
      genreTitle: "",
      isLoading: true,
      error: "",
      currentPage: 1,
      totalPages: 1,
    });
    if (filter === "top_rated") {
      getMoviesFromType("top_rated")
        .then(movies =>
          this.setState({
            movies: movies.results,
            isLoading: false,
            totalPages: movies.total_pages,
          }),
        )
        .catch(() => {
          this.setState({ error: "O-o-oh! Something broke." });
        });
    } else if (filter === "upcoming") {
      getMoviesFromType("upcoming")
        .then(movies =>
          this.setState({
            movies: movies.results,
            isLoading: false,
            totalPages: movies.total_pages,
          }),
        )
        .catch(() => {
          this.setState({ error: "O-o-oh! Something broke." });
        });
    } else if (filter === "popular") {
      getMoviesFromType("popular", this.state.currentPage)
        .then(movies =>
          this.setState({
            movies: movies.results,
            isLoading: false,
            totalPages: movies.total_pages,
          }),
        )
        .catch(() => {
          this.setState({ error: "O-o-oh! Something broke." });
        });
    } else if (filter === "genre") {
      if (id) {
        this.setGenreTitle(id);
        getGenreMovies(id)
          .then(movies =>
            this.setState({
              movies: movies.results,
              isLoading: false,
              totalPages: movies.total_pages,
            }),
          )
          .catch(() => {
            this.setState({ error: "O-o-oh! Something broke." });
          });
      } else {
        this.setState({ isLoading: false });
      }
    } else if (filter === "year") {
      const { searchWords } = this.state;
      // id is undefined when clicking on the "Year" tab the first time
      // searchWords is defined if the user has previously searched for a year
      // and switches tab to something else, and then back to "Year"
      // so we search for the same year that the user searched for previously
      // instead of resetting the searchbar
      if (id || searchWords) {
        getMoviesFromYear(id || searchWords)
          .then(movies => {
            if (movies.length === 0) {
              this.setState({
                error: "The database could not find any movies from that year",
              });
            }
            this.setState({
              movies: movies.results,
              isLoading: false,
              totalPages: movies.total_pages,
            });
          })
          .catch(() => {
            this.setState({ error: "O-o-oh! Something broke." });
          });
      } else {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ isLoading: false });
    }
  }

  loadMoreAndAppend = async () => {
    const { filter, id } = this.props.match.params;
    try {
      let resp;
      if (filter === "genre") {
        resp = await getGenreMovies(id, this.state.currentPage + 1);
      } else if (filter === "year") {
        resp = await getMoviesFromYear(id, this.state.currentPage + 1);
      } else {
        resp = await getMoviesFromType(filter, this.state.currentPage + 1);
      }
      /* The following piece of code removes duplicate movies as the api sometimes returns
           movies that already was fetched before. */
      const index = this.state.movies.concat(resp.results);
      const resArr = [];
      index.forEach(item => {
        const i = resArr.findIndex(x => x.id === item.id);
        if (i <= -1) {
          resArr.push(item);
        }
      });
      this.setState({
        movies: resArr,
        currentPage: resp.page,
        totalPages: resp.total_pages,
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const tabLinks = {
      Popular: "/movies/popular",
      Top: "/movies/top_rated",
      Upcoming: "/movies/upcoming",
      Genre: "/movies/genre",
      Year: "/movies/year",
    };
    return (
      <BrowsePage
        genres={this.state.genres}
        movies={this.state.movies}
        tabLinks={tabLinks}
        genreTitle={this.state.genreTitle}
        isLoading={this.state.isLoading}
        error={this.state.error}
        type="movies"
        searchValue={this.state.searchWords}
        search={this.searchHandler}
        setSearchbarValue={this.setSearchbarValue}
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        loadMoreFunc={this.loadMoreAndAppend}
      />
    );
  }
}

BrowseMoviesContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default BrowseMoviesContainer;
