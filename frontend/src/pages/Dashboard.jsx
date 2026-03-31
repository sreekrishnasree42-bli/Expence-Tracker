import React, { useEffect, useState, useCallback } from 'react';
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCreditCard,
  FiDollarSign,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TransactionList from '../components/dashboard/TransactionList';
import { CategoryChart, MonthlyChart } from '../components/dashboard/Charts';
import { useApp } from '../context/AppContext';
import { dashboardAPI, transactionsAPI } from '../services/api';

const formatCurrency = (value) =>
  `Rs ${Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const STAT_CARDS = [
  {
    key: 'balance',
    title: 'Total Balance',
    description: 'Current net worth across all transactions',
    icon: FiDollarSign,
  },
  {
    key: 'income',
    title: 'Total Income',
    description: 'All recorded incoming cash flow',
    icon: FiArrowUpRight,
  },
  {
    key: 'expenses',
    title: 'Total Expenses',
    description: 'Total spend captured in your account',
    icon: FiArrowDownRight,
  },
];

const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
      <div className="card-shell p-8">
        <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-14 w-3/4 animate-pulse rounded-[24px] bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-6 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-12 w-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="card-shell p-8">
        <div className="h-full animate-pulse rounded-[24px] bg-slate-100 dark:bg-slate-900/60" />
      </div>
    </div>
    <div className="grid gap-5 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="h-52 animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
    <div className="grid gap-5 xl:grid-cols-2">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="h-[430px] animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
    <div className="h-[420px] animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800" />
  </div>
);

const SummaryCard = ({ title, value, description, icon: Icon }) => (
  <motion.div whileHover={{ y: -2, scale: 1.005 }} transition={{ duration: 0.25 }} className="p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon size={20} />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { setLoading, loading, showToast } = useApp();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ type: '', category: '' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, transactionsRes, categoryRes, monthlyRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentTransactions(10),
        dashboardAPI.getCategoryStats(),
        dashboardAPI.getMonthlyStats(),
      ]);

      setStats(statsRes.data.data);
      setTransactions(Array.isArray(transactionsRes.data.data) ? transactionsRes.data.data : []);
      setCategoryData(Array.isArray(categoryRes.data.data) ? categoryRes.data.data : []);
      setMonthlyData(Array.isArray(monthlyRes.data.data) ? monthlyRes.data.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await transactionsAPI.delete(id);
      setTransactions((prev) => prev.filter((t) => (t._id || t.id) !== id));
      showToast({ type: 'success', title: 'Transaction removed', message: 'Deleted successfully.' });
    } catch (err) {
      setError('Failed to delete transaction');
      showToast({ type: 'error', title: 'Delete failed', message: 'Please try again.' });
    }
  }, [showToast]);

  const filteredTransactions = transactions.filter((t) =>
    (!filters.type || t.type === filters.type) && (!filters.category || t.category === filters.category)
  );

  if (loading && !stats) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-2">
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Track money, no clutter</h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">A clean dashboard to keep income, expenses, and reports easy to access.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => navigate('/add-transaction')} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">+ Add Transaction</button>
            <button onClick={() => navigate('/transactions')} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">View all</button>
          </div>
          {error && <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex h-12 w-12 items-center justify-center"><FiCreditCard size={20} /></div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">Snapshot</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">This month at a glance</h3>
          <p className="mt-3 text-sm text-slate-600">Income and expense activity summarized with quick access.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="p-3"><p className="text-xs uppercase tracking-wide text-slate-500">Transactions</p><p className="mt-2 text-2xl font-semibold">{transactions.length}</p></div>
            <div className="p-3"><p className="text-xs uppercase tracking-wide text-slate-500">Categories</p><p className="mt-2 text-2xl font-semibold">{categoryData.length}</p></div>
          </div>
        </div>
      </motion.section>

      {stats && (
        <section className="grid gap-5 lg:grid-cols-3">
          {STAT_CARDS.map((card) => (
            <SummaryCard key={card.key} title={card.title} description={card.description} icon={card.icon} value={formatCurrency(stats[card.key])} />
          ))}
        </section>
      )}

      <section className="grid gap-5 xl:grid-cols-2">
        <CategoryChart data={categoryData} />
        <MonthlyChart data={monthlyData} />
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Recent activity</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Recent transactions</h3>
            <p className="mt-2 text-sm text-slate-500">Review and edit entries or clean up duplicates.</p>
          </div>
          <button onClick={() => navigate('/transactions')} className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Manage all</button>
        </div>
        <TransactionList
          transactions={filteredTransactions}
          onEdit={(t) => navigate(`/edit-transaction/${t._id || t.id}`, { state: { transaction: t } })}
          onDelete={handleDeleteTransaction}
          isLoading={loading}
          filters={filters}
          onFilterChange={setFilters}
        />
      </section>
    </div>
  );
};

export default Dashboard;
