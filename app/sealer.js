exports = module.exports = function(container, logger) {
  // Load modules.
  var Sealer = require('tokens').Sealer;
  
  
  var sealer = new Sealer();
  
  var sealComps = container.components('http://i.bixbyjs.org/tokens/sealFunc');
  return Promise.all(sealComps.map(function(comp) { return comp.create(); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var types, j, len;
        types = sealComps[i].a['@type'];
        if (!Array.isArray(types)) {
          types = [ types ];
        }
      
        for (j = 0, len = types.length; j < len; ++j) {
          sealer.use(types[j], fn);
          logger.info('Loaded token sealer: ' + types[j]);
        }
      });
    })
    .then(function() {
      return sealer;
    });
};

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
