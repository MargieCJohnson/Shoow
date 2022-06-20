import React, { Component } from "react";
import PropTypes from "prop-types";
import { getPersonDetails } from "../api/tmdb";
import ActorPage from "../components/Actors/ActorPage";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import "./ActorPageContainer.scss";

class ActorPageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired, // from react-router
    currentActor: PropTypes.object.isRequired,
    setCurrentActor: PropTypes.func.isRequired,
  };
  state = {
    error: "",
    isLoading: true,
  };

  componentDidMount() {
    if (
      this.props.currentActor &&
      this.props.currentActor.id !== this.props.match.params.id
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
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    getPersonDetails(id)
      .then(this.processResponse)
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  }

  processResponse = personDetails => {
    if (!personDetails) return;
    this.props.setCurrentActor(personDetails);
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
      <ActorPage
        currentActor={this.props.currentActor}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default ActorPageContainer;
