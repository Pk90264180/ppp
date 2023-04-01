const mongoose = require('mongoose');
const RechargesSchema = new mongoose.Schema({
  phone: { type: String, default: 0, required: true },
  amount: { type: String, default: 0, required: true },
  utrid: { type: String, default: 0, required: false },
});
const Recharge = new mongoose.model('Recharge', RechargesSchema);
module.exports = Recharge;
