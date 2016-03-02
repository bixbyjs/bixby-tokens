exports = module.exports = function(container, logger) {
  // Load modules.
  var Decoder = require('tokens').Decoder;
  
  
  var decoder = new Decoder();

  var specs = container.specs()
    , spec, func, type, i, len, j, jlen;
  for (i = 0, len = specs.length; i < len; ++i) {
    spec = specs[i];
    
    if ((spec.implements || []).indexOf('http://i.bixbyjs.org/tokens/decodeFunc') !== -1) {
      // This specification declares a decoding function for a particular token
      // type.  Create the function and register it with the `Decoder` instance.
      func = container.create(spec.id);
      decoder.use(func);
      
      type = spec.a['@type'];
      if (!Array.isArray(type)) {
        type = [ type ];
      }
      for (j = 0, jlen = type.length; j < jlen; ++j) {
        logger.info('Registered support for decoding tokens of tyep: ' + type[j]);
      }
    }
  }
  
  return decoder;
}

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/tokens/Decoder';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
