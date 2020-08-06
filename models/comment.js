const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: String, required: true },
  text: { type: String, required: true },
  like: { type: Number, required: true },
  dislike: { type: Number, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
