exports = module.exports = function(keyring) {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.unseal({ issuer: 'x-me' }, keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = [ 'application/fe26.2' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
