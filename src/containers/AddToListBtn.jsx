import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { auth } from "../Firebase/firebase";
import {
  addToList,
  fetchOneFromList,
  updateWatchStatus,
  removeFromList,
  getLinks,
} from "../Firebase/lists";
import { successToast, errorToast, infoToast, removeToast } from "../toast";
import { withUser } from "../Firebase/UserContext";
import { normalizeMovie } from "../api/tmdb";
import { parseSnakeCase } from "../utils";
import AddButton from "../components/PrimaryButton/AddButton";
import ListPickerModal from "./ListPickerModal";

class AddToListBtn extends Component {
  static propTypes = {
    /* Which movie to add when clicking */
    currentMovie: PropTypes.object.isRequired,
    /* Comes from the withUser function */
    user: PropTypes.object.isRequired,
  };

  state = {
    isLoading: false,
    modalIsOpen: false,
    /* the watch status/list the current movie is in, if the user has already added it */
    statusOfCurrentMovie: null,
  };

  componentDidMount() {
    // wait until the user has signed in to check their watch status
    // of the current movie
    auth.onAuthStateChanged(user => {
      if (user) {
        this.checkStatusOfCurrentMovie();
      }
    });
  }

  /**
   * Check if the current movie is already in the user's list, and
   * if so, display the current watch status (e.g. "Watching") on the
   * button instead of the usual "+ Add to" text
   */
  async checkStatusOfCurrentMovie() {
    this.setState({ isLoading: true });
    const { user, currentMovie } = this.props;
    const sample = await getLinks(currentMovie.id);
    const movie_id_data = sample ? sample.movie_link : "";
    localStorage.setItem('movieid', movie_id_data);
    const movie = await fetchOneFromList(user.uid, currentMovie.id);
    if (movie && movie.watch_status) {
      this.setState({ statusOfCurrentMovie: movie.watch_status });
    }
    this.setState({ isLoading: false });
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  hideModal = () => {
    this.setState({ modalIsOpen: false });
  };

  /**
   * Adds the current movie to the list that the user selects
   * from the ListPickerModal
   */
  onModalRemove = async selectedList => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.props;
    const movie = normalizeMovie(currentMovie);
    try {
      if (this.state.statusOfCurrentMovie) {
        updateWatchStatus(movie, selectedList);
        this.setState({ statusOfCurrentMovie: selectedList });
        infoToast(`${movie.title} moved to ${parseSnakeCase(selectedList)}`);
      } else {
        await addToList(movie, selectedList);
        successToast(`Added ${movie.title} to ${parseSnakeCase(selectedList)}`);
        this.setState({ statusOfCurrentMovie: selectedList });
      }
    } catch (error) {
      errorToast(`Something went wrong when adding ${movie.title}`);
    }
    this.setState({ isLoading: false });
  };

  onModalSubmit = async selectedList => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.props;
    const movie = normalizeMovie(currentMovie);
    try {
      await removeFromList(currentMovie.id);
      removeToast(
        `Removed ${movie.title} from ${parseSnakeCase(selectedList)}`,
      );
      this.setState({ statusOfCurrentMovie: null });
    } catch (error) {
      errorToast(`Something went wrong when trying to remove ${movie.title}`);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, modalIsOpen, statusOfCurrentMovie } = this.state;
    const { user } = this.props;
    const { onModalSubmit, hideModal, showModal, onModalRemove } = this;

    let label; // the text on the button
    if (isLoading) {
      label = "Loading...";
    } else if (statusOfCurrentMovie && user) {
      label = (
        <Fragment>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/>
          </svg>
          &nbsp;
          {parseSnakeCase(statusOfCurrentMovie)}
        </Fragment>
      );
    } else {
      label = (
        <Fragment>
          <svg fill="currentColor" viewBox="0 0 512 512"><title>Add</title>
          <path d="M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64.07 64.07 0 0164-64h192a64.07 64.07 0 0164 64v368a16 16 0 01-16 16z"></path>
          </svg> Add to
          </Fragment>
      );
    }
    const disabled = isLoading || user.status !== "signedIn";

    return (
      <Fragment>
        <AddButton onClick={showModal} disabled={disabled}>
          {label}
        </AddButton>
        <ListPickerModal
          isOpen={modalIsOpen}
          hideFunc={hideModal}
          onSubmit={onModalSubmit}
          statusOfCurrent="completed"
          onRemove={onModalRemove}
          onRemove2={onModalRemove}
          onRemove3={onModalRemove}
          onRemove4={onModalRemove}
        />
      </Fragment>
    );
  }
}

export default withUser(AddToListBtn);
