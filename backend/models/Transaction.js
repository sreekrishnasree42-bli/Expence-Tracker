// Transaction Model
const mongoose = require('mongoose');

// Define Transaction schema
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount must be positive'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify transaction type (income/expense)'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries by userId
transactionSchema.index({ userId: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
