const mongoose = require('mongoose');

module.exports = mongoose.model('Word', new mongoose.Schema({
   english: { type: String, required: true },
   russian: { type: [String], required: true },
   text: { type: String, required: false },
   pic_url: { type: String, required: false },
   createdAt: { type: Date, default: Date.now },
   setId: { type: mongoose.Schema.Types.ObjectId, ref: 'Set', required: false },
   transcription: { type: String, required: false },
   sound_url: { type: String, required: false },
   toLearn: { type: Boolean, required: true }
}, { retainKeyOrder: true }));
