var user = require('./users.controller.js')
var multer = require('multer')
var upload = multer({ dest: 'client/uploads/' })
var passport = require('passport')
var env = require('../../../configs/settings.js').get()
var googleOauth2Enabled = env.google.clientId && env.google.clientSecret

module.exports = function (app, auth, mail, settings, models) {
  app.post('/api/photos/upload', upload.single('file'), user.postPhoto)
  app.post('/api/authenticate', user.postAuthenticate)
  app.get('/api/authenticate', user.getAuthenticate)
  app.post('/api/login', user.postLogin)
  app.get('/api/logout', user.logout)
  app.post('/api/forgot', user.postForgot)
  app.get('/api/reset/:token', user.getReset)
  app.post('/api/reset/:token', user.postReset)
  app.post('/api/signup', user.postSignup)
  app.put('/api/account/profile', auth.isAuthenticated, user.putUpdateProfile)
  app.put('/api/account/password', auth.isAuthenticated, user.putUpdatePassword)
  app.delete('/api/account/delete', auth.isAuthenticated, user.deleteDeleteAccount)

  app.get('/auth/oauth/token', user.oauthToken)
  if (googleOauth2Enabled) {
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email'], prompt: 'select_account'}))
    app.get(env.google.redirectUrl, passport.authenticate('google', {failureRedirect: '/login'}), user.googleCallback)
  }
}
