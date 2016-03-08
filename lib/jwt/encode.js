exports = module.exports = function() {
  // Load modules.
  var tokens = require('tokens');
  
  return tokens.encode.sat({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/encodeFunc';
exports['@type'] = [
  // JSON Web Token (JWT)
  // http://tools.ietf.org/html/rfc7519#section-9
  // http://tools.ietf.org/html/rfc7519#section-10.2
  'urn:ietf:params:oauth:token-type:jwt',
  // http://tools.ietf.org/html/rfc7519#section-10.3
  'application/jwt'
];
