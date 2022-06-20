import React, { Component } from "react";
import "./Settings.scss";
import axios from "axios";
import { SignedIn, SignedOut } from "../UserState/UserState";

class Settings extends Component {

   state = {
    openMovie: false,
    openSeries: false,
    openLanguage: false,
    languagedata: "",
    movie: "",
    series: "",
    languagename: "",
    language: [],
   };

   componentDidMount() {
    let movie_name = localStorage.getItem('server_movie');
    let series_name = localStorage.getItem('server_series');
    this.setState({ languagename: localStorage.getItem('language_eng') });
    if(movie_name == 1) {
      this.setState({ movie: "VidCloud [Multi Quality, ADS, CC]" });
    } else if(movie_name == 2) {
      this.setState({ movie: "Google Drive Player" });
    } else if(movie_name == 4) {
      this.setState({ movie: "VidSrc PRO" });
    }
    if(series_name == 1) {
      this.setState({ series: "VidCloud [Multi Quality, ADS, CC]" });
    }


    axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=d0e6107be30f2a3cb0a34ad2a90ceb6f`)
      .then((response) => {
        this.setState({
          language: response.data,
        })
      }).catch(err => console.log(err));
   }

  openServers = () => {
    this.setState({ openMovie: true });
  };

  closeLanguage = () => {
    this.setState({ openLanguages: false });
    this.setState({ languagename: localStorage.getItem('language') });
  }

  openSeries = () => {
    this.setState({ openSeries: true });
  };

  closeSeries = () => {
    this.setState({ openSeries: false});
  }

  closeServers = () => {
    this.setState({ openMovie: false });
  }


  openLanguages = () => {
    this.setState({ openLanguages: true });
  }

  chooseServer1 = () => {
    this.setState({ movie: "VidCloud [Multi Quality, ADS, CC]" });
    localStorage.setItem('server_movie', 1);
    this.setState({ openMovie: false});
  }

  chooseServer2 = () => {
    this.setState({ movie: "CloudPlayer [1080p, Ads, CC]" });
    localStorage.setItem('server_movie', 2);
     this.setState({ openMovie: false});
  }

  chooseServer3 = () => {
    this.setState({ movie: "JPlayer [1080p, Less Ads, NO CC]" });
    localStorage.setItem('server_movie', 3);
     this.setState({ openMovie: false});
  }

  chooseServer4 = () => {
    this.setState({ movie: "VidSrc PRO" });
    localStorage.setItem('server_movie', 4);
     this.setState({ openMovie: false});
  }

  chooseServerSeries1 = () => {
    this.setState({ series: "VidCloud [Multi Quality, ADS, CC]" });
    localStorage.setItem('server_series', 1);
     this.setState({ openSeries: false});
  }

   chooseServerSeries2 = () => {
    this.setState({ series: "VidSrc PRO" });
    localStorage.setItem('server_series', 2);
    this.setState({ openSeries: false});
  }

  handleClick = (e, data) => {
    localStorage.setItem('language', data);
    this.setState({ openLanguages: false });
}

handleClick1 = (e, data) => {
    localStorage.setItem('language_eng', data);
    this.setState({ openLanguages: false });
    this.setState({ languagename: localStorage.getItem('language_eng') });
}

  render() {
    return (
    <div className="container settings">
    <div class="sc-1o36vqg-7 brWjXb">
      <header class="sc-1o36vqg-4 kYxrQw">
        <div class="sc-1o36vqg-3 iVeijx">
          <div class="sc-1o36vqg-0 hfwCMq">Change the default Movie Source.</div>
        </div>
      </header>
      <hr class="sc-120wsjt-0 sc-1o36vqg-2 keqMWH" />
    <div class="sc-1o36vqg-6 hwytcN">
      <div class="zpicwb-12 erjEHL">
        <div class="zpicwb-10 gmjUwa">
        <div class="zpicwb-11 jBNrZF" onClick={this.openServers}>
          <div class="zpicwb-3 bjxAPK">{ this.state.movie ? this.state.movie : "Select Server"}</div></div>
          <div class="zpicwb-9 cHJOkB"><svg onClick={this.closeServers} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m9d8o3-0 fxbeUc zpicwb-8 eKqRtN" main="#9B9D9F"><path d="M17 9.5l-5 5-5-5" stroke="#9B9D9F" data-stroke="main" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <ul class="sc-12gjfzm-1 hqidmZ zpicwb-0 jBOakZ" style={{display: this.state.openMovie ? "block" : "none"}}>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServer1}>VidCloud [Multi Quality, ADS, CC]</li>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServer2}>CloudPlayer [1080p, Ads, CC]</li>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServer3}>JPlayer [1080p, Less Ads, NO CC]</li>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServer4}>VidSrc PRO</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>




  {/* <div class="sc-1o36vqg-7 brWjXb">
      <header class="sc-1o36vqg-4 kYxrQw">
        <div class="sc-1o36vqg-3 iVeijx">
          <div class="sc-1o36vqg-0 hfwCMq">Change the default language source. (Need to reload to take effect)</div>
        </div>
      </header>
      <hr class="sc-120wsjt-0 sc-1o36vqg-2 keqMWH" />
    <div class="sc-1o36vqg-6 hwytcN">
      <div class="zpicwb-12 erjEHL">
        <div class="zpicwb-10 gmjUwa">
        <div class="zpicwb-11 jBNrZF" onClick={this.openLanguages}>
          <div class="zpicwb-3 bjxAPK">{ this.state.languagename ? this.state.languagename : "Select Language"}</div></div>
          <div class="zpicwb-9 cHJOkB"><svg onClick={this.closeLanguage} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m9d8o3-0 fxbeUc zpicwb-8 eKqRtN" main="#9B9D9F"><path d="M17 9.5l-5 5-5-5" stroke="#9B9D9F" data-stroke="main" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <ul class="sc-12gjfzm-1 hqidmZ zpicwb-0 jBOakZ" style={{display: this.state.openLanguages ? "block" : "none"}}>
              {this.state.language && this.state.language.map((movie, i) => (<li class="sc-12gjfzm-0 PMXqu" onClick={(e) => { this.handleClick(e, movie.iso_639_1); this.handleClick1(e, movie.english_name);}}>{movie.english_name}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div> */}




    <div class="sc-1o36vqg-7 brWjXb">
      <header class="sc-1o36vqg-4 kYxrQw">
        <div class="sc-1o36vqg-3 iVeijx">
          <div class="sc-1o36vqg-0 hfwCMq">Change the default TV-shows Source.</div>
        </div>
      </header>
      <hr class="sc-120wsjt-0 sc-1o36vqg-2 keqMWH" />
    <div class="sc-1o36vqg-6 hwytcN">
      <div class="zpicwb-12 erjEHL">
        <div class="zpicwb-10 gmjUwa">
        <div class="zpicwb-11 jBNrZF"  onClick={this.openSeries}>
          <div class="zpicwb-3 bjxAPK">{ this.state.series ? this.state.series : "Select Server"}</div></div>
          <div class="zpicwb-9 cHJOkB"><svg onClick={this.closeSeries} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m9d8o3-0 fxbeUc zpicwb-8 eKqRtN" main="#9B9D9F"><path d="M17 9.5l-5 5-5-5" stroke="#9B9D9F" data-stroke="main" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <ul class="sc-12gjfzm-1 hqidmZ zpicwb-0 jBOakZ" style={{display: this.state.openSeries ? "block" : "none"}}>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServerSeries1}>VidCloud [Multi Quality, ADS, CC]</li>
              <li class="sc-12gjfzm-0 PMXqu" onClick={this.chooseServerSeries2}>VidSrc PRO</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    );
  }
}

export default Settings;
