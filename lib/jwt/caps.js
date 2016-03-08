var jws = require('jws');

var NORMAL_SIGNING_ALG = {
  'HS256': 'hmac-sha256',  // symmetric
  'HS384': 'hmac-sha384',
  'HS512': 'hmac-sha512',
  'RS256': 'rsa-sha256',   // asymmetric
  'RS384': 'rsa-sha384',
  'RS512': 'rsa-sha512',
  'ES256': 'ecdsa-sha256', // asymmetric
  'ES384': 'ecdsa-sha384',
  'ES512': 'ecdsa-sha512'
}


var caps = {};
caps.signingAlgorithms = jws.ALGORITHMS.map(function(alg) { return NORMAL_SIGNING_ALG[alg] })
                                       .filter(function(v) { return v !== undefined });


exports = module.exports = caps;

exports['@literal'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/tokens/capabilitiesDesc';
exports['@type'] = [
  // JSON Web Token (JWT)
  // http://tools.ietf.org/html/rfc7519#section-9
  // http://tools.ietf.org/html/rfc7519#section-10.2
  'urn:ietf:params:oauth:token-type:jwt',
  // http://tools.ietf.org/html/rfc7519#section-10.3
  'application/jwt'
];
