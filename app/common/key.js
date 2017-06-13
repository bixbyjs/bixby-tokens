exports = module.exports = function(credentials, keyring) {
  
  return function get(options, cb) {
    console.log('### COMMON KEYING');
    console.log(options);
    
    
    var opts = {};
    // TODO: Don't overload id and URL
    
    if (options.usage == 'sign') {
      opts.url = options.recipient.id;
    } else if (options.usage == 'verify') {
      opts.url = options.sender ? options.sender.id : 'http://localhost/';
    }
    
    credentials.get(opts, function(err, cred) {
      console.log('GOT CRED!');
      console.log(err);
      console.log(cred);
      
      if (err) { return cb(err); }
      if (typeof cred == 'string') {
        cred = { secret: cred, algorithm: 'hmac-sha256' }
      }
      return cb(null, [ cred ]);
    });
    
    
    
    //if (key)
    
    //return;
    
    //keyring.find(options, cb);
  };
};

// TODO: Break this down into
// 1. KMS for local private key pairs
// 2. Credential Store for shared secrets and other per-entity creds
// 3. pki/KeyServer for federated access to public keys


exports['@require'] = [
  'http://i.bixbyjs.org/security/CredentialManager',
  'http://i.bixbyjs.org/crypto/Keyring'
];
