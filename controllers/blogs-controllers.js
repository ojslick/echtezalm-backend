const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Blog = require('../models/blog');

const getBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching blogs failed, please try again later.',
      500
    );

    return next(error);
  }

  if (!blogs) {
    const error = new HttpError('Could not find reviews', 404);

    return next(error);
  }

  res.json({ blogs: blogs.map((blog) => blog.toObject({ getters: true })) });
};

const getBlogById = async (req, res, next) => {
  const blogId = req.params.bid;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find blog',
      500
    );

    return next(error);
  }

  if (!blog) {
    const error = new HttpError(
      'Could not find a blog with the provided id.',
      404
    );

    return next(error);
  }

  res.json({ blog: blog.toObject({ getters: true }) });
};

const createBlog = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { date, title, text } = req.body;

  const createdBlog = new Blog({
    date,
    title,
    text,
  });

  try {
    await createdBlog.save();
  } catch (err) {
    const error = new HttpError('Creating blog failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ blog: createdBlog });
};

const updateBlog = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const blogId = req.params.bid;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!blog) {
    const error = new HttpError(
      'Could not find a blog with the provided id.',
      404
    );

    return next(error);
  }

  const { date, title, text } = req.body;

  blog.date = date;
  blog.title = title;
  blog.text = text;

  try {
    blog.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );

    return next(error);
  }

  res.status(200).json({ blog: blog.toObject({ getters: true }) });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete blog.',
      500
    );

    return next(error);
  }

  if (!blog) {
    const error = new HttpError(
      'Could not find blog with the provide id.',
      404
    );

    return next(error);
  }

  try {
    await blog.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete blog.',
      500
    );

    return next(error);
  }

  res.status(200).json({ message: 'Blog Deleted!!' });
};

exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
