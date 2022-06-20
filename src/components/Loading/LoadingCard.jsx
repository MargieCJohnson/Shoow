import React from "react";
import "./LoadingCard.scss";

function LoadingCard({ grid }) {
  return (
    <div className={`${grid ? "loading-card-grid" : "loading-card"}`}>
      <div className="poster" />
      <div className="title" />
    </div>
  );
}

export default LoadingCard;
