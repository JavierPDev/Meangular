var less = require('less')
var chalksay = require('chalksay')
var chokidar = require('chokidar')
var sass = require('node-sass')
var debug = require('debug')('meanstackjs:tools')
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
module.exports = function (self) {
  debug('started setupToolLivereload')

  if (self.environment === 'development') {
    var Livereload = require('./server.livereload.js')
    self.run(Livereload)
    console.log('Livereload running');
  }

  debug('end setupToolLivereload')
}
