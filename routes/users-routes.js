const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/register',
  [
    check('voornaam').not().isEmpty(),
    check('achternaam').not().isEmpty(),
    check('country').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check(
      'password',
      'Min 8 char long, At least one uppercase, At least one lower case and at least one special character'
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, 'i'),
  ],
  usersController.register
);

router.post('/login', usersController.login);

module.exports = router;
