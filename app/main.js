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
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/tokens/Negotiator',
  './interpreter',
  './translator',
  './unsealer',
  './sealer'
];
