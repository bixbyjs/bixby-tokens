exports = module.exports = function(keyring) {
  
  return function(options, cb) {
    return cb(null, 's3cr1t-s3cr1t-s3cr1t-s3cr1t-s3cr1t-s3cr1t', { id: '0' })
    
    /*
    keyring.find(options, function(err, key, info) {
      if (err) { return cb(err); }
      return cb(null, key, info);
    });
    */
  };
};


exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
