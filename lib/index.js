/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'encoder': './encoder',
    'types/jwt/encode': './types/jwt/encode'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Register specs so objects can be auto-wired by interface.
  container.register('encoder');
};
