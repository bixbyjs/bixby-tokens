exports = module.exports = function() {
  // Load modules.
  var tokens = require('tokens');
  
  console.log('CREATE DECODE!');
  
  
  return tokens.decode.sat(
    function keying(issuer, audience, options, cb) {
      console.log('KEYING');
      console.log(issuer);
      console.log(audience);
      console.log(options);
      
      return cb(null, 'secret')
    }
    
    
  );
}

exports['@implements'] = 'http://i.bixbyjs.org/tokens/decodeFunc';
exports['@type'] = [
  // JSON Web Token (JWT)
  // http://tools.ietf.org/html/rfc7519#section-9
  'urn:ietf:params:oauth:token-type:jwt'
];
