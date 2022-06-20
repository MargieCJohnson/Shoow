import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Season from "./Season";
import Tabs from "../Tabs/Tabs";
import LoadingEpisodePage from "../Loading/LoadingEpisodePage";
import "./EpisodePage.scss";
import Seo from "../Seo";
import BackButton from './back.svg';

function mapSeasonsToTabs(numberOfSeasons, showId) {
  const baseUrl = `/tv/${showId}/episodes`;
  const tabLinks = {};
  for (let i = 1; i <= numberOfSeasons; i++) {
    tabLinks[i] = `${baseUrl}/${i}`;
  }
  return tabLinks;
}

function EpisodePage({
  title,
  seasons,
  errorMsg,
  numberOfSeasons,
  watchedEpisodes,
  seasonNumber,
  isLoading,
  addEpisode,
  removeEpisode,
  showId,
  imdb_id,
  setSeason,
  loadAndAppend,
}) {
  if (isLoading) {
    return <LoadingEpisodePage />;
  }

  let content;
  if (errorMsg) {
    content = "No episodes found :(";
  } else if (seasonNumber === "all") {
    content = (
      <InfiniteScroll
        loadMore={loadAndAppend}
        hasMore={seasonNumber !== numberOfSeasons}
      >
        {Object.entries(seasons).map(([num, episodes]) => (
          <Season
            key={num}
            title={title}
            imdb_id={imdb_id}
            episodes={episodes}
            watchedEpisodes={watchedEpisodes}
            seasonNumber={parseInt(num, 10)}
            addEpisode={addEpisode}
            removeEpisode={removeEpisode}
            showId={showId}
            setSeason={setSeason}
          />
        ))}
      </InfiniteScroll>
    );
  } else {
    content = (
      <Season
        title={title}
        episodes={seasons[seasonNumber] || []}
        watchedEpisodes={watchedEpisodes}
        seasonNumber={parseInt(seasonNumber, 10)}
        addEpisode={addEpisode}
        imdb_id={imdb_id}
        removeEpisode={removeEpisode}
        showId={showId}
        setSeason={setSeason}
      />
    );
  }

  return (
    <section className="container episode-page">
    <Seo
      title={`Watch ${title} in HD quality for free`}
      descriptions={`Watch latest season of ${title} in 1080, 720p, 480p quality for free!`}
      pathSlug={`tv/${showId}/episodes/${seasonNumber}`}
      />
      <Link to={`/tv/${showId}`}>
        <h1 className="show-title">
          <BackButton width="25px" fill="currentColor" />
          &nbsp;
          {title}
        </h1>
      </Link>
      <Tabs links={mapSeasonsToTabs(numberOfSeasons, showId)} />
      {content}
    </section>
  );
}

EpisodePage.defaultProps = {
  errorMsg: "",
};

EpisodePage.propTypes = {
  title: PropTypes.string.isRequired,
  seasons: PropTypes.object.isRequired,
  errorMsg: PropTypes.string,
  numberOfSeasons: PropTypes.number.isRequired,
  watchedEpisodes: PropTypes.object.isRequired,
  seasonNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isLoading: PropTypes.bool.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  setSeason: PropTypes.func.isRequired,
  loadAndAppend: PropTypes.func.isRequired,
};

export default EpisodePage;
