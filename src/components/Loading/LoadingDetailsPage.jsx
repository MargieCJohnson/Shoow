import React from "react";
import "./LoadingDetailsPage.scss";

function LoadingDetailsPage() {
  return (
    <div className="loading-details-page">
      <div id="banner">
        <div className="gradient" />
      </div>
      <div className="details-title">
        <div className="poster" />
        <div className="text">
          <div className="title" />
          <div className="info" />
          <div className="bottom" /> 
        </div>
      </div>
    </div>
  );
}

export default LoadingDetailsPage;
