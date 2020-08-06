const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productName: { type: String, required: true },
  orderDate: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  checkOutData: { type: Object, required: true },
  // creator: {admin},
});

module.exports = mongoose.model('Order', orderSchema);
