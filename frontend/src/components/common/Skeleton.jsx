import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
      ))}
    </div>
  </div>
);
