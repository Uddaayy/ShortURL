// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // Hashed
});

module.exports = mongoose.model('User', userSchema);















