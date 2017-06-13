exports = module.exports = function() {
  // Load modules.
  var tokens = require('tokens');
  
  return tokens.jwt.translate();
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/translateContextFunc';
exports['@dialect'] = 'urn:ietf:params:oauth:token-type:jwt';
