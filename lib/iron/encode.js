exports = module.exports = function(keying) {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.encode({ issuer: 'me-x', key: keying, algorithm: 'HS256' });
};


exports['@require'] = [ '../_internals/keying' ];

exports['@implements'] = 'http://i.bixbyjs.org/tokens/encodeFunc';
exports['@type'] = [ 'application/fe26.2' ];
