import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Navbar = ({ onMenuClick, isOpen, collapsed }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-30 px-4 pt-4 md:px-8 md:pt-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-[28px] px-4 py-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="inline-flex rounded-2xl border border-slate-200/70 bg-white/80 p-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
              title="Toggle sidebar"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400 lg:flex">
            <FiSearch size={16} />
            <span className="text-sm">Search transactions, categories, or trends</span>
            <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">/</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleDarkMode}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 transition hover:scale-[1.03] hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <FiSun size={18} className="text-amber-400" />
            ) : (
              <FiMoon size={18} className="text-indigo-600" />
            )}
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email || 'user@email.com'}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white shadow-lg shadow-indigo-500/30">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl border border-rose-200/70 bg-white/85 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:scale-[1.02] hover:border-rose-300 hover:bg-rose-50 dark:border-rose-900/60 dark:bg-slate-900/85 dark:text-rose-300 dark:hover:bg-rose-950/40"
            title="Logout from your account"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
