import React, { Component } from "react";
import "../Servers/Server.scss";

import LeftButtonIcon from "../../assets/leftbutton.svg";


class Downloads extends Component {

  state = {
    iframeLoaded: false,
    display: true,
    s: false,
  };

  componentDidMount() {
    this.timer = setInterval(() => { this.setState({ s: !this.state.test }) }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  openIframe = () => {
    this.setState({ iframeLoaded: true});
  }

  handleAction = () => {
    this.props.handleChange();
    this.setState({ s: false });
  };


  closeDisplay = () => {
    this.setState({ iframeLoaded: false });
    this.setState({ display: false });
  }

  Ys = () => {
    this.setState({ s: true });
  }

  render() {
    const { isOpen, link, url } = this.props;
    const { handleAction } = this;
    var inputProps = {
      sandbox: 'allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation',
    };
    var gg = this.state.iframeLoaded && this.state.s ? inputProps : "";
    const Loading = <div className="gooey">
                      <span className="dot"></span>
                        <div className="dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                    </div>;

    const PlayButton = <div className="play-button-container" onClick={this.closeDisplay}>
                          <div className="play-button">
                            <svg viewBox="0 0 64 64">
                              <path
                                data-name="layer1"
                                stroke="#000000"
                                fill="#000000"
                                stroke-miterlimit="10"
                                stroke-width="2"
                                d="M6 2l52 30L6 62V2z"
                                stroke-linejoin="round"
                                stroke-linecap="round">
                              </path>
                          </svg>
                        </div>
                      </div>;

    const iframePlayer = <iframe
      frameBorder="0"
      allowfullscreen="true"
      width="100%"
      height="100%"
      loading="lazy"
      src={isOpen ? '/source.html?src=' + link : ""}
      onLoad={this.openIframe}
     // {...gg}
      />;

    return (
      <>
      <div onClick={handleAction} class="modal__back"><LeftButtonIcon /></div>
        <img style={{ display: 'none' }} loading="eager" src={`https://image.tmdb.org/t/p/original/${url}`} />
          <div style={{display: this.state.display ? "" : "none"}}>
            <div class="bg-video" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${url})`}}>
              {this.state.iframeLoaded ? PlayButton : Loading}
              <div class="x">Pop-up advertising will appear. Please be patient! Thank you.</div>
            </div>
          </div>
        {iframePlayer}
      </>
    );
  }
}
export default Downloads;
