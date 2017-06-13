exports = module.exports = function(key) {
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
  
  return tokens.jwt.unseal(key);
};

//exports['@require'] = [ '../_internals/keying' ];
exports['@require'] = [ '../common/key' ];
exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = 'application/jwt';
