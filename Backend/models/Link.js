const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date },
  clicks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Link', linkSchema);
