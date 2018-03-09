exports = module.exports = function(credentials, keyring) {
  
  // TODO: Add a way to check if audience is logically self, and then fetch
  //       keys from KMS (ie Google) for HSM purposes.
  
  return function get(options, cb) {
    //console.log('### COMMON KEYING');
    //console.log(options);
    
    
    var opts = {};
    // TODO: Don't overload id and URL
    
    if (options.usage == 'sign' || options.usage == 'encrypt') {
      // TODO: if no recipient, default to self
      opts.url = options.recipient.id;
    } else if (options.usage == 'verify' || options.usage == 'decrypt') {
      opts.url = options.sender ? options.sender.id : 'http://localhost/';
    }
    
    credentials.get(opts, function(err, cred) {
      //console.log('GOT CRED!');
      //console.log(err);
      //console.log(cred);
      
      if (err) { return cb(err); }
      if (typeof cred == 'string') {
        cred = { secret: cred }
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
