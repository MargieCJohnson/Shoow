import React, { Component } from "react";
import Download from "../Torrents/DownloadItem.jsx";
import Player from '../Player/MoviePlayer';
import { Link } from "react-router-dom";

class EpisodeServers extends Component {

  state = {
    selectedOption: "",
    openVideo: false,
    openNotif: false,
    iframeLoaded: false,
    display: true,
    populardownload: [],
    pop: [],
    links: false,
    fileStatus: [],
    loading: true,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.value });
    this.setState({ serverStatus: false });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.value });
    this.setState({ serverStatus: false });
    this.setState({ openNotif: true });
  };

  openServers = () => {
    this.setState({ serverStatus: true });
  };

  closeServers = () => {
    this.setState({ serverStatus: false });
  };

  closeNotif = () => {
    this.setState({ openNotif: false})
  };

  cancelModal = () => {
    this.props.hideFunc();
    this.setState({ iframeLoaded: false});
  };

  closeDisplay = () => {
    this.setState({ display: false });
  }

  openIframe = () => {
    this.setState({ iframeLoaded: true});
    this.setState({ openNotif: false});
  }

  openLinks = () => {
    this.setState({ links: true });
  };

  closeLinks = () => {
    this.setState({ links: false });
  }



  render() {
    const { isOpen, showId, imdb_id, url, episodeNumber, seasonNumber } = this.props;
    const { cancelModal, openLinks, closeLinks } = this;
    const isVideoOpen = isOpen ? "is-modal-active" : "";
    let player;
    
    const server = localStorage.getItem('server_series');
    if(server == 1) {
      const link = `//www.2embed.ru/embed/tmdb/tv?id=${showId}&s=${seasonNumber}&e=${episodeNumber}`;
      player = (
      <>
                <Download
                handleChange={cancelModal}
                url={url}
                isOpen={isOpen}
                link={link}
              />
              </>
              );
    }else if (server == 2) {
      const link = `//v2.vidsrc.me/embed/${imdb_id}/${seasonNumber}-${episodeNumber}/`;
      player = (
      <>
                <Download
                handleChange={cancelModal}
                url={url}
                isOpen={isOpen}
                link={link}
              />
              </>
              );
    } else {
        const link = `//www.2embed.ru/embed/tmdb/tv?id=${showId}&s=${seasonNumber}&e=${episodeNumber}`;
        player = (
          <>
            <Download
                handleChange={cancelModal}
                url={url}
                isOpen={isOpen}
                link={link}
              />
        </>
        );
    }

    return (
      <>
        <div className={`modal modal--fullscreen ${isVideoOpen}`}>
          <div class="modal__dialog">
            <div class="modal__content">
            {/* <div class="change_link_icon" onClick={openLinks}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" />
            </svg>
          </div>
          <div
            id="open-modal"
            class="modal-window"
            style={{ display: `${this.state.links ? "block" : "none"}` }}
          >
            <div>
              <a onClick={closeLinks} title="Close" class="modal-close">
                Close
              </a>
              <h1>Voilà!</h1>
              <Link
                to={`/settings`}
              ><button className="gdrive-btn">Select Server</button></Link>
              <div>
                <small>VidCloud, Jplayer</small>
              </div>
              <a href="" target="_blank">
                👉 Recommended Alternative!
              </a>
            </div>
          </div> */}
              {player}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EpisodeServers;
