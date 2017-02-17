exports = module.exports = function(negotiator, translator, encoder, verifier) {
  var api = {};
  
  api.negotiate = function(formats) {
    return negotiator.negotiate(formats);
  }
  
  api.seal = function(type, claims, options, cb) {
    return encoder.encode(type, claims, options, cb);
  }
  
  api.unseal = function(token, cb) {
    return verifier.decode(token, cb);
  }
  
  api.translate = function(dialect, ctx, cb) {
    return translator.translate(dialect, ctx, cb);
  }
  
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/tokens/Negotiator',
  'http://i.bixbyjs.org/tokens/Translator',
  'http://i.bixbyjs.org/tokens/Encoder',
  'http://i.bixbyjs.org/tokens/Decoder' // TODO: Rename this to verifier 
];
