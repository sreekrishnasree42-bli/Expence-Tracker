import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';
import './index.css';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Settings from './pages/Settings';

const toastStyles = {
  success: {
    icon: FiCheckCircle,
    accent: 'from-emerald-500 to-teal-500',
  },
  error: {
    icon: FiAlertCircle,
    accent: 'from-rose-500 to-red-500',
  },
  info: {
    icon: FiInfo,
    accent: 'from-blue-500 to-indigo-500',
  },
};

const ToastViewport = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[120] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toastStyles[toast.type] || toastStyles.info;
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="pointer-events-auto overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${config.accent}`} />
              <div className="flex items-start gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${config.accent} text-white shadow-lg`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  {toast.title ? (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{toast.title}</p>
                  ) : null}
                  <p className="text-sm text-slate-600 dark:text-slate-300">{toast.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <FiX size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();
  const { darkMode } = useApp();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="app-layout md:flex">
      <Sidebar
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          isOpen={sidebarOpen}
          collapsed={sidebarCollapsed}
        />
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <ToastViewport />
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-transaction/:id"
            element={
              <ProtectedRoute>
                <EditTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppLayout>
            <AppContent />
          </AppLayout>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
