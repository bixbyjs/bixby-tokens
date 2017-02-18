function Interpreter() {
  this._dialects = [];
}

Interpreter.prototype.use = function(fn) {
  this._dialects.push(fn);
};

Interpreter.prototype.interpret = function(tok, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  var self = this
    , stack = this._dialects
    , idx = 0;

  function next(err, params) {
    if (err || params) { return cb(err, params); }
  
    var layer = stack[idx++];
    // TODO: Make a better error, with a status code
    if (!layer) { return cb(new Error('Failed to interpret token')); }
  
    try {
      var arity = layer.length;
      if (arity == 3) { // async with options
        layer(tok, options, next);
      } else if (arity == 2) { // async
        layer(tok, next);
      } else {
        var rv = layer(tok);
        next(null, rv);
      }
    } catch (ex) {
      next(ex);
    }
  }
  next();
}




exports = module.exports = function(container, logger) {
  var interpreter = new Interpreter();
  
  var interpretDecls = container.specs('http://i.bixbyjs.org/tokens/interpret');
  
  return Promise.all(interpretDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = interpretDecls[i].a['@dialect'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          interpreter.use(plugin);
          logger.info('Loaded token interpreter: ' + type[j]);
        }
      });
    })
    .then(function() {
      return interpreter;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Interpreter';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
