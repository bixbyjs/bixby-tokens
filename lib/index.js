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
    'iron/caps': './iron/caps',
    'iron/decode': './iron/decode',
    'iron/encode': './iron/encode',
    'saml2/encode': './saml2/encode',
    '_internals/keying': './_internals/keying',
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
  container.register('iron/caps');  // FIXME: This fails silently if iron/caps isnt in the map above
  container.register('iron/decode');
  container.register('iron/encode');
};
