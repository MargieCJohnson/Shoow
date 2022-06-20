import React from "react";
import PropTypes from "prop-types";
import LoadingGrid from "../Loading/LoadingGrid";
import PosterGrid from "../PosterGrid/PosterGrid";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "../UserState/UserState";
import Seo from "../Seo";
import "./Homepage.scss";
import Announcement from "../Ads/Announcement";

function Homepage({ 
  documentary, 
  movies, 
  thriller, 
  kids, 
  series, 
  scifi, 
  horror, 
  loadingMovies, 
  loadingScifi, 
  loadingKids, 
  loadingThriller, 
  loadingHorror, 
  loadingShows, 
  loadingDocumentaries
}) {
  
  return (
  <>
  <Seo 
      title="Home" 
      keywords="Free movies 2021, Google Drive Movies, Stream movies download, download movie collection, watch free movies in hd quality" 
      descriptions="Discover a lot of latest/old movies & series collection and stream and download in HD Quality for free!"
    />
    <div id="homepage" className="container">
    <Announcement />
      <div className="home">Home</div>
      <section>
        <div className="main-blogs">
          <SignedIn>
          {() => (
          <>
          <div className="main-blog anim" style={{ "--delay": ".1s" }}>
            <div className="main-blog__title">
             You are now <br />Shoow+ User.
            </div>
            <div className="main-blog__author">
              <div className="author-detail">
                <div className="author-name">Enjoy the extra features.</div>
                <div className="author-info">
                  No Advert<span className="seperate"></span>Own Library<span className="seperate"></span>1080p, CC!</div>
              </div>
            </div>
            <div className="main-blog__time">
            	<Link className="buttongg" to="/movies/year/2021">New Movies!</Link>
            </div>
          </div>
          <div className="main-blog anim" style={{ "--delay": ".2s" }}>
            <div className="main-blog__title">
              If you like us share our site to your friends.
            </div>
            <div className="main-blog__author">
              <div className="author-detail">
                <div className="author-name">Join to our official groups</div>
                <div className="author-info">
                  Invite Code <span className="seperate"></span> Freebies<span className="seperate"></span> Rewards
                </div>
              </div>
            </div>
            <div className="main-blog__time">
              <Link className="buttongg" to="/discord">
                Let me In!
              </Link>
            </div>
          </div>
          </>
          )}
          </SignedIn>
          <SignedOut>
          <div className="main-blog anim" style={{ "--delay": ".2s" }}>
            <div className="main-blog__title">
                Discover the movies lighting up the charts in theaters, on streaming.
            </div>
            <div className="main-blog__author">
              <div className="author-detail">
                <div class="main-blog__author">
                  <div class="author-img__wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><path d="M20 6L9 17l-5-5"></path></svg>
                  <img class="author-img" src="https://i.ibb.co/SN2295g/2.png" />
                </div>
                <div class="auth-detail">
                  <div class="author-name">Yes, It's all free</div>
                  <div class="author-info">HD Quality<span class="seperate"></span>CC<span class="seperate"></span>Watchlist</div>
                </div>
              </div>
              </div>
            </div>
            <div className="main-blog__time">
              <Link className="buttongg" to="/movies/year/2021">
                New Movies!
              </Link>
            </div>
          </div>
          <div className="main-blog anim" style={{ "--delay": ".1s" }}>
            <div className="main-blog__title">
              If you like us share our site to your friends.
            </div>
            <div className="main-blog__author">
              <div className="author-detail">
                <div className="author-name">Join to our official groups</div>
                <div className="author-info">
                  Invite Code <span className="seperate"></span> Freebies<span className="seperate"></span> Rewards
                </div>
              </div>
            </div>
            <div className="main-blog__time">
              <Link className="buttongg" to="/discord">
                Let me In!
              </Link>
            </div>
          </div>
          </SignedOut>
        </div>
      <h2>Now playing movies</h2>
        {loadingMovies && <LoadingGrid grid="true" />}
        {!loadingMovies && <PosterGrid movies={movies} view="grid" type="movie" /> }
      </section>
      <section>
      <h2>Top Thriller</h2>
        {loadingThriller && <LoadingGrid grid="true" />}
        {!loadingThriller && <PosterGrid movies={thriller} view="grid" type="movie" /> }
        </section>
        <section>
      <h2>Top Sci-Fi</h2>
        {loadingScifi && <LoadingGrid grid="true" />}
        {!loadingScifi && <PosterGrid movies={scifi} view="grid" type="movie" /> }
        </section>
        <section>
      <h2>Top Kids</h2>
        {loadingKids && <LoadingGrid grid="true" />}
        {!loadingKids && <PosterGrid movies={kids} view="grid" type="movie" /> }
        </section>
      <section>
      <h2>Top Horror</h2>
        {loadingHorror && <LoadingGrid grid="true" />}
        {!loadingHorror && <PosterGrid movies={horror} view="grid" type="movie" /> }
      </section>
      <section>
        <div className="main-blogs">
          <div className="main-blog1">
            <div className="main-blog__title">Keep updated what's happening!</div>
            <div className="main-blog__author tips">
              <div className="main-blog__time">
              <a className="buttongg">
                <a href="https://discord.gg/d3YTR8RsA5" target="_blank">Discord</a>
              </a>
              </div>
              <div className="author-detail">
                <div className="author-name">All the info are here</div>
                <div className="author-info">
                  Announcement<span className="seperate"></span>Fix & Issues<span className="seperate"></span>And More
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Now airing TV shows</h2>
        {loadingShows && <LoadingGrid grid="true" />}
        {!loadingShows && <PosterGrid movies={series} view="grid" type="tv" />}
      </section>
      <section>
      <h2>Top Documentaries</h2>
        {loadingDocumentaries && <LoadingGrid grid="true" />}
        {!loadingDocumentaries && <PosterGrid movies={documentary} view="grid" type="tv" /> }
      </section>
      </div>
  </>
  );
}

Homepage.propTypes = {
  movies: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  horror: PropTypes.array.isRequired,
  loadingHorror: PropTypes.bool.isRequired,
  loadingMovies: PropTypes.bool.isRequired,
  loadingShows: PropTypes.bool.isRequired,
};

export default Homepage;
