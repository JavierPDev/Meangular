module.exports = config
var auth = require('./passport.js')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var compress = require('compression')
var express = require('express')
var expressValidator = require('express-validator')
var methodOverride = require('method-override')
var path = require('path')
var passport = require('passport')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var statusMonitor = require('express-status-monitor')
var queryParameters = require('express-query-parameters')()
var env = require('../configs/settings.js').get()
var googleOauth2Enabled = env.google.clientId && env.google.clientSecret
function config (self) {
  self.app = express()
  self.app.enable('trust proxy')
  self.app.disable('x-powered-by')
  self.app.set('view engine', 'html')
  self.app.set('views', path.join(self.dir, '/client'))
  self.app.set('port', self.port)
  self.app.use(statusMonitor({
    path: '/api/status'
  }))
  self.app.use(compress())
  self.app.use(bodyParser.json(self.settings.bodyparser.json))
  self.app.use(bodyParser.urlencoded(self.settings.bodyparser.urlencoded))
  self.app.use(expressValidator(self.settings.expresValidator))
  self.app.use(methodOverride())
  self.app.use(cookieParser())
  self.app.use(session({
    name: self.settings.sessionName,
    resave: true,
    saveUninitialized: true,
    secret: self.settings.sessionSecret,
    store: new MongoStore({
      url: self.settings.mongodb.uri,
      autoReconnect: true
    })
  }))
  self.app.use(passport.initialize())
  self.app.use(passport.session())
  passport.serializeUser(auth.serializeUser)
  passport.deserializeUser(auth.deserializeUser)
  passport.use(auth.passportStrategy)
  if (googleOauth2Enabled) {
    console.log('Using google oauth2');
    passport.use(auth.googleStrategy)
  } else {
    console.log('No google client id or secret. Running without google oauth2');
  }
  queryParameters.config({
    settings: {
      schema: ['_id', 'id', '__v', 'created', 'title', 'content', 'user', 'email', 'roles', 'slug'], // the names people can search
      adapter: 'mongoose' // <object|string:supported adapter(MONGOOSE)>
    }
  })
  self.app.use(queryParameters.middleware())
  self.app.use(require('./prerenderer'))
}
