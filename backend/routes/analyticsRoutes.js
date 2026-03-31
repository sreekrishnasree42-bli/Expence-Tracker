// Analytics Routes
const express = require('express');
const router = express.Router();
const {
  getSummary,
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getSpendingTrends,
  getRecommendations,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// All analytics routes are protected
router.use(protect);

// @route   GET /api/analytics/summary
// @desc    Get dashboard summary
// @access  Private
router.get('/summary', getSummary);

// @route   GET /api/analytics/monthly
// @desc    Get monthly breakdown
// @access  Private
router.get('/monthly', getMonthlyAnalytics);

// @route   GET /api/analytics/category
// @desc    Get category-wise analytics
// @access  Private
router.get('/category', getCategoryAnalytics);

// @route   GET /api/analytics/trends
// @desc    Get spending trends
// @access  Private
router.get('/trends', getSpendingTrends);

// @route   GET /api/analytics/recommendations
// @desc    Get budget recommendations
// @access  Private
router.get('/recommendations', getRecommendations);

module.exports = router;
