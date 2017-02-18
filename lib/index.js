exports = module.exports = {
  '': require('./main'),
  'interpreter': require('./interpreter'),
  'sealer': require('./sealer'),
  'unsealer': require('./unsealer'),
  'translator': require('./translator'),
  'negotiator': require('./negotiator'),
  'dialect/jwt-access-token/translate': require('./dialect/jwt-access-token/translate'),
  'dialect/jwt-access-token/interpret': require('./dialect/jwt-access-token/interpret')
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
