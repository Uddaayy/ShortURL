const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // 🔄 Made optional
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Click', clickSchema);
