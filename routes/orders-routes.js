const express = require('express');
const { check } = require('express-validator');

const ordersControllers = require('../controllers/orders-controllers');

const router = express.Router();

router.get('/', ordersControllers.getOrders);

router.post(
  '/',
  [
    check('productName').not().isEmpty(),
    check('orderDate').not().isEmpty(),
    check('price').not().isEmpty(),
    check('status').not().isEmpty(),
    check('checkOutData.totalAmountPaid').not().isEmpty(),
    check('checkOutData.email').not().isEmpty(),
    check('checkOutData.firstName').not().isEmpty(),
    check('checkOutData.lastName').not().isEmpty(),
    check('checkOutData.country').not().isEmpty(),
    check('checkOutData.state').not().isEmpty(),
    check('checkOutData.city').not().isEmpty(),
    check('checkOutData.phone').not().isEmpty(),
  ],

  ordersControllers.createOrder
);

router.patch(
  '/:oid',
  [check('status').not().isEmpty()],
  ordersControllers.updateOrder
);

router.delete('/:oid', ordersControllers.deleteOrder);

module.exports = router;
