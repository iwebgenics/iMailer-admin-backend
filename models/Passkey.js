const mongoose = require('mongoose');

const PasskeySchema = new mongoose.Schema({
  passkey: { type: String, required: true },
  is_used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Passkey', PasskeySchema);
