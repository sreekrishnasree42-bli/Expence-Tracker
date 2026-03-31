// Analytics Controller
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get dashboard summary
// @route   GET /api/analytics/summary
// @access  Private
exports.getSummary = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Get all transactions
    const transactions = await Transaction.find({ userId });

    // Calculate totals
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryBreakdown = {};

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }

      // Category breakdown
      if (!categoryBreakdown[transaction.category]) {
        categoryBreakdown[transaction.category] = {
          income: 0,
          expense: 0,
          count: 0,
        };
      }
      if (transaction.type === 'income') {
        categoryBreakdown[transaction.category].income += transaction.amount;
      } else {
        categoryBreakdown[transaction.category].expense += transaction.amount;
      }
      categoryBreakdown[transaction.category].count += 1;
    });

    const netSavings = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netSavings,
        transactionCount: transactions.length,
        categoryBreakdown,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get monthly breakdown
// @route   GET /api/analytics/monthly
// @access  Private
exports.getMonthlyAnalytics = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { year, month } = req.query;

    // Get current date
    const now = new Date();
    const targetYear = year ? parseInt(year) : now.getFullYear();
    const targetMonth = month ? parseInt(month) : now.getMonth();

    // Get transactions for the month
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0);

    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Calculate breakdown
    let totalIncome = 0;
    let totalExpense = 0;
    const dailyBreakdown = {};
    const categoryBreakdown = {};

    transactions.forEach((transaction) => {
      const dayKey = new Date(transaction.date).toISOString().split('T')[0];

      if (!dailyBreakdown[dayKey]) {
        dailyBreakdown[dayKey] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
        dailyBreakdown[dayKey].income += transaction.amount;
      } else {
        totalExpense += transaction.amount;
        dailyBreakdown[dayKey].expense += transaction.amount;
      }

      // Category breakdown
      if (!categoryBreakdown[transaction.category]) {
        categoryBreakdown[transaction.category] = 0;
      }
      if (transaction.type === 'expense') {
        categoryBreakdown[transaction.category] += transaction.amount;
      }
    });

    res.status(200).json({
      success: true,
      month: `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}`,
      data: {
        totalIncome,
        totalExpense,
        netSavings: totalIncome - totalExpense,
        transactionCount: transactions.length,
        dailyBreakdown,
        categoryBreakdown,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get category-wise analytics
// @route   GET /api/analytics/category
// @access  Private
exports.getCategoryAnalytics = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { category } = req.query;

    let filter = { userId };
    if (category) {
      filter.category = category;
    }

    const transactions = await Transaction.find(filter);

    // Group by category
    const categoryData = {};

    transactions.forEach((transaction) => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = {
          income: 0,
          expense: 0,
          count: 0,
          percentage: 0,
        };
      }

      if (transaction.type === 'income') {
        categoryData[transaction.category].income += transaction.amount;
      } else {
        categoryData[transaction.category].expense += transaction.amount;
      }
      categoryData[transaction.category].count += 1;
    });

    // Calculate total expense for percentage
    const totalExpense = Object.values(categoryData).reduce(
      (sum, cat) => sum + cat.expense,
      0
    );

    // Calculate percentage
    Object.keys(categoryData).forEach((cat) => {
      categoryData[cat].percentage =
        totalExpense > 0 ? ((categoryData[cat].expense / totalExpense) * 100).toFixed(2) : 0;
    });

    // Sort by expense amount
    const sortedCategories = Object.entries(categoryData)
      .sort(([, a], [, b]) => b.expense - a.expense)
      .reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {});

    res.status(200).json({
      success: true,
      data: sortedCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get spending trends
// @route   GET /api/analytics/trends
// @access  Private
exports.getSpendingTrends = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { months = 6 } = req.query;

    const transactions = await Transaction.find({ userId });

    // Group by month
    const monthlyData = {};

    transactions.forEach((transaction) => {
      const monthKey = new Date(transaction.date).toISOString().slice(0, 7);

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expense += transaction.amount;
      }
    });

    // Sort by month
    const sortedMonths = Object.keys(monthlyData).sort();
    const lastNMonths = sortedMonths.slice(-months);

    const trends = {};
    lastNMonths.forEach((month) => {
      trends[month] = monthlyData[month];
    });

    res.status(200).json({
      success: true,
      data: trends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get budget recommendations
// @route   GET /api/analytics/recommendations
// @access  Private
exports.getRecommendations = async (req, res, next) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({ userId });

    // Calculate category-wise spending
    const categorySpending = {};
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
        if (!categorySpending[transaction.category]) {
          categorySpending[transaction.category] = 0;
        }
        categorySpending[transaction.category] += transaction.amount;
      }
    });

    // Generate recommendations
    const recommendations = [];

    Object.entries(categorySpending).forEach(([category, amount]) => {
      const percentage = (amount / totalExpense) * 100;

      // High spending categories
      if (percentage > 30) {
        recommendations.push({
          type: 'warning',
          category,
          percentage: percentage.toFixed(2),
          message: `Your ${category} spending is ${percentage.toFixed(2)}% of total expenses. Consider reducing it.`,
        });
      }

      // Moderate spending
      if (percentage > 20 && percentage <= 30) {
        recommendations.push({
          type: 'info',
          category,
          percentage: percentage.toFixed(2),
          message: `Your ${category} spending is ${percentage.toFixed(2)}% of total expenses.`,
        });
      }
    });

    // Overall savings recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        message: 'Your spending is well-balanced. Keep up the good budgeting!',
      });
    }

    res.status(200).json({
      success: true,
      totalExpense,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
