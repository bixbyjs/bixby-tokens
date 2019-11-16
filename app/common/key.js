exports = module.exports = function(keyring) {
  
  // TODO: Add a way to check if audience is logically self, and then fetch
  //       keys from KMS (ie Google) for HSM purposes.
  
  return function get(entity, options, cb) {
    console.log('### COMMON KEYING');
    console.log(options);
    
    var opts = {};
    // TODO: Don't overload id and URL
    
    if (options.usage == 'sign' || options.usage == 'encrypt' || (options.usage == 'deriveKey' && !options.foo)) {
      // TODO: if no recipient, default to self
      opts.id = entity.id;
      opts.url = entity.identifier;
    } else if (options.usage == 'verify' || options.usage == 'decrypt' || options.usage == 'deriveKey') {
      opts.url = entity ? entity.id : 'http://localhost/';
    }
    
    keyring.get(entity.id, function(err, cred) {
      if (err) { return cb(err); }
      if (typeof cred == 'string') {
        cred = { secret: cred }
      }
      // FIXME: Normalize better
      cred.secret = cred.password;
      return cb(null, cred);
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
  'http://i.bixbyjs.org/security/CredentialsStore',
  'http://i.bixbyjs.org/crypto/Keyring'
];
