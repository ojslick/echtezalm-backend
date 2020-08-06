const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Order = require('../models/order');

const getOrders = async (req, res, next) => {
  let orders;

  try {
    orders = await Order.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find orders.',
      500
    );

    return next(error);
  }

  if (!orders) {
    const error = new HttpError('Could not find orders', 404);

    return next(error);
  }

  res.json({
    orders: orders.map((order) => order.toObject({ getters: true })),
  });
};

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { productName, orderDate, price, status, checkOutData } = req.body;

  const createdOrder = new Order({
    productName,
    orderDate,
    price,
    status,
    checkOutData,
  });

  try {
    await createdOrder.save();
  } catch (err) {
    const error = new HttpError(
      'Could not create Order, please try again',
      500
    );

    return next(error);
  }

  res.status(201).json({ order: createdOrder });
};

const updateOrder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const orderId = req.params.oid;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find order',
      500
    );

    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      'Could not find order with the provided id',
      404
    );

    return next(error);
  }

  const { status } = req.body;

  order.status = status;

  try {
    order.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update order.',
      500
    );

    return next(error);
  }

  res.status(200).json({ order: order.toObject({ getters: true }) });
};

const deleteOrder = async (req, res, next) => {
  const orderId = req.params.oid;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find order',
      500
    );

    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      'Could not find order with the provided id',
      404
    );

    return next(error);
  }

  try {
    await order.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete order.',
      500
    );

    return next(error);
  }
  res.status(200).json({ message: 'order deleted' });
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
