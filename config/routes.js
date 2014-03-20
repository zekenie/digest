var cap = function(str){
    return str.substr(0,1).toUpperCase() + str.substr(1);
  },
  lower = function(str) {
    return str.substr(0,1).toLowerCase() + str.substr(1);
  };

var router = {
  '/:model':{
    get:'index',
    post:'create'
  },
  '/:model/:id':{
    get:'view',
    put:'update',
    del:'delete'
  }
};

module.exports = function(app,passport,db) {
  var api = require('../lib/api')(db);

  for(routeStr in router) {
    var route = app.route(routeStr);
    for(method in router[routeStr]) {
      route[method](api[router[routeStr][method]]);
    }
  }

  app.params('model',function(req,res,next,model) {
    model = cap(model);
    if(!db[model]) return res.send(404);
    req.model = db[model];
    next();
  });

  app.params('id',function(req,res,next,id) {
    db[req.model].find(id).complete(function(err,record) {
      if(err) return next(err);
      if(!record) return res.send(404);
      req[lower(req.params.model)] = record;
      next();
    });
  });
};