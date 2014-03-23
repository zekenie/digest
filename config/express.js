
/**
 * Module dependencies.
 */

var express = require('express')
  , expressSession = require('express-session')
  , compression = require('compression')
  , RedisStore = require('connect-redis')(expressSession)
  , flash = require('connect-flash')
  , pkg = require('../package.json')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config, passport) {

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(compression({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  app.use(express.static(config.root + '/public'))

  // set views path, template engine and default layout
  app.set('views', process.cwd() + '/views')
  app.set('view engine', 'ejs')

  app.use(function (req, res, next) {
    req.pkg = pkg
    next()
  })

  // cookieParser should be above session
  app.use(cookieParser())

  // bodyParser should be above methodOverride
  app.use(bodyParser())
  app.use(methodOverride())

  // express/mongo session storage
  app.use(expressSession({
    secret: 'foo',
    store: new RedisStore(config.redis)
  }))

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session())

  // connect flash for flash messages - should be declared after sessions
  app.use(flash())

  // development env config
  if(env === 'development')
    app.locals.pretty = true
}