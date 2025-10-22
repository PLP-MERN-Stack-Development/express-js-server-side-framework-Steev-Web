// server.js - Starter Express server for Week 2 assignment
const express = require('express');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());


require('dotenv').config();

// Connect DB
connectDB();

// Routes
app.use('/products', require('./routes/productsRoutes'));

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
