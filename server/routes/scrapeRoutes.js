const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

// Health check endpoint
router.get('/health', scrapeController.checkHealth);

// Scrape website (Sample Mode)
router.post('/scrape', scrapeController.scrapeWebsite);

// Scraping History CRUD Endpoints
router.get('/history', scrapeController.getHistory);
router.get('/history/:id', scrapeController.getHistoryById);
router.delete('/history/:id', scrapeController.deleteHistory);

module.exports = router;
