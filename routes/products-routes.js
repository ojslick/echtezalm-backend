const express = require('express');
const { check } = require('express-validator');

const productControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/', productControllers.getProducts);

router.get('/:pid', productControllers.getProduct);

router.post(
  '/',
  [
    check('name').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('highlight').not().isEmpty(),
  ],
  productControllers.createProduct
);

router.patch(
  '/:pid',
  [
    check('name').not().isEmpty(),
    check('price').not().isEmpty(),
    check('description').not().isEmpty(),
    check('highlight').not().isEmpty(),
  ],
  productControllers.updateProduct
);

router.delete('/:pid', productControllers.deleteProduct);

module.exports = router;
