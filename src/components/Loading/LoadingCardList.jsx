import React from "react";
import LoadingText from "./LoadingText";
import "./LoadingCardList.scss";

function LoadingCardList() {
  const items = [];
  const numberOfItems = 4;

  for (let i = 0; i < numberOfItems; i++) {
    items.push(
      <li className="card-list-item loading-card-list-item">
        <div className="poster" />
        <h1 className="title">
          <LoadingText type="long" />
        </h1>
        <div className="info">
          <div className="progress">
            <LoadingText type="word" />
          </div>
          <div className="rating">
            <LoadingText type="word" />
          </div>
          <div className="added">
            <LoadingText type="long" />
          </div>
          <div className="media-type">
            <LoadingText type="word" />
          </div>
        </div>
      </li>,
    );
  }

  return items;
}

export default LoadingCardList;
