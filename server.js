require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const statsRoutes = require("./routes/stats");
const passkeyRoutes = require('./routes/passkeys');

const app = express();
app.use(express.json());
app.use(cors({
  origin: [ 'https://admin.imailer.in/'],
  credentials: true, // Allows cookies/tokens

}));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default route for browser visit
app.get("/", (req, res) => {
  res.send("<h2>Server Running Successfully</h2>");
});

// Mount API routes
// After: (For imailer backend running on port 5006)
app.use('/api/imailer', authRoutes);
app.use('/api/imailer/admin', adminRoutes);
app.use('/api/imailer/employees', employeeRoutes);
app.use('/api/imailer/stats', statsRoutes);
app.use('/api/imailer/passkeys', passkeyRoutes);
const PORT = process.env.PORT || 5009;

app.listen(5009, "0.0.0.0", () => {
  console.log("Server running on port 5009");
});