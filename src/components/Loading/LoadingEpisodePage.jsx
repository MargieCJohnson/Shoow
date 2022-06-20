import React from "react";
import LoadingText from "./LoadingText";
import "./LoadingEpisodePage.scss";

function LoadingEpisodePage() {
  return (
    <div className="loading-episode-page episode-page container">
      <h1 className="show-title">
        <LoadingText type="long" />
      </h1>
      <br />
      <LoadingText type="half" />
      <div className="season-header">
        <LoadingText type="long" />
        <LoadingText type="short" />
      </div>
    </div>
  );
}

export default LoadingEpisodePage;
