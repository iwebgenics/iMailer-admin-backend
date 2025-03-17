// routes/stats.js
const express = require("express");
const router = express.Router();
const Demo = require("../models/Demo");

// GET /api/stats?email=xxx&year=YYYY&month=M&day=D
router.get("/", async (req, res) => {
  try {
    const { email, year, month, day } = req.query;

    const docs = await Demo.find({ user_id: email });
    let data = [];
    docs.forEach(doc => {
      const work = doc.work || {};
      const sent_count = work.emails_sent?.[year]?.[month]?.[day] || 0;
      const failed_count = work.emails_failed?.[year]?.[month]?.[day] || 0;
      const spam_count = work.emails_spam?.[year]?.[month]?.[day] || 0;
      const bounce_count = work.emails_bounce?.[year]?.[month]?.[day] || 0;

      const auth_email = doc.auth_email || "N/A";
      const failed_emails = work.failed_emails?.[year]?.[month]?.[day] || [];
      const spam_emails = work.spam_emails?.[year]?.[month]?.[day] || [];
      const bounce_emails = work.bounced_emails?.[year]?.[month]?.[day] || [];
      const receiver_emails = work.sent_emails?.[year]?.[month]?.[day] || [];

      data.push({
        date: `${year}-${month}-${day}`,
        sent_count,
        failed_count,
        spam_count,
        bounce_count,
        auth_email,
        receiver_emails,
        failed_emails,
        spam_emails,
        bounce_emails,
      });
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching stats" });
  }
});

module.exports = router;
