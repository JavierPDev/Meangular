var blog = require('./blog.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  // GET
  app.get('/api/blog/', blog.getBlog)
  app.get('/api/blog/:slug', blog.getBlogBySlug)

  // POST
  app.post('/api/blog', auth.isAuthenticated, blog.postBlog)

  // PUT
  app.put('/api/blog/:slug', auth.isAuthorized('blog'), blog.putBlog)

  // DELETE
  app.delete('/api/blog/:slug', auth.isAuthorized('blog'), blog.deleteBlog)

  // PARAM
  app.param('slug', blog.paramBlog)
}
