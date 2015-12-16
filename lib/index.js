/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'encoder': './encoder'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
