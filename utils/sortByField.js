/**
 * Compare function for array.prototype.sort for an array of objects
 * @param {String} field field to sort by
 * @param {Number} ascending 1 for ascending or -1 for descending
 */
const sortByField = (field, ascending) => (a, b) => {
  if (a[field] < b[field]) return -1 * ascending;
  if (a[field] > b[field]) return 1 * ascending;
  return 0;
};

module.exports = sortByField;
