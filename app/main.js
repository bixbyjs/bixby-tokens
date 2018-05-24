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
      var api = {};
  
      api.seal = function(claims, recipients, options, cb) {
        console.log('SEAL THIS MESSAGE!');
        console.log(claims)
        
        
        var sealer;
        try {
          sealer = tokens.createSealer('application/jwt');
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
  
      api.unseal = function(token, cb) {
        console.log('UNSEAL THIS')
        console.log(token)
        
        var unsealer;
        try {
          unsealer = tokens.createUnsealer();
        } catch (ex) {
          return cb(ex);
        }
        
        unsealer.unseal(token, function(err, msg, extra) {
          if (err) { return cb(err); }
          
          console.log('MESSAG!');
          console.log(msg);
          console.log(extra);
          
          return cb(null, msg.claims);
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
