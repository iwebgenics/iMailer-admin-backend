const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  employee_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
