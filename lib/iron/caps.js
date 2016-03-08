exports = module.exports = {
  signingAlgorithms: [
    'hmac-sha256' // symmetric
  ],
  encryptionAlgorithms: [
    'aes-256-cbc' // symmetric
  ]
}

exports['@literal'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/tokens/capabilitiesDesc';
exports['@type'] = [ 'application/fe26.2' ];
