module.exports = seed
var mongoose = require('mongoose')
var User = mongoose.model('users', require('../server/modules/users/users.model.js'))
var Blog = mongoose.model('blog', require('../server/modules/blog/blog.model.js'))
var users = require('./data/users.js')()

User.schema.set('strict', false)

// Create mongo document if it doesn't already exist and return the doc.
var documentOptions = {upsert: true, new: true}

mongoose.promise = Promise

if (!module.parent) {
  var settings = require('../configs/settings.js').get()
  require('../server/db.js')({settings: settings})
  seed().then(process.exit)
}

async function seed (cb) {
  if (/test|e2e/.test(process.env.NODE_ENV)) {
    try {
      await User.find({}).remove()
      console.log('Deleted all test users')
      await Blog.find({}).remove()
      console.log('Deleted all test blog entries')
    } catch (e) {
      console.log('Error deleting test users and blog entries', e)
    }
  }

  try {
    var userPromises = []
    var blogPromises = []

    users.forEach(function (user) {
      user._id = mongoose.Types.ObjectId()
      var userPromise = User.findOneAndUpdate({email: user.email}, user, documentOptions)
      userPromises.push(userPromise)
    })
    var seededUsers = await Promise.all(userPromises)
    console.log('Seeded', seededUsers.length, 'users')

    var blogs = require('./data/blogs.js')(seededUsers)

    blogs.forEach(function (blog) {
      blog._id = mongoose.Types.ObjectId()
      var blogPromise = Blog.findOneAndUpdate({title: blog.title}, blog, documentOptions)
      blogPromises.push(blogPromise)
    })
    var seededBlogs = await Promise.all(blogPromises)
    console.log('Seeded', seededBlogs.length, 'blog entries')
  } catch (e) {
    if (e.message && e.message.includes("(immutable) field '_id'")) {
      console.log('Seeded documents already exist in the database')
    } else {
      console.error('Error seeding database:', e)
    }
  }

  return {
    users: seededUsers,
    blogEntries: seededBlogs
  }
}
