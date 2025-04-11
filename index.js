const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes');

require('dotenv').config();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://kidsmate.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files serving
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      message: 'File upload error',
      error: err.message 
    });
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});