exports = module.exports = function(container, logger) {
  var Translator = require('tokens').Translator;
  
  
  var translator = new Translator();
  
  var translateComps = container.components('http://i.bixbyjs.org/tokens/translateContextFunc');
  return Promise.all(translateComps.map(function(comp) { return comp.create(); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var dialects, j, len;
        dialects = translateComps[i].a['@dialect'];
        if (!Array.isArray(dialects)) {
          dialects = [ dialects ];
        }
      
        for (j = 0, len = dialects.length; j < len; ++j) {
          translator.use(dialects[j], fn);
          logger.info('Loaded token dialect translator: ' + dialects[j]);
        }
      });
    })
    .then(function() {
      return translator;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
