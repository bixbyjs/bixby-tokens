exports = module.exports = function(seal, unseal) {
  
  return {
    seal: seal,
    unseal: unseal
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Token';
exports['@type'] = 'application/jwt';
exports['@require'] = [
  './seal',
  './unseal'
];
