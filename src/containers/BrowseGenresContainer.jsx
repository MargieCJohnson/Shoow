import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowseGenre from "../components/Browse/BrowseGenre";

class BrowseGenresContainer extends Component {
  static getDerivedStateFromProps(props) {
    return { genreId: props.match.params.id };
  }

  state = { genreId: 0 };

  render() {
    return (
      <BrowseGenre
        genres={this.props.genres}
        genreId={this.state.genreId}
        type={this.props.type}
      />
    );
  }
}

BrowseGenresContainer.propTypes = {
  genres: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default BrowseGenresContainer;
