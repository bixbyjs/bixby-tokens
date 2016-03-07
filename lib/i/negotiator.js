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
Negotiator.prototype.negotiate = function(formats, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  var params = {}
    , fmt, type, cap
    , i, len;
  for (i = 0, len = formats.length; i < len; i++) {
    fmt = formats[i];
    type = fmt.type || fmt
    
    cap = this._formats[type.toLowerCase()];
    
    console.log('GOT CAP!');
    console.log(formats[i]);
    console.log(cap);
    
    params.signingAlgorithms = (fmt.signingAlgorithms || []).filter(function(alg) {
      return (cap.signingAlgorithms || []).indexOf(alg) !== -1;
    });
    
    return cb(null, type, params);
  }
  
  return cb(new Error('Failed to negotiate token type'));
}


module.exports = Negotiator;
