const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose.model(
   'User',
   new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      username: { type: String, required: true, unique: true }
   }).plugin(uniqueValidator)
);
