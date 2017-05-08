// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/* global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter')
process.env.NODE_ENV = 'e2e'
var Mean = require('./server.mean.js')
var run = require('./run.js')
var seed = require('./seed/seed.js')

var config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:3000/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    })
    run(Mean, seed)
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}))
    
    // Add Jasmine Matchers/jasmine-expect for protractor use
		var matchers = require('./node_modules/jasmine-expect/src')
    beforeAll(function () {
      jasmine.addMatchers(matchers)
    })
  }
}

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME
  config.sauceKey = process.env.SAUCE_ACCESS_KEY
  config.capabilities = {
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  }
} else {
  config.directConnect = true
}

exports.config = config
