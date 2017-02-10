exports = module.exports = function(container, logger) {
  // Load modules.
  var Decoder = require('tokens').Decoder;
  
  
  var decoder = new Decoder();
  
  var decodeDecls = container.specs('http://i.bixbyjs.org/tokens/decodeFunc');
  
  return Promise.all(decodeDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      // Register token encoding plugins.
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = decodeDecls[i].a['@type'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          decoder.use(plugin);
          logger.info('Registered token decoder: ' + type[j]);
        }
      });
    })
    .then(function() {
      return decoder;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Decoder';
