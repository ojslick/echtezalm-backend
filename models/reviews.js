const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  review: { type: String, required: true },
});

module.exports = mongoose.model('Review', productsSchema);
