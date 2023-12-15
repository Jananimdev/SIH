// model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phno: String,
  aadharNumber: String,
  isAdmin:Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
