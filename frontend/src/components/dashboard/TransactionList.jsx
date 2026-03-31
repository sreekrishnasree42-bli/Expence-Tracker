import React from 'react';
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiEdit2,
  FiFilter,
  FiInbox,
  FiTrash2,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';

const TransactionList = ({
  transactions,
  onEdit,
  onDelete,
  isLoading,
  filters,
  onFilterChange,
}) => {
  const getCategoryLabel = (categoryId) => {
    return CATEGORIES.find((cat) => cat.id === categoryId)?.label || 'Other';
  };

  const getCategoryColor = (categoryId) => {
    return CATEGORIES.find((cat) => cat.id === categoryId)?.color || '#9CA3AF';
  };

  const getTypeLabel = (type) => {
    return TRANSACTION_TYPES.find((t) => t.value === type)?.label || type;
  };

  const formatCurrency = (amount) =>
    `Rs ${Math.abs(Number(amount || 0)).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (isLoading) {
    return (
      <div className="card-shell overflow-hidden p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-11 w-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="grid animate-pulse gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/40 md:grid-cols-[1.2fr_1fr_1.5fr_1fr_auto]">
              <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="card-shell flex flex-col items-center justify-center gap-5 p-12 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-indigo-600 dark:text-indigo-300">
          <FiInbox size={42} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No transactions yet. Start by adding one 🚀</h3>
          <p className="max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your recent activity, edits, and spending insights will show up here as soon as you create your first record.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-shell overflow-visible">
      {onFilterChange ? (
        <div className="border-b border-slate-200/30 bg-transparent p-6 dark:border-slate-800/30 dark:bg-transparent">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <FiFilter size={18} />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <select
              value={filters?.type || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, type: e.target.value })
              }
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={filters?.category || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
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
      ) : null}

      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-full">
          <thead className="border-b border-slate-200/70 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Description</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Amount</th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Type</th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction._id || transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="transition hover:bg-slate-50/90 dark:hover:bg-slate-950/35"
              >
                <td className="px-6 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-5 text-sm">
                  <span
                    className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: getCategoryColor(transaction.category) }}
                  >
                    {getCategoryLabel(transaction.category)}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{transaction.description || 'Untitled transaction'}</span>
                </td>
                <td
                  className={`px-6 py-5 text-right text-sm font-bold ${
                    transaction.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-5 text-center text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                      transaction.type === 'income'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                    }`}
                  >
                    {transaction.type === 'income' ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                    {getTypeLabel(transaction.type)}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="rounded-2xl p-2.5 text-amber-600 transition hover:bg-amber-50 hover:scale-105 dark:text-amber-300 dark:hover:bg-amber-500/10"
                      title="Edit transaction"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(transaction._id || transaction.id)}
                      className="rounded-2xl p-2.5 text-rose-600 transition hover:bg-rose-50 hover:scale-105 dark:text-rose-300 dark:hover:bg-rose-500/10"
                      title="Delete transaction"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 xl:hidden">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction._id || transaction.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-none border-none bg-transparent p-5 transition hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{transaction.description || 'Untitled transaction'}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                  transaction.type === 'income'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                }`}
              >
                {getTypeLabel(transaction.type)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span
                className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold text-white"
                style={{ backgroundColor: getCategoryColor(transaction.category) }}
              >
                {getCategoryLabel(transaction.category)}
              </span>
              <span
                className={`text-sm font-bold ${
                  transaction.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => onEdit(transaction)}
                className="rounded-2xl p-2.5 text-amber-600 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"
                title="Edit transaction"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(transaction._id || transaction.id)}
                className="rounded-2xl p-2.5 text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                title="Delete transaction"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
