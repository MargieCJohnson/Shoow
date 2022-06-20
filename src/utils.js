/* eslint-disable func-names, prefer-rest-params */
/**
 * This creates a debounced version of a function.
 *
 * Example usage:
 * Create the debounced version of search(query):
 *
 * const debouncedSearch = createDebouncedFunc((query) => {
 *   search(query);
 * }, 1000);
 *
 * Then to use it:
 *
 * functionThatGetsCalledOften(query) {
 *   debouncedSearch(query);
 * }
 *
 * @param {Function} fn  Function to debounce
 * @param {Number} time  How long to debounce
 * @returns {Function}
 */
export function createDebouncedFunc(fn, time = 500) {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}
/* eslint-enable func-names, prefer-rest-params */

/**
 * Converts minutes (e.g. 134) to hours and minutes (2h 14min)
 * @param {Number} minutes
 */
export function minutesToHours(minutes) {
  if (!minutes) return null;
  if (minutes <= 60) return `${minutes}min`;

  const hours = Math.floor(minutes / 60);
  const minsLeft = minutes % 60;

  if (minsLeft === 0) return `${hours}h`;

  return `${hours}h ${minsLeft}min`;
}

/**
 * Function that converts "a_string_like_this" to "A string like this".
 */
export const parseSnakeCase = name =>
  (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, " ");

/**
 * Takes in an element and smooth scrolls horizontally it to scrollTarget.
 * Taken from: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
 *
 * Usage:
 * smoothScroll(element, 400, 300); <-- scroll to 400px from the left
 *
 * smoothScroll(element, element.scrollLeft + 300, 300); <-- scroll 300px from current position
 *
 * @param {Element} element
 * @param {Number} scrollTarget
 * @param {Number} animDuration
 */
export function smoothScrollTo(element, scrollTarget, animDuration) {
  /* eslint-disable no-param-reassign */
  /* need to disable this rule so we can reassign element.scrollLeft */
  const target = Math.round(scrollTarget);
  const duration = Math.round(animDuration);

  if (duration < 0) {
    return Promise.reject(new Error("bad duration"));
  }
  if (duration === 0) {
    element.scrollLeft = target;
    return Promise.resolve();
  }

  const startTime = Date.now();
  const endTime = startTime + duration;

  const startTop = element.scrollLeft;
  const distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = (start, end, point) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  };

  return new Promise(resolve => {
    // This is to keep track of where the element's scrollLeft is
    // supposed to be, based on what we're doing
    let previousTop = element.scrollLeft;

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (element.scrollLeft !== previousTop) {
        // reject(new Error("interrupted"));
        // ^ can be used if you need to detect if
        // scroll has been interrupted
        return;
      }

      // set the scrollLeft for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + distance * point);
      element.scrollLeft = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        element.scrollLeft === previousTop &&
        element.scrollLeft !== frameTop
      ) {
        resolve();
        return;
      }
      previousTop = element.scrollLeft;

      // schedule next frame for execution
      setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
}
