const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Product = require('../models/product');

const getProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find products.', 404);

    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a product.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      'Could not find a product for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, price, description, highlight } = req.body;

  const createdProduct = new Product({
    name,
    price,
    description,
    highlight,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      'Creating product failed, please try again',
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const productId = req.params.pid;
  const { name, price, description, highlight } = req.body;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Could not find a product for the provided id.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.highlight = highlight;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );

    return next(error);
  }

  res.status(200).json({ message: 'Deleted product.' });
};

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
