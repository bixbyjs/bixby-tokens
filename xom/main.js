exports = module.exports = function(negotiator, encoder, verifier) {
  var api = {};
  
  api.negotiate = function(formats) {
    console.log('NEGOTIATE THE TOKEN...');
    return negotiator.negotiate(formats);
  }
  
  api.encode = function(format, claims, options, cb) {
    console.log('ENCODE THE TOKEN...');
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
