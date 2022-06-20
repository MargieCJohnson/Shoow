import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import PosterGrid from "../PosterGrid/PosterGrid";
import LoadingGrid from "../Loading/LoadingGrid";
import "./Searchpage.scss";

/**
 * Markup for the search page
 */
function Searchpage({
  results,
  currentPage,
  totalPages,
  totalResults,
  query,
  loadMoreFunc,
  isLoading,
}) {
  let content;
  if (isLoading) {
    content = <LoadingGrid />;
  } else if (results.length === 0) {
    content = "No results :(";
  } else {
    content = <PosterGrid movies={results} />;
  }

  return (
    <section id="searchpage" className="container">
      <p className="info">
        Page {currentPage} of {totalPages}. Showing {results.length} results of{" "}
        {totalResults}
      </p>
      <section>
        <h1>Search results for {query}</h1>
        <InfiniteScroll
          loadMore={loadMoreFunc}
          hasMore={currentPage !== totalPages}
        >
          {content}
        </InfiniteScroll>
      </section>
    </section>
  );
}

Searchpage.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
};

Searchpage.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  loadMoreFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchpage;
