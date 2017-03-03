exports = module.exports = function(container, logger) {
  var Translator = require('../lib/translator');
  
  
  var translator = new Translator();
  
  var translateFnDecls = container.specs('http://i.bixbyjs.org/tokens/translateContextFunc');
  return Promise.all(translateFnDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var dialects, j, len;
        dialects = translateFnDecls[i].a['@dialect'];
        if (!Array.isArray(dialects)) {
          dialects = [ dialects ];
        }
      
        for (j = 0, len = dialects.length; j < len; ++j) {
          translator.use(dialects[j], fn);
          logger.info('Loaded translator to token dialect: ' + dialects[j]);
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
