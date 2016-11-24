exports = module.exports = function(container, logger) {
  // Load modules.
  var Encoder = require('tokens').Encoder;
  
  
  var encoder = new Encoder();
  var encodeDecls = container.specs('http://i.bixbyjs.org/tokens/encodeFunc');
  
  return Promise.all(encodeDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      // Register token encoding plugins.
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = encodeDecls[i].a['@type'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          encoder.use(type[j], plugin);
          logger.info('Registered token encoder: ' + type[j]);
        }
      });
    })
    .then(function() {
      return encoder;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Encoder';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
