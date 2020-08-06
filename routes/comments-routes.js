const express = require('express');
const { check } = require('express-validator');

const commentControllers = require('../controllers/comments-controllers');

const router = express.Router();

router.get('/', commentControllers.getComments);

router.post(
  '/',
  [
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('date').not().isEmpty(),
    check('text').not().isEmpty(),
  ],
  commentControllers.createComment
);

router.delete('/:cid', commentControllers.deleteComment);

module.exports = router;
