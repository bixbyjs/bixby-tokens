exports = module.exports = function(keyring) {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.seal(keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/sealFunc';
exports['@type'] = [ 'application/iron' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
