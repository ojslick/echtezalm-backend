const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Collection = require('../models/collection');

const getCollection = async (req, res, next) => {
  let collection;

  try {
    collection = await Collection.find();
  } catch (err) {
    return next(
      new HttpError('Fetching collection failed, please try again later.', 500)
    );
  }

  if (!collection) {
    const error = new HttpError('Could not find collection', 404);

    return next(error);
  }

  res.json({
    collection: collection.map((collection) =>
      collection.toObject({ getters: true })
    ),
  });
};

const getCollectionById = async (req, res, next) => {
  const collectionId = req.params.cid;

  let collection;

  try {
    collection = await Collection.findById(collectionId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a product.',
      500
    );
    return next(error);
  }

  if (!collection) {
    const error = new HttpError('Could not find collection', 404);

    return next(error);
  }

  res.json({ collection: collection.toObject({ getters: true }) });
};

const createCollection = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, pieces, description, price, highlight } = req.body;

  const createdCollection = new Collection({
    name,
    pieces,
    description,
    price,
    highlight,
  });

  try {
    await createdCollection.save();
  } catch (err) {
    const error = new HttpError(
      'Creating collection failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ collection: createdCollection });
};

const updateCollection = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const collectionId = req.params.cid;
  const { name, pieces, description, price, highlight } = req.body;

  let updateCollection;

  try {
    updateCollection = await Collection.findById(collectionId);
  } catch (err) {
    const error = new HttpError(
      'Could not find a collection for the provided id.',
      500
    );

    return next(error);
  }

  if (!updateCollection) {
    const error = new HttpError(
      'Could not find collection with the provided id',
      404
    );

    return next(error);
  }

  updateCollection.name = name;
  updateCollection.pieces = pieces;
  updateCollection.description = description;
  updateCollection.price = price;
  updateCollection.highlight = highlight;

  try {
    await updateCollection.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update collection.',
      500
    );

    return next(error);
  }

  res
    .status(200)
    .json({ collection: updateCollection.toObject({ getters: true }) });
};

const deleteCollection = async (req, res, next) => {
  const collectionId = req.params.cid;

  let collection;

  try {
    collection = await Collection.findById(collectionId);
  } catch (err) {
    const error = new HttpError(
      'Could not find a collection for the provided id.',
      500
    );

    return next(error);
  }

  if (!collection) {
    const error = new HttpError(
      'Could not find collection with the provided id',
      404
    );

    return next(error);
  }

  try {
    collection.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete collection.',
      500
    );

    return next(error);
  }

  res.json({ message: 'Collection Deleted' });
};

exports.getCollection = getCollection;
exports.getCollectionById = getCollectionById;
exports.createCollection = createCollection;
exports.updateCollection = updateCollection;
exports.deleteCollection = deleteCollection;
