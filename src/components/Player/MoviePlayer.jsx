import React, { Component } from 'react';
import videojs from 'video.js';
import './MoviePlayer.scss';
import LeftButtonIcon from "../../assets/leftbutton.svg"

// import vjs plugins
import 'videojs-landscape-fullscreen';

class Player extends Component {
    constructor(props) {
        super(props);
    }

  handleAction = () => {
    this.props.handleChange();
  };

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {

      
      this.on('loadedmetadata', function()  {
        if(this.duration() > 31) {
          const lastTime = localStorage.getItem(this.id_);

          if (lastTime) {
            this.currentTime(lastTime);
          }
        } else {
          this.src("https://store1.gofile.io/download/446c2765-f650-4dd3-8222-ac315f56d597/8.mp4");
        }
      });

      this.on('timeupdate', function()  {
         localStorage.setItem(this.id_, this.currentTime());
      });
    })

    this.player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        exitOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true
      }
    })
  }

componentDidUnmout () {
    this.player.dispose();
    this.videoPlayer = undefined;
    if(this.player){
      this.player.dispose();
    }
  }

  render() {
     const { handleAction } = this;
    return (
    <>
    <div onClick={handleAction} className="modal__back"><LeftButtonIcon /></div>
    <div data-vjs-player>
    <video onContextMenu={event => event.preventDefault()} ref={node => (this.videoNode = node)} className="video-js" />
    </div>
    </>
    )
  }
}

export default Player;
