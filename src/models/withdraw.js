const mongoose = require('mongoose');
const WithdrawSchema = new mongoose.Schema({
  phone: { type: String, default: 0, required: true },
  amount: { type: String, default: 0, required: true },
});
const Withdraw = new mongoose.model('Withdraw', WithdrawSchema);
module.exports = Withdraw;
