import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Alert from '../components/common/Alert';
import { CATEGORIES, TRANSACTION_TYPES } from '../utils/constants';
import { transactionsAPI } from '../services/api';
import '../styles/AddTransaction.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.amount || !formData.category || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await transactionsAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to add transaction. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-transaction-wrapper">
      {/* Header */}
      <div className="add-transaction-header">
        <button
          onClick={() => navigate(-1)}
          className="add-transaction-back-btn"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1>Add Transaction</h1>
      </div>

      {/* Alerts */}
      {error && (
        <div className="add-transaction-alert">
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      {success && (
        <div className="add-transaction-alert">
          <Alert
            type="success"
            title="Success!"
            message="Transaction added successfully. Redirecting..."
          />
        </div>
      )}

      {/* Form */}
      <div className="add-transaction-form-card">
        <form onSubmit={handleSubmit} className="add-transaction-form">
          {/* Type and Amount Row */}
          <div className="form-row">
            {/* Transaction Type */}
            <div className="form-group">
              <label className="form-label form-required">Transaction Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="form-label form-required">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="form-input"
              />
            </div>
          </div>

          {/* Category and Date Row */}
          <div className="form-row">
            {/* Category */}
            <div className="form-group">
              <label className="form-label form-required">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label form-required">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a note about this transaction..."
              rows={4}
              className="form-textarea"
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="form-submit-btn"
              style={{
                background: 'white',
                color: 'var(--gray-900)',
                border: '1px solid var(--gray-300)',
                boxShadow: 'none',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="form-submit-btn"
            > 
              <FiSave size={20} />
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
