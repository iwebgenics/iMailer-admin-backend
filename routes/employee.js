const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

// Add an employee
router.post('/add', async (req, res) => {
  const { email, password, employee_id } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const hashBuffer = Buffer.from(hash, 'utf8');
    const newEmployee = new Employee({ email, password: hashBuffer, employee_id });
    await newEmployee.save();
    return res.json({ message: 'Employee added successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Employee.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      return res.json({ message: 'Employee deleted successfully!' });
    }
    return res.status(404).json({ message: 'Employee not found' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
