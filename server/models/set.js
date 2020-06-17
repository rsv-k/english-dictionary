const mongoose = require('mongoose');

module.exports = mongoose.model(
   'Set',
   new mongoose.Schema({
      title: { type: String, required: true },
      ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
   })
);
