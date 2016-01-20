exports = module.exports = function() {
  // Load modules.
  var saml20 = require('tokens-saml20');
  
  
  return saml20.encode({ issuer: 'me-x', key: 'secret', algorithm: 'HS256' });
}

exports['@implements'] = 'http://schemas.modulate.io/js/security/tokens/encodeFunc';
exports['@type'] = [
  // Web Services Security: SAML Token Profile 1.1
  // https://www.oasis-open.org/committees/download.php/16768/wss-v1.1-spec-os-SAMLTokenProfile.pdf
  'http://docs.oasis-open.org/wss/oasis-wss-saml-token-profile-1.1#SAMLV2.0',
  // Security Assertion Markup Language (SAML) 2.0 Profile for OAuth 2.0 Client Authentication and Authorization Grants
  // http://tools.ietf.org/html/rfc7522
  'urn:ietf:params:oauth:grant-type:saml2-bearer'
];
