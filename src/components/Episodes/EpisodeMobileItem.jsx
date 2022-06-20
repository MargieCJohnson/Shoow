import React, { Component } from "react";
import PropTypes from "prop-types";
import { SignedIn, SignedOut } from "../UserState/UserState";
import EpisodeServers from "../Servers/EpisodeServers";
import "./EpisodeMobileItem.scss";
import Seo from "../Seo";
import ShareButton from "../PrimaryButton/ShareButton";



class EpisodeMobileItem extends Component {
  static propTypes = {
    addEpisode: PropTypes.func.isRequired,
    removeEpisode: PropTypes.func.isRequired,
    watched: PropTypes.bool.isRequired,
    showId: PropTypes.string.isRequired,
    episodeNumber: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  state = {
    isOpen: false,
    modalIsOpen: false,
  };


  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  hideModal = () => {
    this.setState({ modalIsOpen: false});
  };

  toggle = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { toggle, hideModal, showModal } = this;
    const { isOpen } = this.props;
    const { modalIsOpen } = this.state;
    const {
      addEpisode,
      removeEpisode,
      watched,
      name,
      title,
      episodeNumber,
      seasonNumber,
      description,
      poster,
      showId,
    } = this.props;

    let mobileItem;
    let checkBox;
    const show = {
      id: this.props.showId,
      episodeNumber: this.props.episodeNumber,
      seasonNumber,
    };

    if (watched) {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => removeEpisode(show)}
        >

        </button>
      );
    } else {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => addEpisode(show)}
        >
         
        </button>
      );
    }

    if (this.state.isOpen) {
      mobileItem = (
        <div className="expandedItemBox">
          <div className="expandedTitleBar">
            <div className="episodeNumber">{episodeNumber}</div>
            <div className="episodeTitleBox" onClick={toggle}>{name}</div>
          </div>
          <div className="expandedDescriptionBox">{description} <br />
          <ShareButton onClick={showModal} title={`Play Episode ${episodeNumber}`} style={{ 'display': name ? 'block' : 'none', 'margin-top': '10px'}} /></div>
          <Seo
            title={`You're Watching (${name}): Episode ${episodeNumber}, Season ${seasonNumber}`}
            descriptions={`Watch (${name}): Episode ${episodeNumber}, Season ${seasonNumber} in HD Quality for free!`}
            keywords={`Watch and Download ${name} in 480p, 720p, 1080p HD Quality for free!`}
          />
          <EpisodeServers
        isOpen={modalIsOpen}
        hideFunc={hideModal}
        showId={showId}
        url={poster}
        episodeNumber={episodeNumber}
        seasonNumber={seasonNumber}
        name={name}
        title={title}
        />
      </div>
      );
    } else {
      mobileItem = (
        <div
          className="episodeMobileItem"
        >
          <div>
            <div className="episodeNumber">{episodeNumber}</div>
          </div>
          <div className="episodeMobileTitle">{name}</div>
          <button className="expandBoxButton" onClick={toggle} />
          <SignedIn>{() => checkBox}</SignedIn>
          {/* put an empty div so the three column layout still works */}
          <SignedOut>
            <div />
          </SignedOut>
        </div>
      );
    }

    return (
      <>
        {mobileItem}
      </>
    );
  }
}

export default EpisodeMobileItem;
