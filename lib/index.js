/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'decoder': './decoder',
    'encoder': './encoder',
    'types/jwt/decode': './types/jwt/decode',
    'types/jwt/encode': './types/jwt/encode',
    'oz/decode': './oz/decode',
    'oz/encode': './oz/encode',
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
  
  // Plug-ins for encoding tokens.
  container.register('types/jwt/decode');
  container.register('types/jwt/encode');
  container.register('oz/decode');
  container.register('oz/encode');
};
