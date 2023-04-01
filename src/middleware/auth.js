const jwt = require('jsonwebtoken');
const Register = require('../models/registers');

const auth = async (req, res, next) => {
  try {
    const token = await req.cookies.jwt;
    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyUser);
    const user = await Register.findOne({ _id: verifyUser._id });
    // console.log(user);

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'User not logged in' });
  }
};

module.exports = auth;
