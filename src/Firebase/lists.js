import { db, auth } from "./firebase";
import { normalizeMovie } from "../api/tmdb";

// watching status variables
export const watchStates = {
  watching: "watching",
  planToWatch: "plan_to_watch",
  completed: "completed",
  dropped: "dropped",
};

export const getUserID = () => auth.currentUser.uid;

/**
 * Takes in an array and sorts them by some property.
 *
 * Usage:
 * const sorted = sortBy(movies, "title");
 *
 * @param {Array} array  Array to sort
 * @param {String} orderBy  Which property to sort after
 */
export function sortBy(array, orderBy) {
  function compare(a, b) {
    if (a[orderBy] < b[orderBy]) return -1; // a is before b
    if (a[orderBy] > b[orderBy]) return 1; // b is before a
    return 0; // a and b are equal
  }
  return array.sort(compare);
}

/**
 * Adds a movie to a list.
 * Returns a promise that resolves if succesful.
 *
 * Usage:
 * addToList(movie, watchStatus)
 *  .then(() => {  // <-- note that there is no resolved value in the then
 *    // success
 *  }).catch((error) => {
 *    // failed
 *  })
 *
 * or:
 * try {
 *  await addToList(movie, watchStatus);
 *  // success
 * } catch (error) {
 *  // failed
 * }
 *
 * @param {Object} mov The movie to add
 * @param {String} watchStatus "watching", "plan_to_watch", "completed", "dropped"
 * @returns {Promise}
 */
export function addToList(movie, watchStatus) {
  /* eslint-disable camelcase */
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  if (!watchStatus)
    throw new Error("watchStatus must be defined to add to list");

  // we don't need to save the _entire_ movie object, so we pick out the
  // properties we want in order to save space and speed up read/writes
  const {
    id,
    media_type,
    title,
    poster_path,
    release_date,
    release_year,
    vote_average,
  } = normalizeMovie(movie);
  return db.doc(`users/${user}/list/${id}`).set(
    {
      watch_status: watchStatus,
      added: new Date(),
      episodes_watched: {},
      id,
      media_type,
      title,
      poster_path,
      release_date,
      release_year,
      vote_average,
    },
    { merge: true },
  );
}

export function updateWatchStatus(movie, watchStatus) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  return db.doc(`users/${user}/list/${movie.id}`).update({
    watch_status: watchStatus,
  });
}


export function updateLink(movieID, URL) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  return db.doc(`users/FivnBj7zec6pCneLvVZW/links/${movieID}`).set({
    movie_link: URL,
  });
}


export function removeFromList(movieID) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  return db.doc(`users/${user}/list/${movieID}`).delete();
}


export function getLinks(movieID) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  return db.doc(`users/FivnBj7zec6pCneLvVZW/links/${movieID}`).get().then(doc => doc.data());
}

/**
 * Listens to changes from a list and runs a callback when it changes in the database.
 *
 * Usage:
 *
 * fetchAllFromList(userId, "plan_to_watch", "movie" (snapshot) => {
 *   // this is called the first time fetchAllFromList is called
 *   // and each time the list changes in Firebase
 * })
 */
export async function fetchAllFromList(
  userId,
  watchStatus,
  mediaType,
  updateList,
) {
  let req;
  if (mediaType === "all") {
    req = await db
      .collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus);
  } else {
    req = await db
      .collection(`/users/${userId}/list`)
      .where("watch_status", "==", watchStatus)
      .where("media_type", "==", mediaType);
  }
  return req.onSnapshot(updateList);
}

/**
 * Fetches one specific movie/show from a user's list.
 * Returns a promise that resolves to the movie (if exits) or null.
 */
export function fetchOneFromList(userId, movieId) {
  return db
    .doc(`/users/${userId}/list/${movieId}`)
    .get()
    .then(doc => doc.data());
}

/**
 * Takes a season number and episode number and transforms them
 * into a string that's used in firebase as the key.
 *
 * Usage:
 *
 * episodeString(1, 2) gives SE01E02;
 */
export function episodeString(season, episode) {
  const s = season < 10 ? `0${season}` : season;
  const e = episode < 10 ? `0${episode}` : episode;
  return `SE${s}E${e}`;
}

/**
 * Marks an episode of a show as watched or unwatched.
 *
 * Usage (set episode as watched):
 *
 * setEpisodeStatus(1230, 1, 1, true); // set SE1E1 as watched
 */
export function setEpisodeStatus(
  showId,
  seasonNumber,
  episodeNumber,
  hasWatched,
) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");
  if (!episodeNumber) throw new Error("Invalid episodeNumber");

  return db.doc(`users/${user}/list/${showId}`).set(
    {
      episodes_watched: {
        [episodeString(seasonNumber, episodeNumber)]: hasWatched,
      },
    },
    { merge: true },
  );
}

/**
 * Sets a whole season of a show as watched.
 */
export function setSeasonStatus(
  showId,
  seasonNumber,
  seasonLength,
  hasWatched,
) {
  const user = getUserID();
  if (!user) throw new Error("User is not logged in");

  const episodesWatched = {};
  for (let i = 1; i <= seasonLength; i++) {
    episodesWatched[episodeString(seasonNumber, i)] = hasWatched;
  }
  return db.doc(`users/${user}/list/${showId}`).set(
    {
      episodes_watched: episodesWatched,
    },
    { merge: true },
  );
}

/**
 * Subscribe to changes to a show for a user
 *
 * Usage:
 *
 * onShowSnapshot(userId, showId, (doc) => {
 *   // this is called on first use, and each time
 *   // the episode data changes in firebase
 * })
 */
export function onShowSnapshot(userId, showId, callback) {
  return db.doc(`users/${userId}/list/${showId}`).onSnapshot(callback);
}
