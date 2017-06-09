var mongoose = require('mongoose')

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
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: 'blogs'
  }
})

module.exports = CommentSchema
