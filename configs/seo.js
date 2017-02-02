/* eslint-disable no-template-curly-in-string */
var _ = require('lodash')
module.exports = {
  '/': {
    title: 'Meangular'
  },
  '/404': {
    title: 'Page Not Found'
  },
  '/500': {
    title: 'Server Side Error'
  },
  '/login': {
    title: 'Login to Meangular'
  },
  '/signup': {
    title: 'Signup for Meangular'
  },
  '/account': {
    title: '<%= user.profile.name %> Account'
  },
  '/forgot': {
    title: 'Forgot Your Password '
  },
  '/reset/': {
    title: 'reset '
  },
  '/blog/create': {
    title: 'Create a New Blog'
  },
  '/blog/edit/': {
    title: 'Edit Your Blog'
  },
  '/blog/list': {
    title: 'Blog List'
  },
  '/blog/view/:id': {
    title: '<%=  blog.title  %> -  <%=  blog.user.profile.name %> ',
    keywords: '<%=  blog.tags  %>',
    description: '<%=  blog.content  %> ',
    ogUrl: '<%=  path  %>',
    twitterUrl: '<%=  path  %>',
    canonical: '<%=  path  %>',
    ogTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    twitterTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    ogDescription: '<%=  blog.content  %> ',
    twitterDescription: '<%=  blog.content  %> ',
    hook: function (self, data, cb) {
      data.blog = {
        tags: ['Add', 'Tags', 'To Blog', 'Mean Stack JS']
      }
      self.models.blog.findOne({_id: data.params.id}).populate('user').then(function (blog) {
        data.blog = _.merge(data.blog, blog)
        cb(null, data)
      }).catch(function (err) {
        cb(err)
      })
    }
  }
}
