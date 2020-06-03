const mongoose = require('mongoose');

module.exports = mongoose.model('Set', new mongoose.Schema({
   title: { type: String, required: true }
}));
