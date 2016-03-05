exports = module.exports = function() {
  // Load modules.
  var oz = require('tokens-oz');
  
  return oz.decode({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
}

exports['@implements'] = 'http://i.bixbyjs.org/tokens/decodeFunc';
exports['@type'] = [ 'application/fe26.2' ];
