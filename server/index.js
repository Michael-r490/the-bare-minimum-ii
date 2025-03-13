
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not Connected', err));

// CORS configuration
const allowedOrigins = ['https://the-bare-minimum-ii.onrender.com', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/', require('./routes/authRoutes'));

// Server listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Home route
app.get("/", (req, res) => {
  res.send("The Bare Minimum Backend is Running.");
});

