exports = module.exports = function(container, logger) {
  // Load modules.
  var Sealer = require('tokens').OldSealer;
  
  
  var sealer = new Sealer();
  
  return sealer;
};

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
