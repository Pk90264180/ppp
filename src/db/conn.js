const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB =
  'mongodb+srv://sanjeshmanjesh1:bxajmp25a0@cluster0.y5k1xup.mongodb.net/hpc?retryWrites=true&w=majority';
  // 'mongodb://127.0.0.1:27017/hpc';

mongoose
  .connect(DB)
  .then(function () {
    console.log('Connected to MONGOD !!');
  })
  .catch(function (err) {
    console.log('Failed to establish connection with MONGOD !!');
    console.log(err);
  });
