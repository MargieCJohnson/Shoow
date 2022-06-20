import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Seo from "../Seo";
import "./404.scss";

function NotFoundPage({ history }) {
  return (
    <div id="not-found-page">
      <Seo
        title="404"
        crawl="no"
        />
      <h1>404</h1>
      <p>The page you were looking for does not exist</p>
      <PrimaryButton onClick={history.goBack}>Go back</PrimaryButton>
    </div>
  );
}

NotFoundPage.propTypes = {
  /** From react router */
  history: PropTypes.object.isRequired,
};

export default NotFoundPage;
