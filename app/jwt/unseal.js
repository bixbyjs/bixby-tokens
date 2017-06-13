exports = module.exports = function(key) {
  // Load modules.
  var tokens = require('tokens');
  
  return tokens.jwt.unseal(key);
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = 'application/jwt';
exports['@require'] = [ '../common/key' ];
