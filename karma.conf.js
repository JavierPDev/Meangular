var browsers = process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome']
// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      'jasmine-matchers',
      '@angular/cli'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-matchers'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    files: [
      { pattern: './client/src/test.ts', watched: false }
    ],
    preprocessors: {
      './client/src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    // angularCli: {
    //   config: './angular-cli.json',
    //   environment: 'dev'
    // },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,
    singleRun: false
  })
}
