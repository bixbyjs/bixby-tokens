exports = module.exports = function(keyring) {
  // Load modules.
  var keyczar = require('tokens-keyczar');
  
  return keyczar.seal(keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/sealFunc';
exports['@type'] = [ 'application/keyczar' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
