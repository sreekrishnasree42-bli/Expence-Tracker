import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose, title }) => {
  const typeConfig = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: FiAlertCircle,
      iconColor: 'text-red-600 dark:text-red-400',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: FiCheckCircle,
      iconColor: 'text-green-600 dark:text-green-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: FiInfo,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: FiAlertCircle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-3`}>
      <Icon size={20} className={`${config.iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && (
          <h4 className={`${config.text} font-semibold mb-1`}>{title}</h4>
        )}
        <p className={`${config.text} text-sm`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${config.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
