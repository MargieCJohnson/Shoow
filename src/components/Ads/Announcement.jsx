import React, { Component } from "react";
import './Announcement.scss';
import { Link } from "react-router-dom";

class Announcement extends Component {

  state = {
    title: '',
    url: '',
    id: '',
    type: '',
    widgetState: true,
    closeTab: false,
    isReady: false,
  };

  componentDidMount() {
    this.setState({ title: localStorage.getItem('title')});
    this.setState({ url: localStorage.getItem('img')});
    this.setState({ id: localStorage.getItem('id')});
    this.setState({ type: localStorage.getItem('type')});
    this.prev = window.scrollY;
    window.addEventListener('scroll', e => this.handleNavigation(e));
  }

  closeWidget = () => {
    this.setState({ closeTab: true});
  }

  handleNavigation = (e) => {
    const window = e.currentTarget;

    if (this.prev > window.scrollY) {
      this.setState({ widgetState: false});
    } else if (this.prev < window.scrollY) {
        if(this.prev > 750) {
          this.setState({ widgetState: true});
        }
    }

    this.prev = window.scrollY;
};

render() {
  const widget = 

  <div style={{display: `${this.state.closeTab ? "none" : "block" }` }}>
  <div style={{display: `${this.state.widgetState ? "flex" : "none" }` }} className="featured-app w-inline-block">
  <img onLoad={() => this.setState({ isReady: true })}  src={this.state.isReady ? `https://image.tmdb.org/t/p/original/${this.state.url}` : "https://i.ibb.co/Q9Y7ck1/placeholder.png"} className="app__icon" />
  <Link to={`/${this.state.type}/${this.state.id}`}>
  <div className="div-block-57">
    <div className="app__title">{this.state.title}</div>
    <div className="app__tagline">Continue To Watch</div>
    </div>
    </Link>
  <div className="product-button medium-size" onClick={this.closeWidget}>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></div>
    </div></div>;
    

    return (
      <>
      {this.state.url && widget }
		</>
    );
  }
}

export default Announcement;

