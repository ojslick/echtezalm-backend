const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  creationDate: { type: Date, required: true },
  plan: { type: String, required: true },
  duration: { type: Number, required: true },
  expiryStatus: { type: Number, required: true },
  deliveryStatus: { type: String, required: true },
  checkOutData: { type: Object, required: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
