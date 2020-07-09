exports = module.exports = function(IoC, negotiator, interpreter, translator, unsealer, sealer, logger) {
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
      var api = {};
  
      // TODO: Return tokens directly;
      api.createSerializer = tokens.createSerializer.bind(tokens);
      api.createSealer = tokens.createSealer.bind(tokens);
  
      api.seal = function(claims, recipients, options, cb) {
        console.log('SEAL THIS MESSAGE!');
        console.log(claims)
        
        var type = options.type || 'application/jwt';
        
        
        var sealer;
        try {
          sealer = tokens.createSealer(type);
        } catch (ex) {
          return cb(ex);
        }
        
        sealer.seal(claims, recipients, options, function(err, token) {
          console.log('SEALED IT!');
          console.log(err)
          console.log(token)
          
          if (err) { return cb(err); }
          return cb(null, token);
        });
      };
  
      api.unseal = function(token, options, cb) {
        if (typeof options == 'function') {
          cb = options;
          options = undefined;
        }
        options = options || {};
        
        var unsealer;
        try {
          unsealer = tokens.createUnsealer();
        } catch (ex) {
          return cb(ex);
        }
        
        unsealer.unseal(token, options, function(err, claims, conditions, issuer) {
          if (err) { return cb(err); }
          return cb(null, claims, conditions, issuer);
        });
      };
  
  
      api.negotiate = function(formats) {
        return negotiator.negotiate(formats);
      }
  
      api.cipher = function(ctx, options, cb) {
        if (typeof options == 'function') {
          cb = options;
          options = undefined;
        }
        options = options || {};
    
        translator.translate(ctx, options, function(err, claims) {
          if (err) { return cb(err); }
      
          // Marshal context necessary for sealing the token.  This includes this
          // that are conceptually "header" information, such as the audience, time
          // of issuance, expiration, etc.
          options.audience = ctx.audience;
      
          sealer.seal(claims, options, function(err, token) {
            if (err) { return cb(err); }
            return cb(null, token);
          });
        });
      }
  
      api.decipher = function(token, options, cb) {
        if (typeof options == 'function') {
          cb = options;
          options = undefined;
        }
        options = options || {};
    
        unsealer.unseal(token, options, function(err, tok) {
          if (err) { return cb(err); }
      
          interpreter.interpret(tok, options, function(err, sctx) {
            if (err) { return cb(err); }
            return cb(null, sctx, tok);
          });
        });
      }
  
      return api;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/tokens/Negotiator',
  './interpreter',
  './translator',
  './unsealer',
  './sealer',
  'http://i.bixbyjs.org/Logger'
];
