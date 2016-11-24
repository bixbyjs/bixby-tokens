function Negotiator() {
  this._formats = {};
}

Negotiator.prototype.use = function(type, obj) {
  this._formats[type.toLowerCase()] = obj;
};

// TODO: Support options
// options { encryption: true, signing: true }.  Can be properties of a particular
// authentication Scheme and/or claims to be encoded.  confirmation requires encryption
// Hawk requires encryption, etc
Negotiator.prototype.negotiate = function(formats, options) {
  options = options || {};
  
  
  return {
          type: 'urn:ietf:params:oauth:token-type:jwt',
          signingAlgorithms: [
            'sha256', 'RSA-SHA256'
          ]
        };
  
  // FIXME: Implement this for real
  
  var params = {}
    , fmt, type, cap
    , i, len;
  for (i = 0, len = formats.length; i < len; i++) {
    fmt = formats[i];
    type = fmt.type || fmt
    
    cap = this._formats[type.toLowerCase()];
    if (!cap) { continue; }
    
    params.type = type;
    params.signingAlgorithms = (fmt.signingAlgorithms || []).filter(function(alg) {
      return (cap.signingAlgorithms || []).indexOf(alg) !== -1;
    });
    params.encryptionAlgorithms = (fmt.encryptionAlgorithms || []).filter(function(alg) {
      return (cap.encryptionAlgorithms || []).indexOf(alg) !== -1;
    });
    
    return params;
  }
  
  return null;
}


module.exports = Negotiator;
