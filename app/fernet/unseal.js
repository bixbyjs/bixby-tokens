exports = module.exports = function(keying) {
  // Load modules.
  var fernet = require('tokens-fernet');
  
  return fernet.unseal({ issuer: 'x-me' }, keying);
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = [ 'application/x-fernet-json' ];
exports['@require'] = [ '../common/key' ];
