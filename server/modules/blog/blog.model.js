var mongoose = require('mongoose')
var urlSlugs = require('mongoose-url-slugs')

var blogSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true
  }
})

blogSchema.plugin(urlSlugs('title'))

module.exports = blogSchema
