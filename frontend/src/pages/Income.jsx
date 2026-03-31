import React, { useState, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { transactionsAPI } from '../services/api';
import StatCard from '../components/common/StatCard';
import TransactionList from '../components/dashboard/TransactionList';
import Alert from '../components/common/Alert';
import '../styles/Income.css';

const Income = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '' });

  useEffect(() => {
    fetchIncomeTransactions();
  }, [filters]);

  const fetchIncomeTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionsAPI.getAll({
        type: 'income',
        ...filters,
      });
      const data = response.data.data || response.data;
      setTransactions(data);

      // Calculate stats
      const totalIncome = data.reduce((sum, t) => sum + t.amount, 0);
      const thisMonth = data.filter((t) => {
        const date = new Date(t.date);
        const now = new Date();
        return date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
      });
      const monthlyIncome = thisMonth.reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalIncome,
        monthlyIncome,
        transactionCount: data.length,
      });
    } catch (err) {
      setError('Failed to load income transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="income-container">
      {/* Header */}
      <div className="income-header">
        <h1>Income</h1>
        <p>Track all your income sources</p>
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
        <div className="income-stats-grid">
          <StatCard
            title="Total Income"
            value={`₹${stats.totalIncome?.toFixed(2) || '0.00'}`}
            icon={FiTrendingUp}
            color="success"
          />
          <StatCard
            title="This Month"
            value={`₹${stats.monthlyIncome?.toFixed(2) || '0.00'}`}
            icon={FiTrendingUp}
            color="primary"
          />
          <StatCard
            title="Transactions"
            value={stats.transactionCount}
            icon={FiTrendingUp}
            color="primary"
          />
        </div>
      )}

      {/* Transactions */}
      <div className="income-transactions">
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

export default Income;
