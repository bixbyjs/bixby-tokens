exports = module.exports = function(negotiator, interpreter, translator, unsealer, sealer) {
  var api = {};
  
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
        return cb(null, sctx, tok.issuer);
      });
    });
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/tokens/Negotiator',
  'http://i.bixbyjs.org/tokens/Interpreter',
  'http://i.bixbyjs.org/tokens/Translator',
  'http://i.bixbyjs.org/tokens/Unsealer',
  'http://i.bixbyjs.org/tokens/Sealer'
];
