process.env.NODE_ENV = 'e2e'
var Mean = require('./server.mean.js')
var run = require('./run.js')
var seed = require('./seed/seed.js')
describe('Meangular API Testing', function () {
  before(function (done) {
    this.timeout(20000)
    run(Mean, function () {
      seed().then(function () {
        done()
      })
    })
  })
  require('glob').sync('server/modules/**/*.spec.js').forEach(function (file) {
    require('./' + file)
  })
})
