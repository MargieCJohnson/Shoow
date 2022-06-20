import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { multiSearch } from "../api/tmdb";
import Searchpage from "../components/SearchPage/Searchpage";

class SearchpageContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    searchResults: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.object).isRequired,
      currentPage: PropTypes.number,
      totalResults: PropTypes.number,
      totalPages: PropTypes.number,
    }).isRequired,
    setSearchResults: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props) {
    // is true if the user arrives at the search page by backing from
    // the details page of a search result
    if (
      props.history.action === "POP" &&
      props.searchResults.results.length !== 0
    ) {
      const url = new URLSearchParams(props.location.search);
      const query = url.get("query");

      // set the query state so componentDidUpdate isn't triggered when
      // loadMoreAndAppend is called for the first time
      return { query };
    }
    return null;
  }

  state = {
    query: "",
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    // if the component is mounted by the user backing in the browser,
    // no need to search again
    if (this.props.history.action === "POP") return;

    const query = this.getQuery();
    this.search(query);
  }

  componentDidUpdate(prevProps) {
    const query = this.getQuery();
    if (
      this.props.location !== prevProps.location ||
      query !== this.state.query
    ) {
      this.search(query);
    }
  }

  getQuery() {
    const url = new URLSearchParams(this.props.location.search);
    return url.get("query");
  }

  async search(query) {
    if (!query) return;

    this.setState({ error: null });

    try {
      this.setState({ query, isLoading: true });
      const resp = await multiSearch(query);
      this.props.setSearchResults({
        results: resp.results,
        currentPage: resp.page,
        totalPages: resp.total_pages,
        totalResults: resp.total_results,
      });
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ isLoading: false });
  }

  loadMoreAndAppend = async () => {
    const { currentPage } = this.props.searchResults;

    try {
      const resp = await multiSearch(this.state.query, currentPage + 1);
      this.props.setSearchResults({
        results: [...this.props.searchResults.results, ...resp.results],
        currentPage: resp.page,
        totalPages: resp.total_pages,
        totalResults: resp.total_results,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  };

  render() {
    const { searchResults } = this.props;
    const { results, currentPage, totalPages, totalResults } = searchResults;
    const { query, error, isLoading } = this.state;

    if (error) {
      return (
        <div className="container">
          Looks like something went wrong :(
          <br />
          Are you offline?
        </div>
      );
    }

    return (
      <Searchpage
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        query={query}
        loadMoreFunc={this.loadMoreAndAppend}
        isLoading={isLoading}
      />
    );
  }
}

export default withRouter(SearchpageContainer);
