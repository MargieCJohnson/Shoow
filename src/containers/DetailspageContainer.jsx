import React, { Component } from "react";
import PropTypes from "prop-types";
import { getMovieInfo, getTVInfo } from "../api/tmdb";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import DetailsPage from "../components/DetailsPage/DetailsPage";
import "./ActorPageContainer.scss";

class DetailspageContainer extends Component {
  
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired, // from react-router
    currentMovie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func.isRequired,
  };
  state = {
    error: "",
    isLoading: true,
  };

  componentDidMount() {
    if (
      this.props.currentMovie &&
      this.props.currentMovie.id !== this.props.match.params.id
    ) {
      this.getDetails();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getDetails();
    }
  }

  getDetails() {
    const { mediaType, id } = this.props.match.params;
    this.setState({ isLoading: true });

    if (mediaType === "movie") {
      getMovieInfo(id)
        .then(this.processResponse)
        .catch(error => {
          this.setState({ error: error.toString() });
        });
    } else if (mediaType === "tv") {
      getTVInfo(id)
        .then(this.processResponse)
        .catch(error => {
          this.setState({ error: error.toString() });
        });
    }
  }

  processResponse = currentMovie => {
    if (!currentMovie) return;
    this.props.setCurrentMovie(currentMovie);
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <div className="no-poster3">
            
          </div>
          <ErrorMessage>
            <div>{this.state.error}</div>
          </ErrorMessage>
        </div>
      );
    }

    return (
      <DetailsPage
        currentMovie={this.props.currentMovie}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default DetailspageContainer;
