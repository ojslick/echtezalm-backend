const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: { type: String, required: true },
  pieces: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  highlight: { type: String, required: true },
  // creator: {admin},
});

module.exports = mongoose.model('Collection', collectionSchema);
