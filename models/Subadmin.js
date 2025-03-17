const mongoose = require('mongoose');

const SubadminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  permissions: {
    add_employee: { type: Boolean, default: true },
    add_admin: { type: Boolean, default: false },
    show_employees: { type: Boolean, default: true },
    employee_stats: { type: Boolean, default: false },
    generate_key: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Subadmin', SubadminSchema);
