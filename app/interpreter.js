exports = module.exports = function(container, logger) {
  var Interpreter = require('../lib/interpreter');
  
  
  var interpreter = new Interpreter();
  
  var interpretDecls = container.specs('http://i.bixbyjs.org/tokens/interpret');
  
  return Promise.all(interpretDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = interpretDecls[i].a['@dialect'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          interpreter.use(type[j], plugin);
          logger.info('Loaded token interpreter: ' + type[j]);
        }
      });
    })
    .then(function() {
      return interpreter;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Interpreter';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
