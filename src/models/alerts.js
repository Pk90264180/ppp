const mongoose = require('mongoose');
const AlertSchema = new mongoose.Schema({
  withdraw: { type: String },
  recharge: { type: String },
  bank: { type: String },
  rechargeupi: { type: String },
  me: { type: String },
  refer: { type: String },
  refer2: { type: String },
  upi1: { type: String },
  upi2: { type: String },
  withdraw2: { type: String },
  recharge2: { type: String },
  bank2: { type: String },
  rechargeupi2: { type: String },
  price1: { type: Number, default: 205 },
  price2: { type: Number, default: 700 },
  price3: { type: Number, default: 1300 },
  dailypayout1: { type: Number, default: 45 },
  dailypayout2: { type: Number, default: 100 },
  dailypayout3: { type: Number, default: 190 },
  validity1: { type: Number, default: 28 },
  validity2: { type: Number, default: 31 },
  validity3: { type: Number, default: 40 },
  refurl:{type:String, default:"http://www.google.com"}
});
const Alert = new mongoose.model('Alert', AlertSchema);
module.exports = Alert;
