import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiFilter } from 'react-icons/fi';
import Alert from '../components/common/Alert';
import TransactionList from '../components/dashboard/TransactionList';
import { transactionsAPI } from '../services/api';
import { CATEGORIES } from '../utils/constants';
import '../styles/Transactions.css';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    searchTerm: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters, pagination.page]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const response = await transactionsAPI.getAll(params);
      setTransactions(response.data.transactions || response.data);
      if (response.data.total) {
        setPagination((prev) => ({
          ...prev,
          total: response.data.total,
        }));
      }
    } catch (err) {
      setError('Failed to load transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    navigate(`/edit-transaction/${transaction.id}`, { state: { transaction } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionsAPI.delete(id);
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        setError('Failed to delete transaction');
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  };

  return (
    <div className="transactions-container">
      {/* Header */}
      <div className="transactions-header">
        <div>
          <h1>All Transactions</h1>
          <p>Manage all your income and expenses</p>
        </div>
        <button
          onClick={handleAddTransaction}
          className="transactions-action-btn"
        >
          <FiPlus size={20} />
          <span className="transactions-action-text">Add Transaction</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Filters */}
      <div className="transactions-filters">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) =>
              handleFilterChange({ ...filters, searchTerm: e.target.value })
            }
            placeholder="Search by description..."
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select
            value={filters.type}
            onChange={(e) =>
              handleFilterChange({ ...filters, type: e.target.value })
            }
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              handleFilterChange({ ...filters, category: e.target.value })
            }
            className="filter-select"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      {/* Pagination Info */}
      {pagination.total > 0 && (
        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} transactions
        </div>
      )}
    </div>
  );
};

export default Transactions;
