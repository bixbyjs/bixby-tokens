exports = module.exports = function() {
  var tokens = require('tokens');
  
  
  return tokens.jwt.dialect();
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Dialect';
//exports['@type'] = 'urn:ietf:params:oauth:token-type:jwt';
exports['@type'] = 'application/at+jwt';
exports['@require'] = [
];
