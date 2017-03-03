exports = module.exports = function(container, logger) {
  // Load modules.
  var Unsealer = require('tokens').Unsealer;
  
  
  var unsealer = new Unsealer();
  
  var unsealFnDecls = container.specs('http://i.bixbyjs.org/tokens/unsealFunc');
  return Promise.all(unsealFnDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var types, j, len;
        types = unsealFnDecls[i].a['@type'];
        if (!Array.isArray(types)) {
          types = [ types ];
        }
      
        for (j = 0, len = types.length; j < len; ++j) {
          unsealer.use(fn);
          logger.info('Loaded unsealer for token type:  ' + types[j]);
        }
      });
    })
    .then(function() {
      return unsealer;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Unsealer';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];

