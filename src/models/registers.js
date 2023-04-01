require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  recharge: {
    type: Number,
    default: 0.0,
    required: false,
  },
  alertme: {
    type: Number,
    default: 1,
  },
  alertwithdraw: {
    type: Number,
    default: 1,
  },
  alertrecharge: {
    type: Number,
    default: 1,
  },
  alertrechargeupi: {
    type: Number,
    default: 1,
  },
  alertbank: {
    type: Number,
    default: 1,
  },
  alertrefer: {
    type: Number,
    default: 1,
  },
  withdraws: { type: Number, default: 0 },
  upi: {
    type: Number,
    default: 1,
  },
  referral: {
    type: String,
    default: 0,
    required: false,
  },
  YourReferrals: {
    type: Number,
    default: 0,
    unique: false,
  },
  agree: {
    type: Boolean,
    default: true,
  },
  YourReferralId: {
    type: Number,
    unique: false,
    default: () => {
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      return Number(dd + hh + mm + ss);
    },
  },
  bank: {
    account: { type: Number },
    ifsc: { type: String },
    name: { type: String },
    email: { type: String },
  },
  withdrawalsamount1: {
    type: String,
    default: 'no',
  },
  withdrawalstime1: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus1: {
    type: String,
    default: 'no',
  },
  withdrawalsamount2: {
    type: String,
    default: 'no',
  },
  withdrawalstime2: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus2: {
    type: String,
    default: 'no',
  },
  withdrawalsamount3: {
    type: String,
    default: 'no',
  },
  withdrawalstime3: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus3: {
    type: String,
    default: 'no',
  },
  withdrawalsamount4: {
    type: String,
    default: 'no',
  },
  withdrawalstime4: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus4: {
    type: String,
    default: 'no',
  },
  withdrawalsamount5: {
    type: String,
    default: 'no',
  },
  withdrawalstime5: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus5: {
    type: String,
    default: 'no',
  },
  withdrawalsamount6: {
    type: String,
    default: 'no',
  },
  withdrawalstime6: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus6: {
    type: String,
    default: 'no',
  },
  withdrawalsamount7: {
    type: String,
    default: 'no',
  },
  withdrawalstime7: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus7: {
    type: String,
    default: 'no',
  },
  withdrawalsamount8: {
    type: String,
    default: 'no',
  },
  withdrawalstime8: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus8: {
    type: String,
    default: 'no',
  },
  withdrawalsamount9: {
    type: String,
    default: 'no',
  },
  withdrawalstime9: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus9: {
    type: String,
    default: 'no',
  },
  withdrawalsamount10: {
    type: String,
    default: 'no',
  },
  withdrawalstime10: {
    type: String,
    default: 'no',
  },
  withdrawalsstatus10: {
    type: String,
    default: 'no',
  },

  refferamountamount1: {
    type: String,
    default: 'no',
  },
  refferamounttime1: {
    type: String,
    default: 'no',
  },
  refferamountname1: {
    type: String,
    default: 'no',
  },
  refferamountamount2: {
    type: String,
    default: 'no',
  },
  refferamounttime2: {
    type: String,
    default: 'no',
  },
  refferamountname2: {
    type: String,
    default: 'no',
  },
  refferamountamount3: {
    type: String,
    default: 'no',
  },
  refferamounttime3: {
    type: String,
    default: 'no',
  },
  refferamountname3: {
    type: String,
    default: 'no',
  },
  refferamountamount4: {
    type: String,
    default: 'no',
  },
  refferamounttime4: {
    type: String,
    default: 'no',
  },
  refferamountname4: {
    type: String,
    default: 'no',
  },
  refferamountamount5: {
    type: String,
    default: 'no',
  },
  refferamounttime5: {
    type: String,
    default: 'no',
  },
  refferamountname5: {
    type: String,
    default: 'no',
  },
  refferamountamount6: {
    type: String,
    default: 'no',
  },
  refferamounttime6: {
    type: String,
    default: 'no',
  },
  refferamountname6: {
    type: String,
    default: 'no',
  },
  refferamountamount7: {
    type: String,
    default: 'no',
  },
  refferamounttime7: {
    type: String,
    default: 'no',
  },
  refferamountname7: {
    type: String,
    default: 'no',
  },
  refferamountamount8: {
    type: String,
    default: 'no',
  },
  refferamounttime8: {
    type: String,
    default: 'no',
  },
  refferamountname8: {
    type: String,
    default: 'no',
  },
  refferamountamount9: {
    type: String,
    default: 'no',
  },
  refferamounttime9: {
    type: String,
    default: 'no',
  },
  refferamountname9: {
    type: String,
    default: 'no',
  },
  refferamountamount10: {
    type: String,
    default: 'no',
  },
  refferamounttime10: {
    type: String,
    default: 'no',
  },
  refferamountname10: {
    type: String,
    default: 'no',
  },
  plan: {
    type: Number,
    default: 0,
  },
  plantime: {
    type: String,
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

employeeSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
};

employeeSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = this.confirmpassword;
  }
  next();
});

const Register = new mongoose.model('Register', employeeSchema);
module.exports = Register;
