var str = require('../lib/str')
module.exports = function(db) {
  return {
    index:function(req,res,next) {
      req.model.findAll().complete(function(err,records) {
        if(err) return next(err);
        res.locals[str.inflection.pluralize(str.lower(req.model.name))] = records;
        next();
      });
    },
    view:function(req,res,next) {
      modelName = str.lower(req.model.name);
      res.locals[modelName] = req[modelName];
      next();
    },
    update:function(req,res,next) {
      modelName = str.lower(req.model.name);
      var record = req[modelName]
      for(key in req.body) {
        record[key] = req.body[key];
      }
      record.save().complete(function(err,record) {
        if(err) return next(err);
        req[modelName] = res.locals[modelName] = record;
        next();
      })
    },
    create:function(req,res,next) {
      req.model.build(req.body).save().complete(function(err,record) {
        if(err) return next(err);
        res.locals[str.lower(req.model.name)] = record;
      });
    },
    delete:function(req,res,next) {
      modelName = str.lower(req.model.name);
      req.modelName.destroy().complete(function(err) {
        if(err) return next(err);
        res.send(200)
      });
    }
  };
}