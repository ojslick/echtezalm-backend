const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Subscription = require('../models/subscription');
const { json } = require('body-parser');

const getSubscriptions = async (req, res, next) => {
  let subscriptions;

  try {
    subscriptions = await Subscription.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not fetch subscriptions.',
      500
    );

    return next(error);
  }

  if (!subscriptions) {
    const error = new HttpError('Could not find subscriptions', 404);

    return next(error);
  }

  res.json({
    subscriptions: subscriptions.map((subscription) =>
      subscription.toObject({ getters: true })
    ),
  });
};

const getSubscriptionById = async (req, res, next) => {
  const subscriptionId = req.params.sid;

  let subscription;

  try {
    subscription = await Subscription.findById(subscriptionId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find subscription',
      500
    );

    return next(error);
  }

  if (!subscription) {
    const error = new HttpError(
      'Could not find subscription with the provide id',
      404
    );

    return next(error);
  }

  res.json({ subscription: subscription.toObject({ getters: true }) });
};

const createSubscription = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {
    creationDate,
    plan,
    duration,
    expiryStatus,
    deliveryStatus,
    checkOutData,
  } = req.body;

  const createdSubscription = new Subscription({
    creationDate,
    plan,
    duration,
    expiryStatus,
    deliveryStatus,
    checkOutData,
  });

  try {
    await createdSubscription.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create subscription.',
      500
    );

    return next(error);
  }

  res
    .status(201)
    .json({ subscription: createdSubscription.toObject({ getters: true }) });
};

const updateSubscription = (req, res, next) => {};

const deleteSubscription = async (req, res, next) => {
  const subscriptionId = req.params.sid;

  let subscription;

  try {
    subscription = await Subscription.findById(subscriptionId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Subscription',
      500
    );

    return next(error);
  }

  if (!subscription) {
    const error = new HttpError(
      'Could not find subscription for the provided id',
      404
    );

    return next(error);
  }

  try {
    subscription.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Subscription',
      500
    );

    return next(error);
  }

  res.status(200).json({ message: 'Subscription deleted!!!' });
};

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionById = getSubscriptionById;
exports.createSubscription = createSubscription;
exports.updateSubscription = updateSubscription;
exports.deleteSubscription = deleteSubscription;
