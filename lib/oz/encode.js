exports = module.exports = function() {
  // Load modules.
  var oz = require('tokens-oz');
  
  return oz.encode({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/encodeFunc';
exports['@type'] = [ 'application/oz-ticket' ];
