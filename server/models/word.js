const mongoose = require('mongoose');

module.exports = mongoose.model('Word', new mongoose.Schema({
   english: { type: String, required: true },
   russian: { type: [String], required: true },
   text: { type: String, required: false },
   pic_url: { type: String, required: false }
}));
