var mongoose = require('mongoose')
var urlSlugs = require('mongoose-url-slugs')

var CommentSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
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

module.exports = CommentSchema