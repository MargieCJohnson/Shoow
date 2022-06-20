import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Scroll/Scroll.scss";

import LeftButtonIcon from "../../assets/leftbutton.svg";
import RightButtonIcon from "../../assets/rightbutton.svg";

class Trailers extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  state = {
    index: 0,
  };

  scrollRight = () => {
    const { index } = this.state;
    this.setState({
      index: (index + 1) % this.props.trailers.length,
    });
  };

  scrollLeft = () => {
    let { index } = this.state;
    index = index === 0 ? index - 1 + this.props.trailers.length : index - 1;
    this.setState({ index });
  };

  render() {
    if (this.props.trailers.length === 0) {
      return <div>No trailers to show</div>;
    }

    const trailerFrame = (
      <div className="embed-container">
        <iframe
          src={`https://www.youtube.com/embed/${
            this.props.trailers[this.state.index].key
          }`}
          frameBorder="0"
          title={this.state.currentTrailer}
          allowFullScreen
        />
      </div>
    );

    if (this.props.trailers.length === 1) {
      return <div className="outer-div">{trailerFrame}</div>;
    }
    return (
      <div className="outer-div">
        <button className="leftbutton scroll-button">
        <LeftButtonIcon />
        </button>
        {trailerFrame}
        <button className="rightbutton scroll-button">
        <RightButtonIcon />
        </button>
      </div>
    );
  }
}

export default Trailers;
