exports = module.exports = function() {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.decode({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
}

exports['@implements'] = 'http://i.bixbyjs.org/tokens/decodeFunc';
exports['@type'] = [ 'application/fe26.2' ];
