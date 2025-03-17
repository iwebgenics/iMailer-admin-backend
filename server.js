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
app.use(cors());

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
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use("/api/stats", statsRoutes);
app.use('/api/passkeys', passkeyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5002, "0.0.0.0", () => {
  console.log("Server running on port 5002");
});
