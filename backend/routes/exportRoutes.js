// Export/Import Routes
const express = require('express');
const router = express.Router();
const {
  exportCSV,
  exportJSON,
  importJSON,
  getExportHistory,
} = require('../controllers/exportController');
const { protect } = require('../middleware/auth');

// All export routes are protected
router.use(protect);

// @route   GET /api/export/csv
// @desc    Export transactions as CSV
// @access  Private
router.get('/csv', exportCSV);

// @route   GET /api/export/json
// @desc    Export transactions as JSON
// @access  Private
router.get('/json', exportJSON);

// @route   GET /api/export/history
// @desc    Get export history and summary
// @access  Private
router.get('/history', getExportHistory);

// @route   POST /api/import/json
// @desc    Import transactions from JSON
// @access  Private
router.post('/import-json', importJSON);

module.exports = router;
