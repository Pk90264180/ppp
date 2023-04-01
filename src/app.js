const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Register = require('./models/registers');
const Recharge = require('./models/recharge.js');
const Alert = require('./models/alerts');
require('./db/conn');
const Withdraw = require('./models/withdraw');
const auth = require('./middleware/auth');
const bodyParser = require('body-parser');

app.use(express.json());
// const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts[0]);
    // console.log(alerts[0]);
    const obj1 = alerts[0];
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElem) => {
      return currElem.token !== req.token;
    });
    res.clearCookie('jwt');
    res.render('login');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/', (req, res) => {
  res.send('hi this is my homepage');
});

app.post('/logoutall', async (req, res) => {
  try {
    const phone = req.body.phone;
    if (phone) {
      // Find the relevant Register document by phone number
      const register = await Register.findOne({ phone: phone });

      if (register) {
        register.tokens = [];
        await register.save();
        res.status(200).send('Logged out successfully');
      } else {
        res.status(404).send('Register not found');
      }
    } else {
      res.status(400).send('Missing phone information');
    }
  } catch (err) {
    res.status(500).send('Error logging out');
    console.log(err);
  }
});

app.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const referralId = req.body.referral;

      // Check if there's a user with the given referral ID
      const referredUser = await Register.findOne({
        YourReferralId: referralId,
      });

      if (referredUser) {
        // If a user with the referral ID is found, update their YourReferrals field by 1
        referredUser.YourReferrals += 1;
        await referredUser.save();

        // Set the amount to 25
        const registerEmployee = new Register({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          referral: req.body.referral,
          amount: 25,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
        });

        // password hashing
        const token = await registerEmployee.generateAuthToken();
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 30000000),
          httpOnly: true,
        });

        const registered = await registerEmployee.save();
        res.status(200).send('registration successful');
      } else {
        // If no user is found with the referral ID, set the amount to 0
        const registerEmployee = new Register({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          referral: req.body.referral,
          amount: 0,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
          tandc: req.body.tandc,
        });

        // password hashing
        const token = await registerEmployee.generateAuthToken();
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 30000000),
          httpOnly: true,
        });

        const registered = await registerEmployee.save();
        res.status(200).send('registration successful');
      }
    } else {
      res.send('passwords are not matching');
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const phone = req.body.phone;
    const password = req.body.password;
    const user = await Register.findOne({ phone: phone });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 300000000),
      httpOnly: true,
    });
    console.log(req.body);

    if (isMatch) {
      const userData = {
        name: user.name,
        email: user.email,
      };
      res.status(200).end();
      console.log('user logged in ');
    } else {
      res.status(401).send('invalid login details');
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get('/user', async (req, res) => {
  try {
    const registers = await Register.find();
    res.json(registers);
    function findObjectsByPhone(arr, phoneVal) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].phone === phoneVal) {
          result.push(arr[i]);
        }
      }
      return result;
    }

    let matchingObjects = findObjectsByPhone(registers, 9998);
    // console.log(matchingObjects[0].amount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/recharge', async (req, res) => {
  try {
    const amount = req.body.amount;
    const phone = req.body.phone;
    const utrid = req.body.utrid;
    console.log(req.body);

    if (amount && phone) {
      // Find any existing Recharge document with the same utrid
      const existingRecharge = await Recharge.findOne({ utrid: utrid });

      if (existingRecharge) {
        res.status(400).send('UTR ID already exists');
      } else {
        // Create a new Recharge document with the provided information
        const rechargeOK = new Recharge({
          phone: phone,
          amount: amount,
          utrid: utrid,
        });

        // Save the new Recharge document
        const registered = await rechargeOK.save();
        res.status(200).send('Amount paid successfully');
      }
    } else {
      res.status(400).send('Missing amount or phone information');
    }
  } catch (error) {
    res.status(500).send('Error paying amount');
    console.log(error);
  }
});

app.post('/withdraw', async (req, res) => {
  try {
    const amount = req.body.amount;
    const phone = req.body.phone;
    console.log(req.body);

    if (amount && phone) {
      // retrieve all existing documents from the Register model
      const recharges = await Withdraw.find({});

      const rechargeOK = new Withdraw({
        phone: phone,
        amount: amount,
      });
      const registered = await rechargeOK.save();
      // console.log(rechargeOK)
      res.status(200).send('amount paid successfully');
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

app.patch('/bank', async (req, res) => {
  try {
    const account = req.body.account;
    const ifsc = req.body.ifsc;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    console.log(req.body);
    if (account && ifsc && name && email) {
      // Find the relevant Register document by email
      const register = await Register.findOne({ phone: phone });

      // Update the bank field with the new values
      if (register) {
        register.bank = {
          account: account,
          ifsc: ifsc,
          name: name,
          email: email,
        };
      } else {
        // Create a new Register document with the provided email and bank data
        const register = new Register({
          bank: {
            account: account,
            ifsc: ifsc,
            name: name,
            phone: phone,
            email: email,
          },
        });
      }

      // Save the updated or new Register document
      const savedRegister = await register.save();

      res.status(200).send('Bank information saved successfully');
    } else {
      res.status(400).send('Missing required bank information');
    }
  } catch (error) {
    res.status(500).send('Error saving bank information');
    console.log(error);
  }
});

app.patch('/plan', async (req, res) => {
  try {
    const plan = req.body.plan;
    const phone = req.body.phone;

    console.log(req.body);
    if (plan && phone) {
      // Find the relevant Register document by phone number
      const register = await Register.findOne({ phone: phone });

      // Update the plan field with the new value
      if (register) {
        register.plan = plan;
        if (plan === 1) {
          // Decrease the recharge value by 205
          register.recharge -= 205;
        }
        if (plan === 2) {
          // Decrease the recharge value by 205
          register.recharge -= 700;
        }
        if (plan === 3) {
          // Decrease the recharge value by 205
          register.recharge -= 1300;
        }
        await register.save();
        res.status(200).send('Plan bought successfully');
      } else {
        res.status(404).send('Register not found');
      }
    } else {
      res.status(400).send('Missing plan or phone information');
    }
  } catch (error) {
    res.status(500).send('Error buying plan');
    console.log(error);
  }
});

app.patch('/time', async (req, res) => {
  try {
    const time = req.body.time;
    const phone = req.body.phone;

    console.log(req.body);
    if (time && phone) {
      // Find the relevant Register document by phone number
      const register = await Register.findOne({ phone: phone });

      // Update the time field with the new value
      if (register) {
        register.plantime = time;
        await register.save();
        res.status(200).send('time bought successfully');
      } else {
        res.status(404).send('Register not found');
      }
    } else {
      res.status(400).send('Missing time or phone information');
    }
  } catch (error) {
    res.status(500).send('Error buying time');
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`connection is setup at "http://localhost:${PORT}"`);
});
