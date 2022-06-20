import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Tabs from "../Tabs/Tabs";
import BrowseGenresContainer from "../../containers/BrowseGenresContainer";
import PosterGrid from "../PosterGrid/PosterGrid";
import BrowseYear from "../Browse/BrowseYear";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingGrid from "../Loading/LoadingGrid";
import Seo from "../Seo";
import Announcement from "../Ads/Announcement";

function BrowsePage({
  movies,
  tabLinks,
  genres,
  genreTitle,
  type,
  isLoading,
  error,
  searchValue,
  search,
  setSearchbarValue,
  currentPage,
  totalPages,
  loadMoreFunc,
}) {
  let titleTabs;
  if (type === "movies") {
    titleTabs = (
      <>
      <Seo 
        title={`Browse movies ${genreTitle}`}
        descriptions="Browse the collection of plenty of on-demand latest movies in HD for free."
        />
        <Announcement />
        <h1>{`Browse movies ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
      </>
    );
  } else if (type === "shows") {
    titleTabs = (
      <>
        <Seo 
          title={`Browse TV shows ${genreTitle}`}
          descriptions="Browse the collection of plenty of on-demand latest TV Shows in HD for free."
        />
        <Announcement />
        <h1>{`Browse TV shows ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
      </>
    );
  }

  let statusMsg;
  if (error) {
    statusMsg = <ErrorMessage>{error}</ErrorMessage>;
  } else if (isLoading) {
    statusMsg = <LoadingGrid />;
  }

  return (
    <section className="container">
      {titleTabs}
      <Switch>
        <Route
          exact
          path="/(movies|shows)/genre/"
          render={props => (
            <div>
              {statusMsg}
              <BrowseGenresContainer {...props} genres={genres} type={type} />
            </div>
          )}
        />
        <Route
          path="/(movies|shows)/year/"
          render={() => (
            <div>
              <BrowseYear
                movies={movies}
                searchValue={searchValue}
                search={search}
                setSearchbarValue={setSearchbarValue}
                statusMsg={statusMsg}
                currentPage={currentPage}
                totalPages={totalPages}
                loadMoreFunc={loadMoreFunc}
              />
            </div>
          )}
        />
        <Route
          path="/(movies|shows)/:filter"
          render={() => (
            <div>
              {statusMsg}
              <InfiniteScroll
                loadMore={loadMoreFunc}
                hasMore={currentPage !== totalPages}
              >
                <PosterGrid movies={movies} />
              </InfiniteScroll>
            </div>
          )}
        />
      </Switch>
    </section>
  );
}

BrowsePage.propTypes = {
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genreTitle: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
  loadMoreFunc: PropTypes.func.isRequired,
  currentPage: PropTypes.any.isRequired,
  totalPages: PropTypes.any.isRequired,
};

export default BrowsePage;
