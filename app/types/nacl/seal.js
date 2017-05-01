exports = module.exports = function(keyring) {
  // Load modules.
  var nacl = require('tweetnacl');
  nacl.util = require('tweetnacl-util');
  
  // google: nacl as jwt alternative
  // https://itjumpstart.wordpress.com/2015/04/24/jwt-and-nacl-tokens/
  // https://github.com/ibmendoza/salt
  
  // google: nacl security token:
  // https://github.com/atpay/atpay_ruby/wiki/Token-Protocol
  
  
  // TODO: consolidate the issuer value somewhere.
  return function(claims, options, cb) {
    console.log('SEAL SOMETHING NACL');
    console.log(claims);
    console.log(options);
    
    try {
    var message = nacl.util.decodeBase64('1Q==');
    var nonce = nacl.util.decodeBase64('qem0uDdL2JT2ObMjonw0UUqOfWTMg7le');
    var key = nacl.util.decodeBase64('hHMQ5Z8jKNzdADMt+jxhYF5437On2tZcokdNX4h5nxI=')
    
    console.log('MESSAGE: ' + message);
    console.log('NONCE: ' + nonce);
    console.log('KEY: ' + key);
    
    
    var boxed = nacl.secretbox(message, nonce, key);
    console.log('BOXED!');
    console.log(boxed);
    } catch(ex) {
      console.log('EXCEPTION!');
      console.log(ex);
    }
  };
};

exports['@implements'] = [
  'http://i.bixbyjs.org/tokens/sealFunc'
];
exports['@type'] = 'application/nacl';
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
