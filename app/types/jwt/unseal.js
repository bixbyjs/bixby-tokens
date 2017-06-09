exports = module.exports = function(keyring) {
  // Load modules.
  var tokens = require('tokens');
  
  function keying(iss, aud, header, cb) {
    console.log('SAT DECODE KEYING....');
    console.log(iss);
    console.log(aud);
    console.log(header);
    
    // TODO: Port this to use keyring
    //keyring.find(options, cb);
    
    return cb(null, 'secret-foo-bar-asdfadfasfasdfaeafdasfsf');
  }
  
  return tokens.jwt.unseal(keyring.find.bind(keyring));
};

//exports['@require'] = [ '../_internals/keying' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = 'application/jwt';
