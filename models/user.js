const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  voornaam: { type: String, required: true },
  achternaam: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

module.exports = mongoose.model('User', userSchema);
