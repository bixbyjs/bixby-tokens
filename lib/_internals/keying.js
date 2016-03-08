exports = module.exports = function(keyring) {
  
  return function(options, cb) {
    console.log('GET KEY FOR');
    console.log(options)
    
    keyring.find(options, function(err, key, info) {
      console.log('GOT KEY');
      console.log(key);
      console.log(info);
      
      if (err) { return cb(err); }
      return cb(null, key, info);
    });
  };
};


exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
