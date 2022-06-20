import React, { Component } from "react";
import PropTypes from "prop-types";
import EpisodePage from "../components/Episodes/EpisodePage";
import { getSeasonFromId, getTVInfo, normalizeMovie } from "../api/tmdb";
import { successToast, errorToast } from "../toast";
import { parseSnakeCase } from "../utils";
import { withUser } from "../Firebase/UserContext";
import {
  setEpisodeStatus,
  onShowSnapshot,
  addToList,
  watchStates,
  setSeasonStatus,
} from "../Firebase/lists";

class EpisodeContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    currentMovie: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired, // from react router
    user: PropTypes.object.isRequired, // from withUser
  };

  state = {
    currentSeason: 1, // only used when browsing All seasons
    numberOfSeasons: 1,
    seasons: {},
    title: "",
    currentShow: {},
    isLoading: true,
    watchedEpisodes: {},
    imdb_id: null,
    /* the watch status/list the current show is in, if the user has already added it */
    statusOfCurrentMovie: null,
    errorMsg: null,
  };

  componentDidMount() {
    // wait until the user has signed in to check their watch status
    // of the current movie
    this.props.user.onChange(user => {
      if (user) {
        this.checkCurrentShow(user);
      }
    });
    this.loadSeason();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadSeason();
    }
  }

  loadSeason() {
    this.setState({ isLoading: true, errorMsg: "" });
    const { id, seasonNumber } = this.props.match.params;

    let seasonFetch;
    if (seasonNumber === "all") {
      // reset all season data
      this.setState({
        currentSeason: 1,
        seasons: {},
      });
      seasonFetch = getSeasonFromId(id, this.state.currentSeason);
    } else {
      seasonFetch = getSeasonFromId(id, seasonNumber || 1);
    }

    const { currentMovie } = this.props;
    if (!currentMovie || currentMovie.id !== id) {
      getTVInfo(this.props.match.params.id).then(show => {
        this.setState({
          title: show.name,
          currentShow: normalizeMovie(show),
          numberOfSeasons: show.number_of_seasons,
          imdb_id: show.external_ids.imdb_id,
        });
      });
    }

    seasonFetch
      .then(episodes => {
        this.setState(prevState => ({
          seasons: {
            ...prevState.seasons,
            [seasonNumber === "all"
              ? this.state.currentSeason
              : seasonNumber]: episodes,
          },
          isLoading: false,
        }));
      })
      .catch(err => {
        this.setState({
          errorMsg: err.toString(),
          isLoading: false,
        });
      });
  }

  loadAndAppend = async () => {
    const { id } = this.props.match.params;
    const { currentSeason } = this.state;
    const nextSeason = await getSeasonFromId(id, currentSeason + 1);
    this.setState(prevState => ({
      currentSeason: prevState.currentSeason + 1,
      seasons: {
        ...prevState.seasons,
        [currentSeason + 1]: nextSeason,
      },
    }));
  };

  checkCurrentShow(user) {
    const { id } = this.props.match.params;
    this.unsubscribe = onShowSnapshot(user.uid, id, doc => {
      const data = doc.data();
      if (!data) return;

      this.setState({
        watchedEpisodes: data.episodes_watched || {},
        statusOfCurrentMovie: data.watch_status,
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  // passed down to EpisodePage -> Season -> EpisodeItem / EpisodeMobileItem
  addEpisode = async ({ id, seasonNumber, episodeNumber }) => {
    setEpisodeStatus(id, seasonNumber, episodeNumber, true);

    // if show isn't in list, add to watching by default
    const { statusOfCurrentMovie, currentShow } = this.state;
    if (!statusOfCurrentMovie) {
      try {
        addToList(currentShow, watchStates.watching);
        successToast(
          `Added ${currentShow.title} to ${parseSnakeCase(
            watchStates.watching,
          )}`,
        );
      } catch (error) {
        errorToast("Something went wrong, please try again");
      }
    }
  };

  // passed down to EpisodePage -> Season -> EpisodeItem / EpisodeMobileItem
  removeEpisode = ({ id, seasonNumber, episodeNumber }) => {
    setEpisodeStatus(id, seasonNumber, episodeNumber, false);
  };

  // passed down to EpisodePage -> Season
  setSeason = (seasonNumber, add) => {
    const { seasons, statusOfCurrentMovie, currentShow } = this.state;
    setSeasonStatus(
      currentShow.id,
      seasonNumber,
      seasons[seasonNumber].length,
      add,
    );

    // if show isn't in list, add to watching by default
    if (!statusOfCurrentMovie && add) {
      try {
        addToList(currentShow, watchStates.watching);
        successToast(
          `Added ${currentShow.title} to ${parseSnakeCase(
            watchStates.watching,
          )}`,
        );
      } catch (error) {
        errorToast("Something went wrong, please try again");
      }
    }
  };

  render() {
    const { id, seasonNumber } = this.props.match.params;

    return (
      <EpisodePage
        title={this.state.title}
        errorMsg={this.state.errorMsg}
        seasons={this.state.seasons}
        numberOfSeasons={this.state.numberOfSeasons}
        watchedEpisodes={this.state.watchedEpisodes}
        showId={id}
        imdb_id={this.state.imdb_id}
        seasonNumber={seasonNumber}
        isLoading={this.state.isLoading}
        addEpisode={this.addEpisode}
        removeEpisode={this.removeEpisode}
        setSeason={this.setSeason}
        loadAndAppend={this.loadAndAppend}
      />
    );
  }
}

export default withUser(EpisodeContainer);
