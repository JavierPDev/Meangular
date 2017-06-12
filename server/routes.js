module.exports = routes

var express = require('express')
var ejs = require('ejs')
var path = require('path')
var seo = require('./seo')

function nothingFoundHandler (msg) {
  return function (req, res) {
    res.status(400).send({
      error: msg
    })
  }
}

function routes (self) {
    // {
  //   app: self.app,
  //   settings: self.settings,
  //   middleware: self.middleware,
  //   environment: self.environment
  // }
  // Dynamic Routes / Manually enabling them . You can change it back to automatic in the settings
  // build.routing(app, mongoose) - if reverting back to automatic

  // self.app.use(self.build.responseMiddleware({mongoose: mongoose}))
  // self.build.routing({
  //   mongoose: mongoose,
  //   remove: ['users'],
  //   middleware: {
  //     auth: [self.middleware.verify, self.middleware.isAuthenticated]
  //   }
  // }, function (error, data) {
  //   if (error) console.log(error)
  //   _.forEach(data, function (m) {
  //     debug('Route Built by NPM buildreq:', m.route)
  //     self.app.use(m.route, m.app)
  //   })
  // })
  self.app.use(express.static(path.join(self.dir, 'client/'), {
    maxAge: 31557600000
  }))
  self.app.get('/api/seo/*', function (req, res) {
    seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
      res.send(seoSettings)
    })
  })
  self.app.get('/api/*', nothingFoundHandler('nothing found in api'))
  self.app.get('/images/*', nothingFoundHandler('nothing found in images'))
  self.app.get('/uploads/*', nothingFoundHandler('nothing found in uploads'))
  self.app.get('/dist/*', nothingFoundHandler('nothing found in dist'))
  // Angular-cli targets js and css files as being in root public so rewrite to dist
  self.app.get(/(\.css)|(\.js)$/, function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist' + req.url))
  })
  if (process.env.NODE_ENV === 'development') {
    self.app.get('/*.map', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/dist' + req.url))
    })
  }
  self.app.get('/*', function (req, res) {
    seo(self, req, function (seoSettings) {
      // Use /client/dist/index.html built by angular-cli from /client/src/index.html
      ejs.renderFile(path.join(__dirname, '../client/dist/index.html'), {
        html: seoSettings,
        googleAnalytics: self.settings.googleAnalytics,
        name: self.settings.app.name,
        assets: self.app.locals.frontendFilesFinal,
        environment: self.environment,
        user: req.user ? req.user : {}
      }, {
        cache: false
      }, function (err, str) {
        if (err)console.log(err)
        res.send(str)
      })
    })
  })
}
