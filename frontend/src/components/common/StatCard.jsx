import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const colorGradients = {
    primary: {
      from: 'from-blue-500',
      to: 'to-purple-600',
      bg: 'from-blue-50 to-purple-50',
      darkBg: 'dark:from-blue-900/20 dark:to-purple-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      trend: 'text-blue-600',
    },
    success: {
      from: 'from-emerald-500',
      to: 'to-teal-600',
      bg: 'from-emerald-50 to-teal-50',
      darkBg: 'dark:from-emerald-900/20 dark:to-teal-900/20',
      icon: 'text-emerald-600 dark:text-emerald-400',
      trend: 'text-emerald-600',
    },
    danger: {
      from: 'from-red-500',
      to: 'to-rose-600',
      bg: 'from-red-50 to-rose-50',
      darkBg: 'dark:from-red-900/20 dark:to-rose-900/20',
      icon: 'text-red-600 dark:text-red-400',
      trend: 'text-red-600',
    },
    warning: {
      from: 'from-amber-500',
      to: 'to-orange-600',
      bg: 'from-amber-50 to-orange-50',
      darkBg: 'dark:from-amber-900/20 dark:to-orange-900/20',
      icon: 'text-amber-600 dark:text-amber-400',
      trend: 'text-amber-600',
    },
  };

  const style = colorGradients[color] || colorGradients['primary'];

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative p-5 bg-transparent border-0 rounded-none shadow-none"
    >
      {/* Decorative elements removed for flat style */}

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          
          {trend && (
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                {trend.type === 'up' ? '↑' : '↓'} {trend.value}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="p-3 rounded-none bg-transparent border-0 text-gray-600 dark:text-gray-300"
        >
          <Icon size={28} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;
