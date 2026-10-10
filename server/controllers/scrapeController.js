const ScrapedData = require('../models/ScrapedData');
const { getSampleDataForUrl } = require('../data/sampleData');
const mongoose = require('mongoose');

// In-memory memory fallback store if MongoDB is offline during initial quick testing
let memoryHistory = [];

/**
 * Health check endpoint
 * GET /api/health
 */
exports.checkHealth = (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'ok',
    message: 'Web Scraper API service is active and running',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      status: dbConnected ? 'Connected to MongoDB (webscraper)' : 'Disconnected (Operating in memory mode)',
      host: mongoose.connection.host || 'none'
    }
  });
};

/**
 * Scrape website endpoint (Demonstration Sample Mode)
 * POST /api/scrape
 * Body: { url: "https://example.com" }
 */
exports.scrapeWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || url.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL provided. Please enter a valid website URL.'
      });
    }

    const trimmedUrl = url.trim();
    // Validate basic URL pattern
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/i;
    if (!urlPattern.test(trimmedUrl)) {
      return res.status(400).json({
        success: false,
        message: 'Formatting error: Please enter a valid HTTP or HTTPS URL (e.g., https://example.com).'
      });
    }

    // Format URL standard
    const finalUrl = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;

    // Get sample data payload
    const mockPayload = getSampleDataForUrl(finalUrl);

    let savedDocument = null;
    let savedToDatabase = false;

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const newRecord = new ScrapedData({
          url: mockPayload.url,
          pageTitle: mockPayload.pageTitle,
          scrapedDate: new Date(),
          headings: mockPayload.headings,
          links: mockPayload.links,
          products: mockPayload.products,
          isSampleData: true
        });

        savedDocument = await newRecord.save();
        savedToDatabase = true;
      } catch (dbErr) {
        console.error('[Database Save Warning]:', dbErr.message);
      }
    }

    // If database wasn't available, save to local memory fallback
    if (!savedToDatabase) {
      savedDocument = {
        _id: 'mem_' + Date.now(),
        url: mockPayload.url,
        pageTitle: mockPayload.pageTitle,
        scrapedDate: new Date(),
        headings: mockPayload.headings,
        links: mockPayload.links,
        products: mockPayload.products,
        isSampleData: true,
        createdAt: new Date()
      };
      memoryHistory.unshift(savedDocument);
    }

    return res.status(201).json({
      success: true,
      message: 'Website parsed successfully (Demonstration Mode)',
      data: savedDocument,
      savedToDatabase: savedToDatabase,
      demoNotice: 'Notice: Content generated using realistic sample demonstration dataset per project guidelines.'
    });

  } catch (error) {
    console.error('[Scrape Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred while processing website data.',
      error: error.message
    });
  }
};

/**
 * Get all scraped history records
 * GET /api/history
 */
exports.getHistory = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await ScrapedData.find().sort({ scrapedDate: -1 });
      return res.status(200).json({
        success: true,
        count: records.length,
        data: records,
        source: 'MongoDB (webscraper.scraped_data)'
      });
    }

    // Fallback to memory history
    return res.status(200).json({
      success: true,
      count: memoryHistory.length,
      data: memoryHistory,
      source: 'Memory Cache (Database Disconnected)'
    });
  } catch (error) {
    console.error('[Get History Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve scraping history.',
      error: error.message
    });
  }
};

/**
 * Get single history record by ID
 * GET /api/history/:id
 */
exports.getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const record = await ScrapedData.findById(id);
      if (record) {
        return res.status(200).json({
          success: true,
          data: record
        });
      }
    }

    // Check memory history
    const memRecord = memoryHistory.find(item => item._id.toString() === id);
    if (memRecord) {
      return res.status(200).json({
        success: true,
        data: memRecord
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Scraped record not found.'
    });
  } catch (error) {
    console.error('[Get Record Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching record details.',
      error: error.message
    });
  }
};

/**
 * Delete a scraped record by ID
 * DELETE /api/history/:id
 */
exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const result = await ScrapedData.findByIdAndDelete(id);
      if (result) {
        deleted = true;
      }
    }

    // Delete from memory if memory ID
    if (!deleted) {
      const initialLength = memoryHistory.length;
      memoryHistory = memoryHistory.filter(item => item._id.toString() !== id);
      if (memoryHistory.length < initialLength) {
        deleted = true;
      }
    }

    if (deleted) {
      return res.status(200).json({
        success: true,
        message: 'Record successfully deleted from database.'
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Record ID not found or already removed.'
    });
  } catch (error) {
    console.error('[Delete Record Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete record.',
      error: error.message
    });
  }
};
