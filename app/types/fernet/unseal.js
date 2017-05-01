exports = module.exports = function(keyring) {
  // Load modules.
  var fernet = require('tokens-fernet');
  
  return fernet.unseal({ issuer: 'x-me' }, keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = [ 'application/x-fernet-json' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
