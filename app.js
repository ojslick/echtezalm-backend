const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://distracted-lamport-e402f2.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', userRoutes);

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
    'mongodb://ojslick:Fb8XZpk5y9z2EnJF@cluster0-shard-00-00.sbbpk.mongodb.net:27017,cluster0-shard-00-01.sbbpk.mongodb.net:27017,cluster0-shard-00-02.sbbpk.mongodb.net:27017/echtezalm?ssl=true&replicaSet=atlas-bucdfc-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
