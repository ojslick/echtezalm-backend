const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/users-routes');
const productRoutes = require('./routes/products-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const collectionRoutes = require('./routes/collection-routes');
const blogRoutes = require('./routes/blogs-routes');
const orderRoutes = require('./routes/orders-routes');
const commentRoutes = require('./routes/comments-routes');
const subscriptionRoutes = require('./routes/subscriptions-routes');

const HttpError = require('./models/http-error');

app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/reviews', reviewsRoutes);

app.use('/api/collection', collectionRoutes);

app.use('/api/blogs', blogRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/comments', commentRoutes);

app.use('/api/subscriptions', subscriptionRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.sbbpk.mongodb.net:27017,cluster0-shard-00-01.sbbpk.mongodb.net:27017,cluster0-shard-00-02.sbbpk.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-bucdfc-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
