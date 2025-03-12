// models/Demo.js
const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
  user_id: String,     // e.g. the employee's email
  auth_email: String,  // or "N/A"
  work: {
    emails_sent: Object,
    emails_failed: Object,
    emails_spam: Object,
    emails_bounce: Object,
    sent_emails: Object,
    failed_emails: Object,
    spam_emails: Object,
    bounced_emails: Object,
  },
}, { collection: "demo" });  // Explicitly name the collection

module.exports = mongoose.model("demo", demoSchema);
