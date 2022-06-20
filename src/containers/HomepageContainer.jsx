import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNowScifiMovies, 
          getNowKidsMovies, 
          getNowThrillerMovies, 
          getNowHorrorMovies, 
          getNowPlayingMovies, 
          getNowAiringTVShows,
          getNowDocumentaryShows, 
        } from "../api/tmdb";
import Homepage from "../components/Homepage/Homepage";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

class HomepageContainer extends Component {
  static propTypes = {
    horror: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    thriller: PropTypes.array.isRequired,
    kids: PropTypes.array.isRequired,
    scifi: PropTypes.array.isRequired,
    documentary: PropTypes.array.isRequired,

    setNowScifiMovies: PropTypes.func.isRequired,
    setNowKidsMovies: PropTypes.func.isRequired,
    setNowThrillerMovies: PropTypes.func.isRequired,
    setNowHorrorMovies: PropTypes.func.isRequired,
    setNowPlayingMovies: PropTypes.func.isRequired,
    setNowAiringTVShows: PropTypes.func.isRequired,
    setNowDocumentaries: PropTypes.func.isRequired,
  };

  // if the movies and series props aren't empty, don't show loading indicators
  static getDerivedStateFromProps(props) {
    if (props.documentary.length !==0 && props.kids.length !==0 && props.scifi.length !== 0 && props.horror.length !== 0 && props.thriller.length !== 0 && props.movies.length !== 0 && props.series.length !== 0) {
      return {
        loadingKids: false,
        loadingScifi: false,
        loadingMovies: false,
        loadingThriller: false,
        loadingShows: false,
        loadingHorror: false,
        loadingDocumentaries: false,
      };
    }
    return null;
  }

  state = {
    error: false,
    loadingScifi: true,
    loadingKids: true,
    loadingHorror: true,
    loadingMovies: true,
    loadingShows: true,
    loadingThriller: true,
    loadingDocumentaries: true,
  };

  componentDidMount() {
    const {documentary: dc, scifi: sc, kids: k, thriller: t, horror: h, movies: m, series: s } = this.props;
    if (dc.length !==0 && k.length !== 0 && sc.length !== 0 && h.length !== 0 && t.length !== 0 && m.length !== 0 && s.length !== 0) return;

    getNowDocumentaryShows()
      .then(documentary => {
        if(!documentary) return;
        this.props.setNowDocumentaries(documentary.splice(0, 20));
        this.setState({ loadingDocumentaries: false });
      }).catch(() => { this.setState({ error: true, loadingDocumentaries: false }); });

    getNowScifiMovies()
      .then(scifi => {
        if (!scifi) return;
        this.props.setNowScifiMovies(scifi.splice(0, 20));
        this.setState({ loadingScifi: false });
      }).catch(() => { this.setState({ error: true, loadingScifi: false }); });

    getNowKidsMovies()
      .then(kids => {
        if (!kids) return;
        this.props.setNowKidsMovies(kids.splice(0, 20));
        this.setState({ loadingKids: false });
      }).catch(() => { this.setState({ error: true, loadingKids: false }); });

    getNowThrillerMovies()
      .then(thriller => {
        if (!thriller) return;
        this.props.setNowThrillerMovies(thriller.splice(0, 20));
        this.setState({ loadingThriller: false });
      }).catch(() => { this.setState({ error: true, loadingThriller: false }); });

    getNowHorrorMovies()
      .then(horror => {
        if (!horror) return;
        this.props.setNowHorrorMovies(horror.splice(0, 20));
        this.setState({ loadingHorror: false });
      }).catch(() => { this.setState({ error: true, loadingHorror: false }); });

    getNowPlayingMovies()
      .then(movies => {
        if (!movies) return;
        this.props.setNowPlayingMovies(movies.splice(0, 20));
        this.setState({ loadingMovies: false });
      }).catch(() => { this.setState({ error: true, loadingMovies: false }); });

    getNowAiringTVShows()
      .then(series => {
        if (!series) return;
        this.props.setNowAiringTVShows(series.splice(0, 20));
        this.setState({ loadingShows: false });
      }).catch(() => { this.setState({ error: true, loadingShows: false }); });
      
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <ErrorMessage>O-o-oh! Something broke.</ErrorMessage>
        </div>
      );
    }

    return (
      <Homepage
        movies={this.props.movies}
        series={this.props.series}
        horror={this.props.horror}
        thriller={this.props.thriller}
        kids={this.props.kids}
        scifi={this.props.scifi}
        documentary={this.props.documentary}
        loadingScifi={this.state.loadingScifi}
        loadingKids={this.state.loadingKids}
        loadingThriller={this.state.loadingThriller}
        loadingMovies={this.state.loadingMovies}
        loadingShows={this.state.loadingShows}
        loadingHorror={this.state.loadingHorror}
        loadingDocumentaries={this.state.loadingDocumentaries}
      />
    );
  }
}

export default HomepageContainer;
