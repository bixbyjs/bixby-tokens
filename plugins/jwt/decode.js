exports = module.exports = function(keying) {
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
  
  return tokens.decode.sat(keying);
};

//exports['@require'] = [ '../_internals/keying' ];

exports['@implements'] = [
  'http://i.bixbyjs.org/tokens/unseal',
  'http://i.bixbyjs.org/tokens/types/jwt/unseal'
];
exports['@type'] = 'application/jwt';
