// Export/Import Controller
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { Parser } = require('json2csv');

// @desc    Export transactions as CSV
// @route   GET /api/export/csv
// @access  Private
exports.exportCSV = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, category } = req.query;

    // Build filter
    let filter = { userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (category) {
      filter.category = category;
    }

    // Get transactions
    const transactions = await Transaction.find(filter).sort({ date: -1 });

    if (transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No transactions found for export',
      });
    }

    // Format data for CSV
    const csvData = transactions.map((t) => ({
      Date: new Date(t.date).toLocaleDateString(),
      Type: t.type,
      Category: t.category,
      Amount: t.amount,
      Description: t.description || 'N/A',
      'Created At': new Date(t.createdAt).toLocaleString(),
    }));

    // Generate CSV
    const parser = new Parser();
    const csv = parser.parse(csvData);

    // Send as download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Export transactions as JSON
// @route   GET /api/export/json
// @access  Private
exports.exportJSON = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, category } = req.query;

    // Build filter
    let filter = { userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (category) {
      filter.category = category;
    }

    // Get transactions
    const transactions = await Transaction.find(filter).sort({ date: -1 });

    if (transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No transactions found for export',
      });
    }

    // Get user info
    const user = await User.findById(userId);

    // Create export data
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        name: user.name,
        email: user.email,
      },
      summary: {
        totalTransactions: transactions.length,
        totalIncome: transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0),
        totalExpense: transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0),
      },
      transactions,
    };

    // Send as download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions.json"');
    res.json(exportData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Import transactions from JSON
// @route   POST /api/import/json
// @access  Private
exports.importJSON = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { transactions } = req.body;

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid import data. Expected array of transactions.',
      });
    }

    // Validate and prepare transactions
    const validTransactions = transactions
      .map((transaction) => {
        const { amount, type, category, date, description } = transaction;

        // Validation
        if (!amount || !type || !category) {
          return null;
        }

        if (!['income', 'expense'].includes(type)) {
          return null;
        }

        return {
          userId,
          amount,
          type,
          category,
          date: date ? new Date(date) : new Date(),
          description,
        };
      })
      .filter((t) => t !== null);

    if (validTransactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid transactions to import.',
      });
    }

    // Insert transactions
    const imported = await Transaction.insertMany(validTransactions);

    res.status(201).json({
      success: true,
      message: `Imported ${imported.length} transactions successfully`,
      data: {
        importedCount: imported.length,
        skippedCount: transactions.length - imported.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get export history
// @route   GET /api/export/history
// @access  Private
exports.getExportHistory = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Get transaction count and date range
    const transactions = await Transaction.find({ userId });

    if (transactions.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No transactions to export',
        data: null,
      });
    }

    const dates = transactions.map((t) => new Date(t.date)).sort((a, b) => a - b);

    const summary = {
      totalTransactions: transactions.length,
      dateRange: {
        from: dates[0].toLocaleDateString(),
        to: dates[dates.length - 1].toLocaleDateString(),
      },
      totalIncome: transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpense: transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
      exportFormats: ['csv', 'json'],
    };

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
