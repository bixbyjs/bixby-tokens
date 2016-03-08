exports = module.exports = function(keying) {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.decode({ issuer: 'x-me' }, keying);
}


exports['@require'] = [ '../_internals/keying' ];

exports['@implements'] = 'http://i.bixbyjs.org/tokens/decodeFunc';
exports['@type'] = [ 'application/fe26.2' ];
