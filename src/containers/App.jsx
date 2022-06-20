import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { watchStates } from "../Firebase/lists";
import { UserProvider } from "../Firebase/UserContext";
import ScrollToTop from "../components/Scroll/ScrollToTop";
import HomepageContainer from "./HomepageContainer";
import SearchpageContainer from "./SearchpageContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import DynamicHeader from "./DynamicHeader";
import DetailspageContainer from "./DetailspageContainer";
import ActorPageContainer from "./ActorPageContainer";
import UserList from "./UserList";
import BrowseMoviesContainer from "./BrowseMoviesContainer";
import BrowseTvContainer from "./BrowseTvContainer";
import EpisodeContainer from "./EpisodeContainer";
import { createDebouncedFunc } from "../utils";
import NewPassword from "../components/NewPassword/NewPassword";
import NotFoundPage from "../components/404/404";
import SignUpPage from "../components/Login/SignUpPage";
import LogInPage from "../components/Login/LogInPage";
import Questions from "../components/Questions/Questions";
import Discord from "../components/Questions/Discord";
import Settings from "../components/Settings/Settings";

import "./App.scss";


const SEARCH_DEBOUNCE_TIME = 800;

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // from react-router
  };

  /**
   * This function makes the sidebar close whenever
   * the user clicks a link in the sidebar
   */

  componentDidMount() {
      let pop_status = localStorage.getItem('sidebar-status');
      if(pop_status) {
          this.setState({ side: true });
      } else {
          this.setState({ side: false });
        }
    }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.location !== nextProps.location) {
      return {
        sidebarIsOpen: false,
        location: nextProps.location,
      };
    }
    return { location: nextProps.location };
  }

  state = {
    sidebarIsOpen: false,
    searchWords: "",
    side: true,
    nowPlayingMovies: [],
    nowAiringTVShows: [],
    nowHorrorMovies: [],
    nowScifiMovies: [],
    nowKidsMovies: [],
    nowThrillerMovies: [],
    nowDocumentaries: [],
    currentMovie: {},
    currentActor: {},
    searchResults: {
      results: [],
      currentPage: null,
      totalResults: null,
      totalPages: null,
    },
  };


  setNowDocumentaries = nowDocumentaries => {
    this.setState({ nowDocumentaries });
  }

  setNowScifiMovies = nowScifiMovies => {
    this.setState({ nowScifiMovies });
  }

  setCurrentActor = currentActor => {
    this.setState({ currentActor });
  };

  setCurrentMovie = currentMovie => {
    this.setState({ currentMovie });
  };

  setNowKidsMovies = nowKidsMovies => {
    this.setState({ nowKidsMovies });
  }

  setNowThrillerMovies = nowThrillerMovies => {
    this.setState({ nowThrillerMovies });
  };

  setNowHorrorMovies = nowHorrorMovies => {
    this.setState({ nowHorrorMovies });
  };

  setNowPlayingMovies = nowPlayingMovies => {
    this.setState({ nowPlayingMovies });
  };

  setNowAiringTVShows = nowAiringTVShows => {
    this.setState({ nowAiringTVShows });
  };

  setSearchResults = searchResults => {
    this.setState({ searchResults });
  };

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
  };

  lessSidebar = () => {
    this.setState({ side: false });
  }

  expandSidebar = () => {
    this.setState({ side: true });
  }

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  };

  searchHandler = query => {
    this.setSearchbarValue(query);
    this.search(query);
  };

  search = createDebouncedFunc(query => {
    // don't need to search if the user just clears the search bar
    if (query === "") return;
    this.props.history.push(`/search?query=${query}`);
  }, SEARCH_DEBOUNCE_TIME);

  setSearchbarValue = searchWords => {
    this.setState({ searchWords });
  };

  render() {
    const {
      sidebarIsOpen,
      nowPlayingMovies,
      nowHorrorMovies,
      nowKidsMovies,
      nowScifiMovies,
      nowAiringTVShows,
      nowThrillerMovies,
      nowDocumentaries,
      searchResults,
      currentMovie,
      currentActor,
      side,
    } = this.state;

    const {expandSidebar, lessSidebar} = this

    const sidebarOverlay = (
      <div
        id="overlay"
        className={sidebarIsOpen ? "open" : "closed"}
        onClick={this.closeSidebar}
        role="presentation"
      />
    );

    const listNames = Object.values(watchStates).join("|");

    return (
      <UserProvider>
        <ScrollToTop>
          {sidebarOverlay}
          <ToastContainer
            className="toast-container"
            toastClassName="toast"
            hideProgressBar
            closeButton={false}
            position="bottom-left"
            transition={Slide}
            autoClose={3000}
          />
          <Sidebar handleChange={lessSidebar} handleExpand={expandSidebar} isOpen={sidebarIsOpen} closeSidebar={this.closeSidebar}>asdad</Sidebar>
          <div id={side ? "main-container" : "less-container"}>
            <DynamicHeader
              toggleSidebar={this.toggleSidebar}
              searchHandler={this.searchHandler}
              setSearchbarValue={this.setSearchbarValue}
              searchbarValue={this.state.searchWords}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <HomepageContainer
                    movies={nowPlayingMovies}
                    series={nowAiringTVShows}
                    horror={nowHorrorMovies}
                    kids={nowKidsMovies}
                    scifi={nowScifiMovies}
                    thriller={nowThrillerMovies}
                    documentary={nowDocumentaries}
                    setNowScifiMovies={this.setNowScifiMovies}
                    setNowKidsMovies={this.setNowKidsMovies}
                    setNowThrillerMovies={this.setNowThrillerMovies}
                    setNowHorrorMovies={this.setNowHorrorMovies}
                    setNowPlayingMovies={this.setNowPlayingMovies}
                    setNowAiringTVShows={this.setNowAiringTVShows}
                    setNowDocumentaries={this.setNowDocumentaries}
                  />
                )}
              />
              <Route
                exact
                path="/shows"
                render={() => <Redirect to="/shows/popular" />}
              />
              <Route
                path="/shows/:filter/:id?"
                render={props => <BrowseTvContainer {...props} />}
              />
              <Route
                exact
                path="/movies"
                render={() => <Redirect to="/movies/popular" />}
              />
              <Route
                path="/movies/:filter/:id?"
                render={props => <BrowseMoviesContainer {...props} />}
              />
              <Route
                exact
                path="/:mediaType(movie|tv)/:id"
                render={props => (
                  <DetailspageContainer
                    {...props}
                    currentMovie={currentMovie}
                    setCurrentMovie={this.setCurrentMovie}
                  />
                )}
              />
              <Route
                exact
                path="/person/:id"
                render={props => (
                  <ActorPageContainer
                    {...props}
                    currentActor={currentActor}
                    setCurrentActor={this.setCurrentActor}
                  />
                )}
              />
              <Route
                exact
                path="/tv/:id/episodes"
                render={() => <Redirect to="1" />}
              />
              <Route
                exact
                path="/tv/:id/episodes/:seasonNumber"
                render={props => (
                  <EpisodeContainer {...props} currentMovie={currentMovie} />
                )}
              />
              <Route
                path="/search"
                render={() => (
                  <SearchpageContainer
                    searchResults={searchResults}
                    setSearchResults={this.setSearchResults}
                  />
                )}
              />
              <Route
                exact
                path="/user/:userId/:listName/"
                render={() => <Redirect to="all" />}
              />
              <Route
                path={`/user/:userId/:listName(${listNames})/:mediaType(all|movie|tv)`}
                component={UserList}
              />
              <Route exact path="/forgot_password" component={NewPassword} />
              <Route path="/login" component={LogInPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/help" component={Questions} />
              <Route path="/settings" component={Settings} />
              <Route path="/discord" component={Discord} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </ScrollToTop>
      </UserProvider>
    );
  }
}

// DragDropContext enables react-dnd to work in our app
// withRouter gives App access to history, location, match
export default withRouter(App);
