const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const scrapeRoutes = require('./routes/scrapeRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[API ${req.method}] ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// API Routes
app.use('/api', scrapeRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 600px; margin: auto;">
      <h1 style="color: #1e3a8a;">🕸️ Web Scraper MERN API Server</h1>
      <p>Academic Minor Project - AY 2026-2027 (CSE 3395)</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 1rem 0;" />
      <p><strong>Server Status:</strong> <span style="color: #16a34a;">Running</span></p>
      <p><strong>API Base URL:</strong> <code>http://localhost:${PORT}/api</code></p>
      <ul>
        <li><a href="/api/health">GET /api/health</a> - API & Database status</li>
        <li><a href="/api/history">GET /api/history</a> - Retrieve saved records</li>
      </ul>
    </div>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Web Scraper Backend Server running on port ${PORT}`);
  console.log(`🔗 API Base Endpoint: http://localhost:${PORT}/api`);
  console.log(`=================================================`);
});
