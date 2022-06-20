import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Download from "../Torrents/DownloadItem.jsx";
import {
  updateLink,
} from "../../Firebase/lists";

class MovieServers extends Component {
  state = {
    display: true,
    links: false,
    movie_link: "",
    addedmsg: false,
    errormsg: false,
    populardownload: "",
    getData: "",
  };

  componentDidMount() {
    let pop_status = localStorage.getItem('server_movie');
    if(pop_status == 2) {
    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${this.props.imdb}&with_images=true&with_cast=true`)
      .then((response) => {
        this.setState({
          populardownload: response.data,
        })
        const gg = this.state.populardownload.data.movies;        
        gg.forEach((s) => {
          s.torrents.forEach((e) => {
           if(e.quality === "1080p") {
             this.setState({ getData: e.hash })
           };
           console.log(this.state.getData);
          });
         });

      }).catch(err => console.log(err));
    }
  }


  cancelModal = () => {
    this.props.hideFunc();
    this.setState({ display: true });
  };

  openLinks = () => {
    this.setState({ links: true });
  };

  closeLinks = () => {
    this.setState({ links: false });
  }

  submitLink = event => {
    event.preventDefault();
    if(this.state.movie_link) {
      updateLink(this.props.id, this.state.movie_link);
      this.setState({ addedmsg: true });
      setTimeout(() => window.location.reload(false), 3000);
    } else {
      this.setState({ errormsg: true });
    }
  }

  handleChange = event => {
    event.preventDefault();
    if (event.target.type === "text") {
      this.setState({ movie_link: event.target.value });
    }
  }

  render() {
    const { isOpen, imdb, url } = this.props;
    const { cancelModal, openLinks } = this;
    let player;

    const isVideoOpen = isOpen ? "is-modal-active" : "";
    const server = localStorage.getItem("server_movie");
    if (server == 1) {
      const link = `//www.2embed.ru/embed/imdb/movie?id=${imdb}`;
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
    } else if (server == 3) {
      const link = `//olgply.com/api/?imdb=${imdb}`;
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
      } else if (server == 4) {
        const link = `//v2.vidsrc.me/embed/${imdb}`;
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
    } else if (server == 2) {
      const link = `//5160.svetacdn.in/YaLsvISc5iCz?imdb_id=${imdb}&translation=381&poster=https://image.tmdb.org/t/p/original/${url}`;
      player = (
        <>
          <div
            id="open-modal"
            class="modal-window"
            style={{ display: `${this.state.links ? "block" : "none"}` }}
          >
            <div>
              <a onClick={this.closeLinks} title="Close" class="modal-close">
                Close
              </a>
              <h1>Voilà!</h1>
              <div>
                <input class="google-drive-text" type="text" value={this.state.movie_link} onChange={this.handleChange} placeholder="Enter your Google Drive ID"></input>
              </div>
              <button className="gdrive-btn" onClick={this.submitLink}>Add</button>
              <div className="notification-dgrive" style={{ display: this.state.addedmsg ? "block" : "none" }}>Successfully Added! 🌟</div>
              <div className="notification-dgrive-error" style={{ display: this.state.errormsg ? "block" : "none" }}>Error: Please Add Link 👍</div>
              <div>
                <small>Check out</small>
              </div>
              <a href="" target="_blank">
                👉 Shoow: Google Drive Player
              </a>
            </div>
          </div>
          <Download
            handleChange={cancelModal}
            url={url}
            isOpen={isOpen}
            link={link}
          />
        </>
      );
    } else {
      // const link = `//5160.svetacdn.in/YaLsvISc5iCz?imdb_id=${imdb}&translation=381&poster=https://image.tmdb.org/t/p/original/${url}`;
      const link = `//www.2embed.ru/embed/imdb/movie?id=${imdb}`;
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
          <div className="modal__dialog">
            <div className="modal__content">
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
              <a onClick={this.closeLinks} title="Close" class="modal-close">
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
          {player}</div>
          </div>
          </div>
      </>
    );
  }
}

/**
 * 
 *           <div class="change_link_icon" onClick={openLinks}>
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
          
 */

export default MovieServers;
