/**
 * Expose component suite.
 */
exports = module.exports = function oauth(id) {
  var map = {
    'decoder': './decoder',
    'encoder': './encoder',
    'negotiator': './negotiator',
    'jwt/caps': './jwt/caps',
    'jwt/decode': './jwt/decode',
    'jwt/encode': './jwt/encode',
    'iron/decode': './iron/decode',
    'iron/encode': './iron/encode',
    'saml2/encode': './saml2/encode'
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
  container.register('negotiator');
  
  // Plug-ins for encoding tokens.
  container.register('jwt/caps');
  container.register('jwt/decode');
  container.register('jwt/encode');
  container.register('iron/caps');
  container.register('iron/decode');
  container.register('iron/encode');
};
