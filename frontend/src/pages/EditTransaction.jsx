import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Alert from '../components/common/Alert';
import { CATEGORIES, TRANSACTION_TYPES } from '../utils/constants';
import { transactionsAPI } from '../services/api';
import '../styles/EditTransaction.css';

const INITIAL_FORM = {
  type: 'expense',
  amount: '',
  category: 'food',
  date: '',
  description: '',
};

const FORM_FIELDS = [
  { row: 1, name: 'type', label: 'Transaction Type', type: 'select', options: TRANSACTION_TYPES, required: true },
  { row: 1, name: 'amount', label: 'Amount (₹)', type: 'number', placeholder: '0.00', step: '0.01', required: true },
  { row: 2, name: 'category', label: 'Category', type: 'select', options: CATEGORIES, required: true },
  { row: 2, name: 'date', label: 'Date', type: 'date', required: true },
  { row: 3, name: 'description', label: 'Description', type: 'textarea', placeholder: 'Add a note about this transaction...', required: false },
];

const transformTransaction = (transaction) => ({
  type: transaction.type,
  amount: transaction.amount,
  category: transaction.category,
  date: new Date(transaction.date).toISOString().split('T')[0],
  description: transaction.description || '',
});

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    if (location.state?.transaction) {
      setFormData(transformTransaction(location.state.transaction));
      setLoading(false);
    } else {
      fetchTransaction();
    }
  }, [id, location.state]);

  const fetchTransaction = async () => {
    try {
      const transaction = (await transactionsAPI.getById(id)).data;
      setFormData(transformTransaction(transaction));
    } catch (err) {
      setError('Failed to load transaction details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.amount || !formData.category || !formData.date) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await transactionsAPI.update(id, { ...formData, amount: parseFloat(formData.amount) });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-transaction-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading transaction...</p>
        </div>
      </div>
    );
  }

  const renderField = (field) => {
    const commonProps = { name: field.name, value: formData[field.name], onChange: handleChange, className: 'form-input' };
    
    if (field.type === 'select') {
      return (
        <select {...commonProps} className="form-select">
          {(field.name === 'type' ? TRANSACTION_TYPES : CATEGORIES).map((opt) => (
            <option key={opt.value || opt.id} value={opt.value || opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    if (field.type === 'textarea') {
      return <textarea {...commonProps} className="form-textarea" placeholder={field.placeholder} rows={4} />;
    }
    return <input {...commonProps} type={field.type} placeholder={field.placeholder} step={field.step} />;
  };

  const fieldsByRow = { 1: [], 2: [], 3: [] };
  FORM_FIELDS.forEach(field => fieldsByRow[field.row].push(field));

  return (
    <div className="edit-transaction-wrapper">
      <div className="edit-transaction-header">
        <button onClick={() => navigate(-1)} className="edit-transaction-back-btn">
          <FiArrowLeft size={24} />
        </button>
        <h1>Edit Transaction</h1>
      </div>

      {error && <div className="edit-transaction-alert"><Alert type="error" message={error} onClose={() => setError(null)} /></div>}
      {success && <div className="edit-transaction-alert"><Alert type="success" title="Success!" message="Transaction updated successfully. Redirecting..." /></div>}

      <div className="edit-transaction-form-card">
        <form onSubmit={handleSubmit} className="edit-transaction-form">
          {[1, 2].map((row) => (
            <div key={row} className="form-row">
              {fieldsByRow[row].map((field) => (
                <div key={field.name} className="form-group">
                  <label className={`form-label ${field.required ? 'form-required' : ''}`}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          ))}

          {fieldsByRow[3].map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}</label>
              {renderField(field)}
            </div>
          ))}

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="form-submit-btn" style={{ background: 'white', color: 'var(--gray-900)', border: '1px solid var(--gray-300)', boxShadow: 'none' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="form-submit-btn">
              <FiSave size={20} />
              {loading ? 'Updating...' : 'Update Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
