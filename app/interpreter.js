exports = module.exports = function(container, logger) {
  var Interpreter = require('../lib/interpreter');
  
  
  var interpreter = new Interpreter();
  
  var interpretComps = container.components('http://i.bixbyjs.org/tokens/interpretClaimsFunc');
  return Promise.all(interpretComps.map(function(comp) { return comp.create(); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var dialects, j, len;
        dialects = interpretComps[i].a['@dialect'];
        if (!Array.isArray(dialects)) {
          dialects = [ dialects ];
        }
      
        for (j = 0, len = dialects.length; j < len; ++j) {
          interpreter.use(dialects[j], fn);
          logger.info('Loaded token dialect interpreter: ' + dialects[j]);
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
