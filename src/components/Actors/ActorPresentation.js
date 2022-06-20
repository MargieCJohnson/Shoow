import React from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import "./ActorPresentation.scss";
import Seo from "../Seo";

function checkSocialMedia(externalIDs) {
  const socialMedia = [];
  if (externalIDs.facebook_id) {
    socialMedia.push(
      <a
        href={`https://www.facebook.com/${externalIDs.facebook_id}`}
        key="facebook"
      >      </a>,
    );
  }
  if (externalIDs.instagram_id) {
    socialMedia.push(
      <a
        href={`https://www.instagram.com/${externalIDs.instagram_id}`}
        key="instagram"
      >
      </a>,
    );
  }
  if (externalIDs.instagram_id) {
    socialMedia.push(
      <a href={`https://twitter.com/${externalIDs.twitter_id}`} key="twitter">
      </a>,
    );
  }
  if (socialMedia.length === 0) {
    return "Not available";
  }
  return socialMedia;
}

/**
 * The title (poster, name, rating etc) for the movie details page
 */
function ActorPresentation({ currentActor }) {
  let knowncredits = 0;
  if (currentActor.combined_credits.cast.length !== 0) {
    knowncredits = currentActor.combined_credits.cast.length;
    if (currentActor.combined_credits.crew.length !== 0) {
      knowncredits += currentActor.combined_credits.crew.length;
    }
  }

  return (
  <><Seo title={currentActor.name} pathSlug={`person/${currentActor.id}`} descriptions={`Check ${currentActor.name} personal information, including birthday, biography and social media.`}/>
    <div className="actor-presentation">
      <div className="actor-facts">
        <ImageWithFallback
          className="poster"
          src={currentActor.profile_path}
          imgSize="w500"
          alt={`Poster for ${currentActor.name}`}
          mediaType="person"
        />
        <h1 className="personal">Personal Information</h1>

        <h2>Place of Birth</h2>
        <p>{currentActor.place_of_birth || "Not available"}</p>

        <h2>Birthday</h2>
        <p>{currentActor.birthday || "Not available"}</p>

        <h2>Known Credits</h2>
        <p>{knowncredits}</p>

        <h2>Official Homepage</h2>
        {currentActor.homepage ? (
          <a href={`${currentActor.homepage}`}>Link</a>
        ) : (
          "Not available"
        )}

        <h2>Social Media</h2>
        {checkSocialMedia(currentActor.external_ids)}
      </div>
      <div className="main-info">
        <h1>{currentActor.name}</h1>
        <h2>Biography</h2>
        {currentActor.biography
          ? currentActor.biography
              .split("\n")
              .map(text => text && <p key={text}>{text}</p>)
          : "Not available"}
      </div>
    </div>
    </>
  );
}

ActorPresentation.propTypes = {
  currentActor: PropTypes.object.isRequired,
};

export default ActorPresentation;
