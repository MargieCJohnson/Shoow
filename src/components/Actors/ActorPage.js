import React from "react";
import PropTypes from "prop-types";
import ActorPresentation from "./ActorPresentation";
import LoadingActorPage from "../Loading/LoadingActorPage";

/**
 * Markup for the actors page
 */
function ActorPage({ currentActor, isLoading }) {
  if (isLoading) return <LoadingActorPage />;

  return (
    <div>
      <ActorPresentation currentActor={currentActor} />
    </div>
  );
}

ActorPage.propTypes = {
  currentActor: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ActorPage;
