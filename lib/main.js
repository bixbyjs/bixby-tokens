exports = module.exports = function(negotiator, encoder, verifier) {
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
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/tokens/Negotiator',
  'http://i.bixbyjs.org/tokens/Encoder',
  'http://i.bixbyjs.org/tokens/Decoder' // TODO: Rename this to verifier 
];
