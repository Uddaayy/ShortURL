const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url' },
  timestamp: { type: Date, default: Date.now },
  ip: String,
  device: String,
  browser: String,
  os: String
});

module.exports = mongoose.model('Analytics', analyticsSchema);
