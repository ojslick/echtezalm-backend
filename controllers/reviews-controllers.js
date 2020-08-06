const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Review = require('../models/reviews');

const getReviews = async (req, res, next) => {
  let reviews;

  try {
    reviews = await Review.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching reviews failed, please try again later.',
      500
    );

    return next(error);
  }

  if (!reviews) {
    const error = new HttpError('Could not find reviews', 404);

    return next(error);
  }

  res.json({
    reviews: reviews.map((review) => review.toObject({ getters: true })),
  });
};

const getCustomerReviews = async (req, res, next) => {};

const getProductReviews = async (req, res, next) => {};

const createReview = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { review } = req.body;

  const createdReview = new Review({ review });

  try {
    await createdReview.save();
  } catch (err) {
    const error = new HttpError(
      'Posting review failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ review: createdReview });
};

const updateReview = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { review } = req.body;
  const reviewId = req.params.rid;

  let updateReview;

  try {
    updateReview = await Review.findById(reviewId);
  } catch (err) {
    const error = new HttpError(
      'Could not find a review for the provided id.',
      500
    );

    return next(error);
  }

  if (!updateReview) {
    const error = new HttpError('Could not find review for this id.', 404);

    return next(error);
  }

  updateReview.review = review;

  try {
    await updateReview.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );

    return next(error);
  }

  res.status(200).json({ review: updateReview.toObject({ getters: true }) });
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.rid;

  let review;

  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete review.',
      500
    );

    return next(error);
  }

  if (!review) {
    const error = new HttpError('Could not find review for this id.', 404);

    return next(error);
  }

  try {
    await review.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete review.',
      500
    );

    return next(error);
  }

  res.status(200).json({ message: 'Review Deleted!!' });
};

exports.getReviews = getReviews;
exports.getCustomerReviews = getCustomerReviews;
exports.getProductReviews = getProductReviews;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
