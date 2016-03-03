exports = module.exports = function() {
  // Load modules.
  var tokens = require('tokens');
  
  
  return tokens.encode.sat({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
}

exports['@implements'] = 'http://i.bixbyjs.org/tokens/encodeFunc';
exports['@type'] = [
  // JWT
  // http://tools.ietf.org/html/rfc7519#section-9
  'urn:ietf:params:oauth:token-type:jwt'
];
