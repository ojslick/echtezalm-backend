const express = require('express');
const { check } = require('express-validator');

const subscriptionControllers = require('../controllers/subscriptions-controllers');

const router = express.Router();

router.get('/', subscriptionControllers.getSubscriptions);

router.get('/:sid', subscriptionControllers.getSubscriptionById);

router.post(
  '/',
  [
    check('plan').not().isEmpty(),
    check('duration').not().isEmpty(),
    check('expiryStatus').not().isEmpty(),
    check('deliveryStatus').not().isEmpty(),
    check('creationDate').not().isEmpty(),
    check('checkOutData.shippingFee').not().isEmpty(),
    check('checkOutData.paymentMethod').not().isEmpty(),
    check('checkOutData.totalAmountPaid').not().isEmpty(),
    check('checkOutData.amount').not().isEmpty(),
    check('checkOutData.email').not().isEmpty(),
    check('checkOutData.firstName').not().isEmpty(),
    check('checkOutData.lastName').not().isEmpty(),
    check('checkOutData.country').not().isEmpty(),
    check('checkOutData.state').not().isEmpty(),
    check('checkOutData.city').not().isEmpty(),
    check('checkOutData.phone').not().isEmpty(),
  ],
  subscriptionControllers.createSubscription
);

router.patch('/:sid', subscriptionControllers.updateSubscription);

router.delete('/:sid', subscriptionControllers.deleteSubscription);

module.exports = router;
