exports = module.exports = function() {
  
  
  return function translate(ctx, cb) {
    console.log('TRANSLATE TO JWT:');
    console.log(ctx);
    
    var claims = {}
      , i, len;
    
    if (ctx.user) {
      claims.sub = ctx.user.id;
    }
    
    if (ctx.resources) {
      claims.aud = [];
      for (i = 0, len = ctx.resources.length; i < len; ++i) {
        claims.aud.push(ctx.resources[i].id);
      }
      
      // TODO: Set audience to a string, if single-valued
    }
    
    if (ctx.client) {
      // https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-07#section-4.3
      claims.cid = ctx.client.id;
    }
    
    // https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-07#section-4.2
    
    
    console.log('BUILT CLAIMS:');
    console.log(claims);
    
    
    return cb(null, claims);
  };
};

exports['@implements'] = [
  'http://i.bixbyjs.org/tokens/dialect/translate',
  'http://i.bixbyjs.org/tokens/dialect/jwt-access-token/translate'
];
