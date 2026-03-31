import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';
import { FiBarChart2, FiActivity } from 'react-icons/fi';

const COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#EC4899', '#22C55E', '#6366F1', '#F59E0B'];

const EmptyChartState = ({ icon: Icon, title, message }) => (
  <div className="card-shell flex h-[360px] flex-col items-center justify-center gap-4 p-8 text-center">
    <div className="flex h-18 w-18 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-blue-600 dark:text-blue-300">
      <Icon size={34} />
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.25 }}
    className="card-shell h-full p-6 md:p-7"
  >
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-indigo-600 dark:text-indigo-300">
        <Icon size={20} />
      </div>
    </div>
    {children}
  </motion.div>
);

const CurrencyTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/70 bg-slate-950 px-4 py-3 text-sm text-white shadow-2xl shadow-slate-950/40">
      {label ? <p className="mb-2 font-semibold text-slate-100">{label}</p> : null}
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-4">
            <span className="text-slate-300">{item.name}</span>
            <span className="font-semibold" style={{ color: item.color }}>
              Rs {Number(item.value || 0).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyChartState
        icon={FiActivity}
        title="Expense categories will appear here"
        message="Add a few expenses and we’ll automatically break them down into a clean category mix."
      />
    );
  }

  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  return (
    <ChartCard
      title="Expenses by category"
      subtitle="See where your money is going this month."
      icon={FiActivity}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            innerRadius={78}
            outerRadius={112}
            dataKey="value"
            stroke="none"
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CurrencyTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/50">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {total ? `${Math.round((Number(entry.value || 0) / total) * 100)}%` : '0%'}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export const MonthlyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyChartState
        icon={FiBarChart2}
        title="Monthly trends need a little history"
        message="Once transactions are added across the month, this chart will compare income and expenses at a glance."
      />
    );
  }

  return (
    <ChartCard
      title="Income vs expense"
      subtitle="Monthly performance across your cash flow."
      icon={FiBarChart2}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#CBD5E1" opacity={0.4} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
          <Tooltip content={<CurrencyTooltip />} />
          <Bar
            dataKey="income"
            name="Income"
            fill="#3B82F6"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill="#8B5CF6"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
          Blue bars represent income
        </div>
        <div className="rounded-2xl bg-purple-50 px-4 py-3 text-sm font-medium text-purple-700 dark:bg-purple-500/10 dark:text-purple-200">
          Purple bars represent expenses
        </div>
      </div>
    </ChartCard>
  );
};
