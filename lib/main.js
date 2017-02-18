exports = module.exports = function(negotiator, interpreter, translator, unsealer, sealer) {
  var api = {};
  
  api.negotiate = function(formats) {
    return negotiator.negotiate(formats);
  }
  
  api.seal = function(type, claims, options, cb) {
    return sealer.seal(type, claims, options, cb);
  }
  
  api.unseal = function(token, cb) {
    return unsealer.unseal(token, cb);
  }
  
  api.translate = function(dialect, ctx, cb) {
    return translator.translate(dialect, ctx, cb);
  }
  
  api.interpret = function(claims, options, cb) {
    return interpreter.interpret(claims, options, cb);
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
