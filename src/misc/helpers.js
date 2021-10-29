/**
 * @param {*} val
 * @return {boolean}
 */
export const isFunction = function (val) {
  return typeof val === "function";
};

/**
 * Get the values in pixels or anything else otherwise. If value is number,
 * pixels "Xpx" will be returned. If given value is for e.g. "1rem", the "1rem"
 * will be returned as is.
 *
 * @param value
 * @return {string}
 */
export const getPixelsOrString = function (value) {
  return typeof value === "number" ? `${value}px` : value;
};

/**
 * Find next free id in array of objects with id
 *
 * @param value
 * @return {string}
 */
export const findNextId = function (array) {
  const sortedArray = array.slice().sort(function (a, b) {
    return a.id - b.id;
  });
  let previousId = 0;
  for (const element of sortedArray) {
    // eslint-disable-next-line eqeqeq
    if (element.id != previousId + 1) {
      return previousId + 1;
    }
    previousId = element.id;
  }

  return previousId + 1;
};
