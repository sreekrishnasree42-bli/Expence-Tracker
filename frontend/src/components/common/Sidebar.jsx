import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiBarChart2,
  FiChevronsLeft,
  FiChevronsRight,
  FiHome,
  FiSettings,
  FiTrendingDown,
  FiTrendingUp,
  FiX,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, collapsed, onClose, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiTrendingUp, label: 'Income', path: '/income' },
    { icon: FiTrendingDown, label: 'Expenses', path: '/expenses' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      ) : null}

      <motion.aside
        animate={{ width: collapsed ? 96 : 280 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen shrink-0 flex-col border-r border-white/10 bg-slate-950/95 px-4 py-5 text-white transition-transform duration-300 md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <FiHome size={20} className="text-slate-300" />
            {!collapsed ? (
              <div className="text-left">
                <h1 className="text-base font-semibold text-slate-100">Dashboard</h1>
              </div>
            ) : null}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white md:inline-flex"
            >
              {collapsed ? <FiChevronsRight size={18} /> : <FiChevronsLeft size={18} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="mb-6 p-4">
          <p className={`text-xs uppercase tracking-[0.22em] text-slate-400 ${collapsed ? 'hidden' : 'block'}`}>Workspace</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user?.name || 'User'}</p>
                <p className="truncate text-xs text-slate-400">{user?.email || 'user@email.com'}</p>
              </div>
            ) : null}
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavigate(item.path)}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-none px-4 py-3.5 text-left transition duration-300 ${
                  active
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {active ? (
                  <div className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-white/90" />
                ) : null}
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? 'bg-white/16' : 'bg-white/6'} transition duration-300`}>
                  <Icon size={20} />
                </div>
                {!collapsed ? (
                  <>
                    <span className="text-sm font-semibold">{item.label}</span>
                    {active ? <div className="ml-auto h-2.5 w-2.5 rounded-full bg-white/90" /> : null}
                  </>
                ) : null}
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-6 p-4">
          {!collapsed ? (
            <>
              
            </>
          ) : (
            <div className="mx-auto h-2.5 w-2.5 rounded-full bg-emerald-400" />
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
