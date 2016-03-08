exports = module.exports = function tokens(id) {
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
  // Standared objects, registered for auto-wiring support.
  container.register('decoder');
  container.register('encoder');
  container.register('negotiator');
  
  // JWT plug-in.
  container.register('jwt/caps');
  container.register('jwt/decode');
  container.register('jwt/encode');
  
  // Iron plug-in.
  container.register('iron/caps');  // FIXME: (in electrolyte) This fails silently if iron/caps isnt in the map above
  container.register('iron/decode');
  container.register('iron/encode');
};
