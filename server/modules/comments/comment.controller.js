var auto = require('run-auto')
var mongoose = require('mongoose')
var comments = mongoose.model('comment')
var _ = require('lodash')
var debug = require('debug')('meanstackjs:blog')


exports.getCommentById = function (req, res, next) {
  debug('start getCommentById')
  res.send(req.comment)
  debug('end getCommentById')
}

exports.postComment = function (req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  req.blog.comments.push(req.body)

  req.blog.save(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}

exports.putComment = function (req, res, next) {
  console.log('req', req)
  req.comment = _.merge(req.comment, req.body)
  req.comment.user = req.user._id
  req.comment.save(function (err) {
    if (err) return next(err)
    return res.status(200).send(req.comment)
  })
}

exports.deleteComment = function (req, res, next) {
  req.comment.remove(function (err) {
    if (err) return next(err)
    res.status(204).send()
  })
}

exports.paramComment = function (req, res, next, id) {
  debug('start paramComment')

  req.assert('commentId', 'Your Comment ID cannot be blank').notEmpty()
  req.assert('commentId', 'Your Comment ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }

  auto({
    comments: function (cb) {
      comments
        .findOne({_id: id})
        .populate('user')
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.comment = results.comments
    console.log(results.comments)
    debug('end paramComment')
    next()
  })
}

exports.paramBlog = require('../blog/blog.controller').paramBlog