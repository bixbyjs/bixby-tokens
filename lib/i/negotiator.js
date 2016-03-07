function Negotiator() {
  this._formats = {};
}

Negotiator.prototype.use = function(name, obj) {
  this._formats[name] = obj;
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
  
  var fmt, cap
    , i, len;
  for (i = 0, len = formats.length; i < len; i++) {
    fmt = formats[i];
    
    cap = this._formats[fmt.type || fmt];
    
    console.log('GOT CAP!');
    console.log(formats[i]);
    console.log(cap);
    
  }
  
  return cb(new Error('Failed to negotiate token type'));
}


module.exports = Negotiator;
