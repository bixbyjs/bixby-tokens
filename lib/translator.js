function Translator() {
  this._dialects = {};
}

Translator.prototype.use = function(type, fn) {
  this._dialects[type] = fn;
};

Translator.prototype.translate = function(type, ctx, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  var fn = this._dialects[type];
  if (!fn) { return cb(new Error('Token dialect "' + type + '" is not supported')); }
  
  try {
    var arity = fn.length;
    if (arity == 3) { // async with options
      fn(ctx, options, cb);
    } else if (arity == 2) { // async
      fn(ctx, cb);
    } else {
      process.nextTick(function() {
        var yr = fn(ctx);
        cb(null, yr);
      });
    }
  } catch (ex) {
    cb(ex);
  }
}




exports = module.exports = function(container, logger) {
  var translator = new Translator();
  
  var translateDecls = container.specs('http://i.bixbyjs.org/tokens/translate');
  
  return Promise.all(translateDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      plugins.forEach(function(plugin, i) {
        var j, jlen;
        
        type = translateDecls[i].a['@dialect'];
        if (!Array.isArray(type)) {
          type = [ type ];
        }
      
        for (j = 0, jlen = type.length; j < jlen; ++j) {
          translator.use(type[j], plugin);
          logger.info('Loaded token translate: ' + type[j]);
        }
      });
    })
    .then(function() {
      return translator;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/Translator';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
