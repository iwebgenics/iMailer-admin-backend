const express = require('express');
const router = express.Router();
const Passkey = require('../models/Passkey');

// Generate a passkey
router.post('/generate', async (req, res) => {
  const { passkey } = req.body; // Alternatively, generate it server-side
  try {
    const newPasskey = new Passkey({ passkey, is_used: false });
    await newPasskey.save();
    return res.json({ message: 'Passkey generated successfully!', passkey });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
