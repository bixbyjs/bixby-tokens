exports = module.exports = function(keyring) {
  // Load modules.
  var keyczar = require('tokens-keyczar');
  
  return keyczar.unseal({ issuer: 'x-me' }, keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = [ 'application/keyczar' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
