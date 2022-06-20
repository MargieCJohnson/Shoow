import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { auth } from "../Firebase/firebase";
import {
  addToList,
  fetchOneFromList,
  updateWatchStatus,
  removeFromList,
} from "../Firebase/lists";
import { successToast, errorToast, infoToast, removeToast } from "../toast";
import { withUser } from "../Firebase/UserContext";
import { normalizeMovie } from "../api/tmdb";
import { parseSnakeCase } from "../utils";
import ListPickerModal from "./ListPickerModal";
import "./AddToEdit.scss";

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
        <span>
          &nbsp;
          {parseSnakeCase(statusOfCurrentMovie)}
        </span>
      );
    } else {
      label = "+ Add to";
    }
    const disabled = isLoading || user.status !== "signedIn";

    return (
      <Fragment>
        <button onClick={showModal} className="list-move-btn">
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>
    </button>
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
