exports = module.exports = function(IoC, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var tokens = new Tokens();
  
  return Promise.resolve(tokens)
    .then(function(tokens) {
      var components = IoC.components('http://i.bixbyjs.org/tokens/Token');
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(formats) {
          formats.forEach(function(format, i) {
            var type = components[i].a['@type'];
            logger.info('Loaded token type: ' + type);
            tokens.format(type, format)
          });
        })
        .then(function() {
          return tokens;
        });
    })
    .then(function(tokens) {
      // Register token dialects.
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.bixbyjs.org/tokens/Dialect');
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(tokens);
          }
          
          component.create()
            .then(function(dialect) {
              logger.info('Loaded token dialect: ' + component.a['@type']);
              
              tokens.dialect(component.a['@type'], dialect);
              iter(i + 1);
            }, function(err) {
              // TODO: Print the package name in the error, so it can be found
              // TODO: Make the error have the stack of dependencies.
              if (err.code == 'IMPLEMENTATION_NOT_FOUND') {
                logger.notice(err.message + ' while loading component ' + component.id);
                return iter(i + 1);
              }
              
              reject(err);
            })
        })(0);
      });
    })
    .then(function(tokens) {
      return tokens;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
