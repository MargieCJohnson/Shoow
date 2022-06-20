import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import PosterGrid from "../PosterGrid/PosterGrid";
import Searchbar from "../Searchbar/Searchbar";
import "./BrowseYear.scss";

function BrowseYear({
  movies,
  searchValue,
  search,
  setSearchbarValue,
  statusMsg,
  currentPage,
  totalPages,
  loadMoreFunc,
}) {
  return (
    <Route
      path="/(movies|shows)/year/"
      render={() => (
        <section>
          <div className="yearbar">
            <div id="yearbar-text">Search by year</div>
            <Searchbar
              value={searchValue}
              search={search}
              setSearchbarValue={setSearchbarValue}
            />
          </div>
          {statusMsg}
          <InfiniteScroll
            loadMore={loadMoreFunc}
            hasMore={currentPage !== totalPages}
          >
            <PosterGrid movies={movies} />
          </InfiniteScroll>
        </section>
      )}
    />
  );
}

BrowseYear.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
  statusMsg: PropTypes.node.isRequired,
  loadMoreFunc: PropTypes.func.isRequired,
  currentPage: PropTypes.any.isRequired,
  totalPages: PropTypes.any.isRequired,
};

export default BrowseYear;
