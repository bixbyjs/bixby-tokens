exports = module.exports = function(container, logger) {
  // Load modules.
  var Sealer = require('tokens').Sealer;
  
  
  var sealer = new Sealer();
  
  var sealFnDecls = container.specs('http://i.bixbyjs.org/tokens/sealFunc');
  return Promise.all(sealFnDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var types, j, len;
        types = sealFnDecls[i].a['@type'];
        if (!Array.isArray(types)) {
          types = [ types ];
        }
      
        for (j = 0, len = types.length; j < len; ++j) {
          sealer.use(types[j], fn);
          logger.info('Loaded sealer for token type: ' + types[j]);
        }
      });
    })
    .then(function() {
      return sealer;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Sealer';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
