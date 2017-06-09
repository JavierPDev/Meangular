var assert = require('chai').assert
var request = require('supertest')
var blogSlug = ''

describe('BLOG', function () {
  describe('GET /api/blog', function () {
    it('should be returning array', function (done) {
      request('localhost:3000/')
        .get('api/blog')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.isArray(res.body.blogs)
          blogSlug = res.body.blogs[0].slug
          done()
        })
    })
    it('should be returning object', function (done) {
      request('localhost:3000/')
        .get('api/blog/' + blogSlug)
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.isObject(res.body)
          done()
        })
    })
  })
})
