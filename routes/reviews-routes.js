const express = require('express');
const { check } = require('express-validator');

const reviewControllers = require('../controllers/reviews-controllers');

const router = express.Router();

router.get('/', reviewControllers.getReviews);

router.get('/user/:uid', reviewControllers.getCustomerReviews);

router.get('/product/:pid', reviewControllers.getProductReviews);

router.post(
  '/',
  [check('review').not().isEmpty()],
  reviewControllers.createReview
);

router.patch(
  '/:rid',
  [check('review').not().isEmpty()],
  reviewControllers.updateReview
);

router.delete('/:rid', reviewControllers.deleteReview);

module.exports = router;
