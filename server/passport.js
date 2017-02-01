var LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:passport')
var env = require('../configs/settings.js').get()
// Passport serialize user function.
exports.serializeUser = function (user, done) {
  process.nextTick(function () {
    done(null, user.id)
  })
}
// Passport deserialize user function.
exports.deserializeUser = function (id, done) {
  var User = mongoose.model('users')
  User.findOne({
    _id: id
  }, '-password', function (err, user) {
    done(err, user)
  })
}
// Sign in using Email and Password.
exports.passportStrategy = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  var User = mongoose.model('users')
  email = email.toLowerCase()
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      debug('passport: Error ' + err)
      return done(err)
    }
    if (!user) {
      debug('passport: Email ' + email + ' not found')
      return done(null, false, {
        message: 'Email ' + email + ' not found'
      })
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err)
      }
      if (isMatch) {
        debug('passport: Login isMatch')
        return done(null, user)
      } else {
        debug('passport: Invalid Email or Password')
        return done(null, false, { message: 'Invalid email or password.' })
      }
    })
  })
})
// Sign in using google oauth2
exports.googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || env.google.clientID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || env.google.clientSecret,
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, cb) {
  var User = mongoose.model('users')
  var email = profile.emails[0].value

  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      debug('passport: Error ' + err)
      return cb(err)
    }
    if (!user) {
      User.create({
        email: email,
        password: accessToken,
        profile: {
          name: profile.displayName
        }
      }, function (err, user) {
        return cb(err, user)
      })
    } else {
      return cb(err, user)
    }
  })
})
