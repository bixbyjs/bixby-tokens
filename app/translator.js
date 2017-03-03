exports = module.exports = function(container, logger) {
  var Translator = require('../lib/translator');
  
  
  var translator = new Translator();
  
  var translateDecls = container.specs('http://i.bixbyjs.org/tokens/translate');
  
  return Promise.all(translateDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = translateDecls[i].a['@dialect'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          translator.use(type[j], plugin);
          logger.info('Loaded token translate: ' + type[j]);
        }
      });
    })
    .then(function() {
      return translator;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Translator';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
