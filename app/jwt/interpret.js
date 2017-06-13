exports = module.exports = function() {
  // Load modules.
  var tokens = require('tokens');
  
  return tokens.jwt.interpret();
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/interpretClaimsFunc';
exports['@dialect'] = 'urn:ietf:params:oauth:token-type:jwt';
