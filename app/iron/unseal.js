exports = module.exports = function(key) {
  // Load modules.
  var iron = require('tokens-iron');
  
  return iron.unseal(key);
};


exports['@implements'] = 'http://i.bixbyjs.org/tokens/unsealFunc';
exports['@type'] = [ 'application/fe26.2' ];
exports['@require'] = [ '../common/key' ];
