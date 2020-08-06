const express = require('express');
const { check } = require('express-validator');

const blogsControllers = require('../controllers/blogs-controllers');

const router = express.Router();

router.get('/', blogsControllers.getBlogs);

router.get('/:bid', blogsControllers.getBlogById);

router.post(
  '/',
  [
    check('date').not().isEmpty(),
    check('title').not().isEmpty(),
    check('text').not().isEmpty(),
  ],
  blogsControllers.createBlog
);

router.patch(
  '/:bid',
  [
    check('date').not().isEmpty(),
    check('title').not().isEmpty(),
    check('text').not().isEmpty(),
  ],
  blogsControllers.updateBlog
);

router.delete('/:bid', blogsControllers.deleteBlog);

module.exports = router;
