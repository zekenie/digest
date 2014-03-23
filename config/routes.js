var str = require('../lib/str')
var router = {
  '/:model':{
    get:'index',
    post:'create'
  },
  '/:model/:id':{
    get:'view',
    put:'update',
    delete:'delete'
  }
};

module.exports = function(app,passport,db) {
  var api = require('../lib/api')();

  for(routeStr in router) {
    var route = app.route(routeStr);
    for(method in router[routeStr]) {
      route[method](api[router[routeStr][method]]);
    }
  }

  app.param('model',function(req,res,next,model) {
    model = str.cap(model);
    if(!db[model]) return res.send(404);
    req.model = db[model];
    next();
  });

  app.param('id',function(req,res,next,id) {
    db[req.model].find(id).complete(function(err,record) {
      if(err) return next(err);
      if(!record) return res.send(404);
      req[lower(req.params.model)] = record;
      next();
    });
  });
};