import React, { createContext, useCallback, useMemo, useRef, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [toasts, setToasts] = useState([]);
  const toastTimers = useRef(new Map());

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  }, []);

  const dismissToast = useCallback((id) => {
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const nextToast = {
      id,
      type: toast.type || 'success',
      title: toast.title || '',
      message: toast.message || '',
    };

    setToasts((prev) => [...prev, nextToast]);

    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
      toastTimers.current.delete(id);
    }, toast.duration || 3600);

    toastTimers.current.set(id, timer);
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      loading,
      setLoading,
      error,
      setError,
      darkMode,
      toggleDarkMode,
      toasts,
      showToast,
      dismissToast,
    }),
    [transactions, loading, error, darkMode, toggleDarkMode, toasts, showToast, dismissToast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
