import React, { Component } from "react";
import axios from "axios";
import "./Downloads.scss";
import Seo from "../Seo";

function useQuery() {
  return new URLSearchParams(window.location.search);
}
class Downloads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populardownload: [],
      loading: true,
    };
  }
  componentDidMount() {
    let GetID = useQuery().get("imdb");
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${GetID}&with_images=true&with_cast=true`
      )
      .then((response) =>
        this.setState({
          populardownload: response.data.data.movies,
          loading: false,
        })
      );
  }
  render() {
    const { populardownload, loading } = this.state;
    const year = useQuery().get("year");
    const title = useQuery().get("title");
    const id = useQuery().get("imdb");
    const nameCapitalized = title.charAt(0).toUpperCase() + title.slice(1);
    return (
      <>
        <div className="container downloads">
        <Seo 
          title={`Download Torrent ${nameCapitalized} (${year}) | Watchable`}
          descriptions={`Download torrent ${nameCapitalized} ${year} for free!`}
          keywords={`${nameCapitalized} torrent yts, download ${nameCapitalized} movie torrent, torrent ${nameCapitalized} ${year}`}
          pathSlug={`downloads/?imdb=${id}&title=${title}&year=${year}`}
          />
          <div className="job-explain">
            <div className="job-explain-content">
              <div className="job-subtitle-wrapper" style={{ display: populardownload ? "" : "none"}}>
                <div className="company-name">
                  Torrent{" "}
                  <span className="comp-location">
                    Fast servers, ad free.
                  </span>
                </div>
                <div className="posted">
                  <a href="https://ko-fi.com/reemphasized" target="_blank">
                    {" "}
                    Buy me a coffee!
                  </a>
                  <span className="app-number">Need help?</span>
                </div>
              </div>
              {populardownload &&
                populardownload.map((movie, i) => (
                  <div className="explain-bar" style={{ display: populardownload ? "" : "none"}}>
                    {movie.torrents &&
                      movie.torrents.map((torrents, index) => (
                        <div className="explain-contents">
                          <div className="explain-title">
                            {torrents.quality} / {torrents.type}
                          </div>
                          <div className="explain-subtitle">
                            <a href={torrents.url} target="_blank">
                              <svg viewBox="0 0 64 64">
                                <path
                                  data-name="layer2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-miterlimit="10"
                                  stroke-width="2"
                                  d="M10 2v60h44V18L38 2H10z"
                                  stroke-linejoin="round"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  data-name="layer2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-miterlimit="10"
                                  stroke-width="2"
                                  d="M38 2v16h16"
                                  stroke-linejoin="round"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  data-name="layer1"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-miterlimit="10"
                                  stroke-width="2"
                                  d="M32 48V26m-7.6 9l7.6-9 7.6 9"
                                  stroke-linejoin="round"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
            <div className="job-subtitle-wrapper">
              <div className="company-name">
                Direct link{" "}
                <span className="comp-location">
                  Fast servers
                </span>
              </div>
              <div className="posted">
                <a href="https://ko-fi.com/reemphasized" target="_blank">
                  {" "}
                  Buy me a coffee!
                </a>
                <span className="app-number">Need help?</span>
              </div>
            </div>
            <div className="explain-bar">
              <div className="explain-contents">
                <div className="explain-title">Download V1</div>
                <div className="explain-subtitle">
                <a
                    data-fancybox
                    data-type="iframe"
                    data-options='{"caption" : "You can use (MXplayer, VLC) or just direct download."}'
                    data-src={`/player/movie/?server=6&id=${id}`}
                    href="javascript:;"
                  >
                    Uptobox
                  </a>
                </div>
              </div>

              <div className="explain-contents">
                <div className="explain-title">Download V2</div>
                <div className="explain-subtitle">
                <a
                    data-fancybox
                    data-type="iframe"
                    data-options='{"caption" : "You can use (MXplayer, VLC) or just direct download."}'
                    data-src={`/player/movie/?server=4&id=${title}`}
                    href="javascript:;"
                  >
                    RinzyStream
                  </a>
                </div>
              </div>

              <div className="explain-contents">
                <div className="explain-title">Download V3</div>
                <div className="explain-subtitle">
                  <a
                    data-fancybox
                    data-type="iframe"
                    data-options='{"caption" : "Copy the link and paste it in your browser"}'
                    data-src={`/player/movie/?server=5&id=${title}`}
                    href="javascript:;"
                  >
                    Google Drive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Downloads;
