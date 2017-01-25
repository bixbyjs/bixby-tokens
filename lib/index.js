exports = module.exports = {
  '': require('./xom/main'),
  'decoder': require('./xom/decoder'),
  'encoder': require('./xom/encoder'),
  'negotiator': require('./xom/negotiator'),
  //'jwt/caps': require('./jwt/caps'),
  //'jwt/decode': require('./jwt/decode'),
  //'jwt/encode': require('./jwt/encode'),
  //'iron/caps': require('./iron/caps'),
  //'iron/decode': require('./iron/decode'),
  //'iron/encode': require('./iron/encode'),
  //'saml2/encode': require('./saml2/encode')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
