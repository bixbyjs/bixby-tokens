exports = module.exports = function(keyring) {
  // Load modules.
  var tokens = require('tokens');
  
  function keying(options, cb) {
    console.log('SAT KEYING....');
    console.log(options);
    
    keyring.find(options, cb);
  }
  
  // TODO: consolidate the issuer value somewhere.
  return tokens.jwt.seal({ issuer: 'http://localhost' }, keyring.find.bind(keyring));
};

exports['@implements'] = [
  'http://i.bixbyjs.org/tokens/sealFunc',
  'http://i.bixbyjs.org/tokens/types/jwt/seal'
];
exports['@type'] = 'application/jwt';
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
