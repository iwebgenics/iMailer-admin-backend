const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Subadmin = require('../models/Subadmin');

// auth.js (backend)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Admin.findOne({ username });
    let role = 'admin';
    if (!user) {
      user = await Subadmin.findOne({ username });
      role = 'subadmin';
    }
    if (!user) {
      return res.status(404).json({ message: 'Username does not exist' });
    }

    // Convert stored Buffer to string for bcrypt comparison
    const storedHash = user.password.toString('utf8');
    const match = await bcrypt.compare(password, storedHash);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Return minimal user data including permissions
    return res.json({
      message: 'Login success',
      user: {
        username: user.username,
        role,
        permissions: user.permissions // e.g. { add_employee: true, add_admin: true, ... }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
