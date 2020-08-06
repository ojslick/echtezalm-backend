const express = require('express');
const { check } = require('express-validator');

const collectionControllers = require('../controllers/collection-controllers');

const router = express.Router();

router.get('/', collectionControllers.getCollection);

router.get('/:cid', collectionControllers.getCollectionById);

router.post(
  '/',
  [
    check('name').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('highlight').not().isEmpty(),
    check('pieces').not().isEmpty(),
  ],
  collectionControllers.createCollection
);

router.patch(
  '/:cid',
  [
    check('name').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('highlight').not().isEmpty(),
    check('pieces').not().isEmpty(),
  ],
  collectionControllers.updateCollection
);

router.delete('/:cid', collectionControllers.deleteCollection);

module.exports = router;
