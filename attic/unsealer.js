exports = module.exports = function(container, logger) {
  // Load modules.
  var Unsealer = require('tokens').OldUnsealer;
  
  
  var unsealer = new Unsealer();
  
  var unsealComps = container.components('http://i.bixbyjs.org/tokens/unsealFunc');
  return unsealer;
};

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
