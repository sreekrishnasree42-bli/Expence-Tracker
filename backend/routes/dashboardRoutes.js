// Dashboard Routes - Maps frontend dashboard endpoints to analytics controllers
const express = require('express');
const router = express.Router();
const {
  getSummary,
  getMonthlyAnalytics,
  getCategoryAnalytics,
} = require('../controllers/analyticsController');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// All dashboard routes are protected
router.use(protect);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard summary stats
// @access  Private
router.get('/stats', async (req, res, next) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId }).sort({
      date: -1,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        balance,
        income: totalIncome,
        expenses: totalExpense,
        balanceTrend: { type: 'up', value: 12 },
        incomeTrend: { type: 'up', value: 8 },
        expensesTrend: { type: 'down', value: 5 },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/dashboard/recent-transactions
// @desc    Get recent transactions
// @access  Private
router.get('/recent-transactions', async (req, res, next) => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 10;

    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/dashboard/category-stats
// @desc    Get category-wise expense breakdown
// @access  Private
router.get('/category-stats', async (req, res, next) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId, type: 'expense' });

    const categoryMap = {};

    transactions.forEach((tx) => {
      if (!categoryMap[tx.category]) {
        categoryMap[tx.category] = 0;
      }
      categoryMap[tx.category] += tx.amount;
    });

    // Format for Recharts
    const data = Object.entries(categoryMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/dashboard/monthly-stats
// @desc    Get monthly income vs expense
// @access  Private
router.get('/monthly-stats', async (req, res, next) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId });

    const monthlyMap = {};
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Add last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = monthNames[date.getMonth()];
      monthlyMap[monthKey] = {
        month: monthName,
        income: 0,
        expense: 0,
      };
    }

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (monthlyMap[monthKey]) {
        if (tx.type === 'income') {
          monthlyMap[monthKey].income += tx.amount;
        } else {
          monthlyMap[monthKey].expense += tx.amount;
        }
      }
    });

    const data = Object.values(monthlyMap);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
