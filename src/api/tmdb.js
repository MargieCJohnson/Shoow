/**
 * This file contains helper functions to use TheMovieDB API
 */

const API_KEY = process.env.TMDB_API_KEY;
const baseImgUrl = "https://image.tmdb.org/t/p/";
const baseUrl = "https://api.themoviedb.org/3";

const API_ERROR_CODE = 7;
const RESOURCE_NOT_FOUND = 34;

const language =  localStorage.getItem('language') ? '&with_original_language='+ localStorage.getItem('language') : "";

/**
 * Takes the poster_path or backdrop_path value from the API and an optional
 * size parameter and returns the full image URL.
 * See https://api.themoviedb.org/3/configuration?api_key=YOURKEY for
 * examples of image sizes
 */

export const getFullImgPath = (imgPath, size = "original") =>
  `${baseImgUrl}${size}${imgPath}`;

/**
 * Takes a full date in the format YYYY-MM-DD and returns the year
 */
export const getYearFromDate = fullDate => fullDate.substring(0, 4);

/**
 * Properties are not the same on movies and TV shows, for
 * example, movies have "title" while TV has "name".
 * This function returns a copy of the movie with consistent properties.
 * Basically, this function ensures that the movie object always
 * has these fields: title, media_type, release_date, release_year
 *
 * @param {Object} movie
 */
export function normalizeMovie(movie) {
  /* eslint-disable camelcase */
  if (movie.isNormalized) return movie;

  const {
    title,
    name,
    release_date,
    first_air_date,
    media_type,
    poster_path,
    profile_path,
  } = movie;

  let determinedMediaType;
  if (media_type) {
    // if the media_type property already exists, no need to
    // manually determine the media type
    determinedMediaType = media_type;
  } else {
    // only movies have the "title" property
    // tv and persons have "name" instead
    determinedMediaType = title ? "movie" : "tv";
  }

  const releaseDate = release_date || first_air_date;

  return {
    ...movie,
    title: title || name,
    media_type: determinedMediaType,
    poster_path: poster_path || profile_path,
    release_date: releaseDate,
    release_year: releaseDate ? getYearFromDate(releaseDate) : "",
    isNormalized: true,
  };
}

/**
 * Takes a response from a fetch, verifies it, and returns the JSON
 * @param {Promise} res
 */
async function checkResponse(res) {
  const json = await res.json();
  if (json.status_code === API_ERROR_CODE) throw new Error("Invalid API key");
  if (json.status_code === RESOURCE_NOT_FOUND)
    throw new Error("Couldn't find anything =(");

  return json;
}

export function getNowPlayingMovies() {
  const nowPlayingMovieUrl = `${baseUrl}/movie/now_playing?api_key=${API_KEY}&language=SE&page=1${language}`;
  return fetch(nowPlayingMovieUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowScifiMovies() {
  const nowScifiUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=878${language}`;
  return fetch(nowScifiUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowHorrorMovies() {
  const nowHorrorMovieUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=27${language}`;
  return fetch(nowHorrorMovieUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowKidsMovies() {
  const nowKidsMoviesUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=16${language}`;
  return fetch(nowKidsMoviesUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowThrillerMovies() {
  const nowThrillerMovieUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&vote_average.gte=8&with_genres=53${language}`;
  return fetch(nowThrillerMovieUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getNowAiringTVShows() {
  const nowAiringTVShowsUrl = `${baseUrl}/tv/on_the_air?api_key=${API_KEY}&language=pt-US&page=1${language}`;
  return fetch(nowAiringTVShowsUrl)
    .then(checkResponse)
    .then(json => json.results);
}

// homepage documentaries shows!
export function getNowDocumentaryShows() {
  const nowDocumentaryShowsUrl = `${baseUrl}/discover/tv?api_key=${API_KEY}&with_genres=99${language}`;
  return fetch(nowDocumentaryShowsUrl)
    .then(checkResponse)
    .then(json => json.results);
}

export function getMovieInfo(id) {
  const currentMovieUrl = `${baseUrl}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,recommendations${language}`;
  return fetch(currentMovieUrl).then(checkResponse);
}

export async function getTVInfo(id) {
  const url = `${baseUrl}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits,external_ids,recommendations${language}`;
  const res = await fetch(url);
  return checkResponse(res);
}

export function getMovieGenres() {
  const genreUrl = `${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return fetch(genreUrl)
    .then(checkResponse)
    .then(json => json.genres);
}

export function getShowGenres() {
  const genreUrl = `${baseUrl}/genre/tv/list?api_key=${API_KEY}&language=en-US`;
  return fetch(genreUrl)
    .then(checkResponse)
    .then(json => json.genres);
}

export function getGenreMovies(genre, page = 1) {
  const genreMovieUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}${language}`;
  return fetch(genreMovieUrl).then(checkResponse);
}

export function getGenreShows(genre, page = 1) {
  const genreMovieUrl = `${baseUrl}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}${language}`;
  return fetch(genreMovieUrl).then(checkResponse);
}

export function getMoviesFromType(type, page = 1) {
  const moviesUrl = `${baseUrl}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}${language}`;
  return fetch(moviesUrl).then(checkResponse);
}

export function getShowsFromType(type, page = 1) {
  const moviesUrl = `${baseUrl}/tv/${type}?api_key=${API_KEY}&language=en-US&page=${page}${language}`;
  return fetch(moviesUrl).then(checkResponse);
}

export function getMoviesFromYear(year, page = 1) {
  const moviesUrl = `${baseUrl}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&primary_release_year=${year}${language}`;
  return fetch(moviesUrl).then(checkResponse);
}

export function getShowsFromYear(year, page = 1) {
  const moviesUrl = `${baseUrl}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&first_air_date_year=${year}${language}`;
  return fetch(moviesUrl).then(checkResponse);
}

export function getSeasonFromId(id, season) {
  const episodesUrl = `${baseUrl}/tv/${id}/season/${season}?api_key=${API_KEY}${language}`;
  return fetch(episodesUrl)
    .then(checkResponse)
    .then(json => json.episodes);
}

export async function multiSearch(query, page = 1) {
  const multiSearchUrl = `${baseUrl}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}${language}`;
  const res = await fetch(multiSearchUrl);
  return checkResponse(res);
}

export function getPersonDetails(id) {
  const personURL = `${baseUrl}/person/${id}?api_key=${API_KEY}&append_to_response=combined_credits,images,external_ids`;
  return fetch(personURL).then(checkResponse);
}
