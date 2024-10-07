const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Prefix the auth routes with /api/auth

// Add a new route that uses res.write
app.get('/api/message', (req, res) => {
  res.write('First statement\n'); // Write first statement
  res.write('This is another part of the response.\n'); // Additional writes (optional)
  res.end('Response complete'); // End the response
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
