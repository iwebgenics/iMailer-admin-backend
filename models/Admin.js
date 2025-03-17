// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  permissions: {
    add_employee: { type: Boolean, default: true },
    add_admin: { type: Boolean, default: true },
    show_employees: { type: Boolean, default: true },
    employee_stats: { type: Boolean, default: true },
    generate_key: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// The third argument "admin" tells Mongoose to use exactly the "admin" collection:
module.exports = mongoose.model('Admin', AdminSchema, 'admin');
