exports = module.exports = function(keyring) {
  
  return function(options, cb) {
    keyring.find(options, function(err, key, info) {
      if (err) { return cb(err); }
      return cb(null, key, info);
    });
  };
};


exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
