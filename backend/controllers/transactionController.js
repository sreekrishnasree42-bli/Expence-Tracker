// Transaction Controller
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const {
  validateAmount,
  validateTransactionType,
  validateDate,
  validateCategory,
  sanitizeInput,
} = require('../utils/validation');
const { sendTransactionNotification } = require('../utils/emailService');

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { category, type, startDate, endDate, limit = 50, page = 1 } = req.query;

    // Build filter object
    let filter = { userId };

    if (category) {
      const sanitizedCategory = sanitizeInput(category).toLowerCase();
      filter.category = sanitizedCategory;
    }

    if (type) {
      if (!validateTransactionType(type)) {
        return res.status(400).json({
          success: false,
          message: 'Type must be either income or expense',
        });
      }
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        if (!validateDate(startDate)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid start date format',
          });
        }
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        if (!validateDate(endDate)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid end date format',
          });
        }
        filter.date.$lte = new Date(endDate);
      }
    }

    // Calculate pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
    const skip = (pageNum - 1) * limitNum;

    // Get transactions sorted by latest
    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res, next) => {
  try {
    let { amount, type, category, date, description } = req.body;
    const userId = req.userId;

    // Validate required fields
    if (amount === undefined || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, type, and category',
      });
    }

    // Validate amount
    if (!validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    // Validate type
    if (!validateTransactionType(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either income or expense',
      });
    }

    // Validate category
    category = sanitizeInput(category).toLowerCase();
    if (!validateCategory(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Valid categories: groceries, utilities, entertainment, transportation, healthcare, food, salary, bonus, investment, rent, insurance, education, personal, other',
      });
    }

    // Validate date if provided
    if (date && !validateDate(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format',
      });
    }

    // Sanitize description
    if (description) {
      description = sanitizeInput(description);
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
      description,
    });

    // Send notification email if enabled
    if (process.env.SEND_TRANSACTION_EMAIL === 'true') {
      const user = await User.findById(userId);
      await sendTransactionNotification(user, transaction);
    }

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { amount, type, category, date, description } = req.body;

    // Find transaction and check ownership
    let transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Verify ownership
    if (transaction.userId.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this transaction',
      });
    }

    // Validate and update fields if provided
    if (amount !== undefined) {
      if (!validateAmount(amount)) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a positive number',
        });
      }
      transaction.amount = amount;
    }

    if (type) {
      if (!validateTransactionType(type)) {
        return res.status(400).json({
          success: false,
          message: 'Type must be either income or expense',
        });
      }
      transaction.type = type;
    }

    if (category) {
      const sanitizedCategory = sanitizeInput(category).toLowerCase();
      if (!validateCategory(sanitizedCategory)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category',
        });
      }
      transaction.category = sanitizedCategory;
    }

    if (date) {
      if (!validateDate(date)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format',
        });
      }
      transaction.date = new Date(date);
    }

    if (description) {
      transaction.description = sanitizeInput(description);
    }

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Verify ownership
    if (transaction.userId.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this transaction',
      });
    }

    // Delete transaction
    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
