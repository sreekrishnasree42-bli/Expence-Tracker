import React, { useState, useEffect } from 'react';
import { FiTrendingDown } from 'react-icons/fi';
import { transactionsAPI } from '../services/api';
import StatCard from '../components/common/StatCard';
import TransactionList from '../components/dashboard/TransactionList';
import Alert from '../components/common/Alert';
import '../styles/Expenses.css';

const Expenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '' });

  useEffect(() => {
    fetchExpenseTransactions();
  }, [filters]);

  const fetchExpenseTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionsAPI.getAll({
        type: 'expense',
        ...filters,
      });
      const data = response.data.data || response.data;
      setTransactions(data);

      // Calculate stats
      const totalExpenses = data.reduce((sum, t) => sum + t.amount, 0);
      const thisMonth = data.filter((t) => {
        const date = new Date(t.date);
        const now = new Date();
        return date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
      });
      const monthlyExpenses = thisMonth.reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalExpenses,
        monthlyExpenses,
        transactionCount: data.length,
      });
    } catch (err) {
      setError('Failed to load expense transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expenses-container">
      {/* Header */}
      <div className="expenses-header">
        <h1>Expenses</h1>
        <p>Track all your expenses</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Stats */}
      {stats && (
        <div className="expenses-stats-grid">
          <StatCard
            title="Total Expenses"
            value={`₹${stats.totalExpenses?.toFixed(2) || '0.00'}`}
            icon={FiTrendingDown}
            color="danger"
          />
          <StatCard
            title="This Month"
            value={`₹${stats.monthlyExpenses?.toFixed(2) || '0.00'}`}
            icon={FiTrendingDown}
            color="warning"
          />
          <StatCard
            title="Transactions"
            value={stats.transactionCount}
            icon={FiTrendingDown}
            color="primary"
          />
        </div>
      )}

      {/* Transactions */}
      <div className="expenses-transactions">
        <TransactionList
          transactions={transactions}
          isLoading={loading}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    </div>
  );
};

export default Expenses;
