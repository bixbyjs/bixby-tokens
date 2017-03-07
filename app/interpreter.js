exports = module.exports = function(container, logger) {
  var Interpreter = require('../lib/interpreter');
  
  
  var interpreter = new Interpreter();
  
  var interpretFnDecls = container.specs('http://i.bixbyjs.org/tokens/interpretClaimsFunc');
  return Promise.all(interpretFnDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(fns) {
      fns.forEach(function(fn, i) {
        var dialects, j, len;
        dialects = interpretFnDecls[i].a['@dialect'];
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
