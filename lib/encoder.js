exports = module.exports = function(container, logger) {
  // Load modules.
  var Encoder = require('tokens').Encoder;
  
  
  var encoder = new Encoder();

  var specs = container.specs()
    , spec, func, type, i, len, j, jlen;
  for (i = 0, len = specs.length; i < len; ++i) {
    spec = specs[i];
    if ((spec.implements || []).indexOf('http://i.bixbyjs.org/tokens/encodeFunc') !== -1) {
      // This specification declares an encoding function for a token type.
      // Create the function and plug it in to the `Encoder` instance.
      func = container.create(spec.id);
      type = spec.a['@type'];
      if (!Array.isArray(type)) {
        type = [ type ];
      }
      
      for (j = 0, jlen = type.length; j < jlen; ++j) {
        encoder.use(type[j], func);
        logger.info('Registered encoder for token type: ' + type[j]);
      }
    }
  }
  
  return encoder;
}

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
exports['@implements'] = 'http://i.bixbyjs.org/tokens/Encoder';
