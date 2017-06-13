exports = module.exports = function(keyring) {
  // Load modules.
  var fernet = require('tokens-fernet');
  
  // TODO: Pass in other options for Msgpack, YAML, etc payload sz
  // https://github.com/heroku/kombu-fernet-serializers/blob/master/kombu_fernet/serializers/json.py
  
  return fernet.seal(keyring.find.bind(keyring));
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/sealFunc';
exports['@type'] = [ 'application/x-fernet-json' ];
exports['@require'] = [ 'http://i.bixbyjs.org/crypto/Keyring' ];
