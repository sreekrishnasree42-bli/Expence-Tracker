import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
