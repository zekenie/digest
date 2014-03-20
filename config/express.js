
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , pkg = require('../package.json')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config, passport) {

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  app.use(express.static(config.root + '/public'))

  // set views path, template engine and default layout
  app.set('views', config.root + '/views')
  app.set('view engine', 'ejs')

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg
    next()
  })

  // cookieParser should be above session
  app.use(cookieParser())

  // bodyParser should be above methodOverride
  app.use(bodyParser())
  app.use(methodOverride())

  // express/mongo session storage
  app.use(express.session({
    secret: 'foo',
    store: new mongoStore({
      url: config.mongo,
      db : 'sessions'
    })
  }))

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session())

  // connect flash for flash messages - should be declared after sessions
  app.use(flash())

  // adds CSRF support
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.csrf())

    // This could be moved to view-helpers :-)
    app.use(function(req, res, next){
      res.locals.csrf_token = req.csrfToken()
      next()
    })
  }

  // development env config
  if(env === 'development')
    app.locals.pretty = true
}