exports = module.exports = function(key) {
  // Load modules.
  var tokens = require('tokens');
  
  // TODO: consolidate the issuer value somewhere.
  return tokens.jwt.seal({ issuer: 'http://localhost' }, key);
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/sealFunc';
exports['@type'] = 'application/jwt';
exports['@require'] = [ '../../common/key' ];
