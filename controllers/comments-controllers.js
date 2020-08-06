const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Comment = require('../models/comment');

const getComments = async (req, res, next) => {
  let comments;

  try {
    comments = await Comment.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find comments.',
      500
    );

    return next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { firstName, lastName, date, text, like, dislike } = req.body;

  const createdComment = new Comment({
    firstName,
    lastName,
    date,
    text,
    like,
    dislike,
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError(
      'Could not create comment, please try again',
      500
    );

    return next(error);
  }

  res.status(201).json({ comment: createdComment.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  let comment;

  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find comment.',
      500
    );

    return next(error);
  }

  if (!comment) {
    const error = new HttpError(
      'Could not find comment with the provided id',
      404
    );

    return next(error);
  }

  try {
    comment.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete comment.',
      500
    );

    return next(error);
  }

  res.status(200).json({ message: 'Comment Deleted!!!' });
};

exports.getComments = getComments;
exports.createComment = createComment;
exports.deleteComment = deleteComment;
