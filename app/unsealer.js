exports = module.exports = function(container, logger) {
  // Load modules.
  var Unsealer = require('tokens').Unsealer;
  
  
  var unsealer = new Unsealer();
  
  var unsealComps = container.components('http://i.bixbyjs.org/tokens/unsealFunc');
  return Promise.all(unsealComps.map(function(comp) { return comp.create(); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var types, j, len;
        types = unsealComps[i].a['@type'];
        if (!Array.isArray(types)) {
          types = [ types ];
        }
      
        for (j = 0, len = types.length; j < len; ++j) {
          unsealer.use(fn);
          logger.info('Loaded token unsealer:  ' + types[j]);
        }
      });
    })
    .then(function() {
      return unsealer;
    });
};

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
