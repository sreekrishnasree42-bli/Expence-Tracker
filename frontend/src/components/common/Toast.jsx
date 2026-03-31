import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} shadow-lg backdrop-blur-sm`}
    >
      <span className={iconColors[type]}>{icons[type]}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity">
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
