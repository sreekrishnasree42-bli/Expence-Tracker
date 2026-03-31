// Transaction Routes
const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// All transaction routes are protected
router.use(protect);

// @route   GET /api/transactions
// @desc    Get all transactions for logged-in user
// @access  Private
router.get('/', getTransactions);

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', addTransaction);

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', deleteTransaction);

module.exports = router;
