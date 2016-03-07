exports = module.exports = {
  foo: 'bar'
}

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
