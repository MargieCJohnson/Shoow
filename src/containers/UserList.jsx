import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ResponsiveList from "../components/WatchList/ResponsiveList";
import { parseSnakeCase } from "../utils";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ListPickerModal from "./ListPickerModal";
import { errorToast, infoToast, removeToast } from "../toast";
import { normalizeMovie } from "../api/tmdb";
import {
  fetchAllFromList,
  removeFromList,
  sortBy,
  updateWatchStatus,
} from "../Firebase/lists";

class UserList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props) {
    // set the display name of the list
    const { listName } = props.match.params;
    const listDisplayName = parseSnakeCase(listName);
    return { listDisplayName };
  }

  state = {
    error: false,
    isLoading: false,
    listDisplayName: "",
    isEditMode: false,
    listEntries: [],
    modalIsOpen: false,
    currentMovie: null,
  };

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchList();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async fetchList() {
    this.setState({ isLoading: true });
    const { userId, listName, mediaType } = this.props.match.params;
    this.unsubscribe = await fetchAllFromList(
      userId,
      listName,
      mediaType,
      snapshot => {
        const entries = snapshot.docs.map(doc => doc.data());
        const sorted = sortBy(entries, "title");
        this.setState({ listEntries: sorted, isLoading: false });
      },
    );
  }

  toggleEditMode = () => {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  };

  deleteEntry = movie => {
    removeFromList(movie.id)
      .then(() => {
        removeToast(
          `Removed ${movie.title} from ${this.state.listDisplayName}`,
        );
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  showModal = currentMovie => {
    this.setState({ modalIsOpen: true, currentMovie });
  };

  hideModal = () => {
    this.setState({ modalIsOpen: false });
  };

  /**
   * Adds the current movie to the list that the user selects
   * from the ListPickerModal
   */
  onModalSubmit = async selectedList => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.state;
    const movie = normalizeMovie(currentMovie);
    try {
      updateWatchStatus(movie, selectedList);
      infoToast(`${movie.title} moved to ${parseSnakeCase(selectedList)}`);
    } catch (error) {
      errorToast(`Something went wrong when adding ${movie.title}`);
    }
    this.setState({ isLoading: false });
  };

  onModalRemove = async selectedList => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.state;
    const movie = normalizeMovie(currentMovie);
    try {
      await removeFromList(currentMovie.id);
      removeToast(
        `Removed ${movie.title} from ${parseSnakeCase(selectedList)}`,
      );
    } catch (error) {
      errorToast(`Something went wrong when trying to remove ${movie.title}`);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const {
      isLoading,
      error,
      listDisplayName,
      listEntries,
      isEditMode,
    } = this.state;

    if (error) {
      return (
        <div className="container">
          <ErrorMessage>Something went wrong :(</ErrorMessage>
        </div>
      );
    }

    const { userId, listName } = this.props.match.params;
    const baseUrl = `/user/${userId}/${listName}`;
    const tabLinks = {
      All: `${baseUrl}/all`,
      Movies: `${baseUrl}/movie`,
      "TV Shows": `${baseUrl}/tv`,
    };

    return (
      <Fragment>
        <ResponsiveList
          isLoading={isLoading}
          listDisplayName={listDisplayName}
          tabLinks={tabLinks}
          entries={listEntries}
          toggleEditMode={this.toggleEditMode}
          deleteEntry={this.deleteEntry}
          isEditMode={isEditMode}
          listUserId={userId}
          onMove={this.showModal}
        />
        <ListPickerModal
          isOpen={this.state.modalIsOpen}
          hideFunc={this.hideModal}
          onSubmit={this.onModalSubmit}
          statusOfCurrent={listName}
          onRemove={this.onModalRemove}
        />
      </Fragment>
    );
  }
}

export default UserList;
