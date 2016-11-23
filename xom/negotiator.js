exports = module.exports = function(container, logger) {
  // Load modules.
  var Negotiator = require('../lib/negotiator');
  
  
  var negotiator = new Negotiator();
  
  var specs = container.specs()
    , spec, obj, type, i, len, j, jlen;
  for (i = 0, len = specs.length; i < len; ++i) {
    spec = specs[i];
    if ((spec.implements || []).indexOf('http://i.bixbyjs.org/tokens/capabilitiesDesc') !== -1) {
      // This specification declares a capabilities descriptor for a particular
      // token type.  Create the descriptor and register it with the
      // `Negotiator` instance.
      obj = container.create(spec.id);
      type = spec.a['@type'];
      if (!Array.isArray(type)) {
        type = [ type ];
      }
      
      for (j = 0, jlen = type.length; j < jlen; ++j) {
        negotiator.use(type[j], obj);
        logger.info('Loaded plug-in declaring capabilities for tokens of type: ' + type[j]);
      }
    }
  }
  
  return negotiator;
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Negotiator';
