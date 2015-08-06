/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'tokens/encoder': './tokens/encoder'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
