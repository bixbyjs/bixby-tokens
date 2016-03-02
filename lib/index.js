/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'decoder': './decoder',
    'encoder': './encoder',
    'types/jwt/decode': './types/jwt/decode',
    'types/jwt/encode': './types/jwt/encode',
    'types/saml20/encode': './types/saml20/encode'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Register specs so objects can be auto-wired by interface.
  container.register('decoder');
  container.register('encoder');
};
