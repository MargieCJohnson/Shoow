import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";

/**
 * Dynamic header that changes depending on which route you are on
 */
class DynamicHeader extends Component {
  state = {
    normal: false, // only affects the dark header
  };

  handleScroll = () => {
    if (window.scrollY > 300 && !this.state.normal) {
      this.setState({ normal: true });
    } else if (window.scrollY < 300 && this.state.normal) {
      this.setState({ normal: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  render() {
    const headerComp = <Header {...this.props} />;
    const exclude = window.location.pathname;
    
    // Dark header which transitions to normal after scrolling 300px
    const darkHeader = (
      <div
        className={this.state.normal ? "header-wrapper active" : "header-wrapper dark"}
      >
        {headerComp}
      </div>
    );

    // default header
    const defaultHeader = (
      <div className={this.state.normal ? "header-wrapper active" : "header-wrapper default"}>{headerComp}</div>
    );

    return (
      <Switch>
        <Route exact path="/:path(movie|tv)/:id" render={() => darkHeader} />
        <Route render={() => defaultHeader} />
      </Switch>
    );
  }
}

export default DynamicHeader;
