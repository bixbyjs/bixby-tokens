exports = module.exports = function(key) {
  var tokens = require('tokens');
  
  
  return {
    seal: tokens.jwt.seal({ issuer: 'http://localhost' }, key),
    unseal: tokens.jwt.unseal(key)
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Token';
exports['@type'] = 'application/jwt';
exports['@require'] = [
  '../common/key'
];
