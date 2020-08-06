const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  // creator: {admin},
});

module.exports = mongoose.model('Blog', blogSchema);
