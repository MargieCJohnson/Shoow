import React from "react";
import LoadingCard from "./LoadingCard";
import "../PosterGrid/PosterGrid.scss";

function LoadingGrid({ grid }) {
  const loadingCards = [];
  const numberOfCards = 18;

  for (let i = 0; i < numberOfCards; i++) {
    loadingCards.push(<LoadingCard grid={`${grid ? "yes" : ""}`}key={i} />);
  }
  return <div className={`${ grid ? "card-grid" : "poster-grid"}`}>{loadingCards}</div>;
}

export default LoadingGrid;
