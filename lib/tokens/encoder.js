exports = module.exports = function(serializeClientCb, deserializeClientCb) {
  var Encoder = require('tokens').Encoder;
  
  var encoder = new Encoder();


  // TODO: Make these plugins
  
  encoder.use('jwt', require('tokens').encode.sat());
  
  
  return encoder;
}


exports['@provides'] = 'io.modulate.security.tokens.Encoder';
// TODO: Require by interface
exports['@require'] = [];
exports['@singleton'] = true;

