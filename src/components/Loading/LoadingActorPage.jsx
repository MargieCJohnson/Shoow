import React from "react";
import LoadingText from "./LoadingText";
import "./LoadingActorPage.scss";

function LoadingActorPage() {
  return (
    <div className="actor-presentation loading-actor-page">
      <div className="actor-facts">
        <div className="poster" />
        <div className="personal">
          <LoadingText type="long" />
          <br />
        </div>
        <LoadingText type="long" />
        <br />
        <LoadingText type="short" />
        <br />
        <LoadingText type="long" />
        <br />
        <LoadingText type="word" />
        <br />
      </div>
      <div className="main-info">
        <h1>
          <LoadingText type="half" />
        </h1>
        <LoadingText type="paragraph" />
      </div>
    </div>
  );
}

export default LoadingActorPage;
