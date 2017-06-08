var comment = require('./comment.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  // GET
  app.get('/api/comment/:commentId', comment.getCommentById)

  // POST
  app.post('/api/blog/:blogId/comment', auth.isAuthenticated, comment.postComment)

  // PUT
  app.put('/api/comment/:commentId', auth.isAuthorized('comment'), comment.putComment)

  // DELETE
  app.delete('/api/comment/:commentId', auth.isAuthorized('comment'), comment.deleteComment)

  // PARAM
  app.param('commentId', comment.paramComment)
  app.param('blogId', comment.paramBlog)
}
