const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

// GET an admin by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json({
      username: admin.username,
      permissions: admin.permissions
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Add a new admin
router.post('/add', async (req, res) => {
  const { username, password, permissions } = req.body;
  try {
    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Admin with this username already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const hashBuffer = Buffer.from(hash, 'utf8');
    const newAdmin = new Admin({ username, password: hashBuffer, permissions });
    await newAdmin.save();
    return res.json({ message: 'New Admin added successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update admin permissions
router.put('/:username/permissions', async (req, res) => {
  const { username } = req.params;
  const { permissions } = req.body;
  try {
    const admin = await Admin.findOneAndUpdate(
      { username },
      { permissions, updatedAt: new Date() },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json({ message: 'Permissions updated successfully!', admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
