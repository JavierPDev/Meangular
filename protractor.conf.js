// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/* global jasmine */
var SpecReporter = require('jasmine-spec-reporter')
process.env.NODE_ENV = 'e2e'
var Mean = require('./server.mean.js')
var run = require('./run.js')
var seed = require('./tests/seed.js')

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:3000/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e'
    })
    run(Mean, seed)
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter())
  }
}
