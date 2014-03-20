var fs = require('fs');
var path = require('path');

module.exports = function(app) {
  app.use(function(req,res,next) {
    if(res.headerSent) return;
    if(req.accepts('json') === 'json') return next()
    if(req.model && req.view) {
      //check for view
      var viewPath = path.join(process.cwd(),'views',req.model,req.view + '.ejs')
      fs.exists(viewPath,function(err,fileExists) {
        if(err) return next(err);
        if(fileExists)
          res.render(req.model + '/' + req.view)
      })
    } else {
      next();
    }
  });

  //json res
  app.use(function(req,res,next) {
    res.json(res.locals);
  });

  // assume "not found" in the error msgs
  // is a 404. this is somewhat silly, but
  // valid, you can do whatever you like, set
  // properties, use instanceof etc.
  app.use(function(err, req, res, next){
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }

    // log it
    // send emails if you want
    console.error(err.stack)

    // error page
    res.status(500).render('500', { error: err.stack })
  })

  // assume 404 since no middleware responded
  app.use(function(req, res, next){
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    })
  })
};