import React, { useState } from 'react';
import {
  FiSettings,
  FiLock,
  FiBell,
  FiUser,
  FiLogOut,
  FiChevronRight,
  FiMoon,
  FiSun,
  FiCheck,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/Settings.css';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } },
};

const itemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } };

const SettingToggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between rounded-none border-0 bg-transparent p-4 transition hover:bg-slate-100/20 dark:hover:bg-slate-800/20">
    <div>
      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
        checked ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  </div>
);

const SettingCard = ({ icon: Icon, title, description, action }) => (
  <motion.div variants={itemVariants} className="group rounded-none border-0 bg-transparent p-5 transition hover:shadow-none">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-400">
          <Icon size={24} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <button className="text-slate-400 transition group-hover:text-indigo-600 dark:text-slate-600 dark:group-hover:text-indigo-400">
        <FiChevronRight size={20} />
      </button>
    </div>
    {action && <div className="mt-4">{action}</div>}
  </motion.div>
);

const tabConfigs = {
  account: {
    title: 'Account Information',
    cards: [
      { icon: FiUser, title: 'Edit Profile', description: 'Update your personal information and profile picture' },
      { icon: FiLock, title: 'Change Password', description: 'Update your password to keep your account secure' },
      { icon: FiLogOut, title: 'Sessions & Devices', description: 'Manage your active sessions and connected devices' },
    ],
  },
  notifications: {
    title: 'Notification Preferences',
    toggles: [
      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive transaction updates via email' },
      { key: 'pushNotifications', label: 'Push Notifications', description: 'Get browser push notifications for important updates' },
      { key: 'weeklyReport', label: 'Weekly Reports', description: 'Receive a summary of your spending every week' },
      { key: 'transactionAlerts', label: 'Transaction Alerts', description: 'Get notified about every new transaction' },
    ],
  },
  security: {
    title: 'Security & Privacy',
    cards: [
      {
        icon: FiLock,
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account',
        action: <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">Enable 2FA</button>,
      },
      { icon: FiCheck, title: 'Connected Accounts', description: 'Manage third-party applications with access to your account' },
      { icon: FiUser, title: 'Privacy Settings', description: 'Control who can see your transaction history' },
    ],
  },
  appearance: {
    title: 'Appearance',
    settings: true,
  },
};

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [notifications, setNotifications] = useState({ emailNotifications: true, pushNotifications: false, weeklyReport: true, transactionAlerts: true });
  const [activeTab, setActiveTab] = useState('account');

  const handleNotificationChange = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleDarkModeToggle = () => {
    const value = !darkMode;
    setDarkMode(value);
    localStorage.setItem('darkMode', value);
    document.documentElement.classList.toggle('dark', value);
  };

  const renderContent = () => {
    const conf = tabConfigs[activeTab];
    return (
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{conf.title}</h2>
        {conf.cards && (
          <div className="space-y-4">
            {conf.cards.map((card) => (
              <SettingCard key={card.title} icon={card.icon} title={card.title} description={card.description} action={card.action} />
            ))}
          </div>
        )}
        {conf.toggles && (
          <div className="space-y-3">
            {conf.toggles.map(({ key, label, description }) => (
              <SettingToggle
                key={key}
                label={label}
                description={description}
                checked={notifications[key]}
                onChange={() => handleNotificationChange(key)}
              />
            ))}
          </div>
        )}
        {conf.settings && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4 transition dark:border-slate-700/50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${darkMode ? 'bg-gradient-to-br from-indigo-500/15 to-purple-500/15 text-indigo-600 dark:text-indigo-400' : 'bg-gradient-to-br from-amber-500/15 to-yellow-500/15 text-amber-600 dark:text-amber-400'}`}>
                    {darkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Switch theme for better visibility</p>
                  </div>
                </div>
                <button
                  onClick={handleDarkModeToggle}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${darkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <SettingCard icon={FiSettings} title="Color & Theme" description="Customize colors and visual theme preferences" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-8">
      <motion.section initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:from-blue-500/20 dark:to-indigo-500/20 dark:text-blue-300">
            <FiSettings size={16} />
            Preferences
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
          <p className="max-w-2xl text-base text-slate-500 dark:text-slate-400">Customize your experience and manage your account preferences in one place.</p>
        </div>
      </motion.section>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-1.5 dark:border-slate-700/50 dark:bg-slate-900/30">
        {Object.keys(tabConfigs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-xl py-2.5 px-4 text-sm font-medium transition ${
              activeTab === tab ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {renderContent()}
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-none border-0 bg-transparent p-6">
        <h3 className="mb-4 text-lg font-semibold text-rose-900 dark:text-rose-300">Danger Zone</h3>
        <button className="w-full rounded-xl border border-rose-300 bg-white px-4 py-3 text-center font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-950/20">Delete Account</button>
        <p className="mt-3 text-sm text-rose-700/75 dark:text-rose-400/75">Permanently delete your account and all associated data. This action cannot be undone.</p>
      </motion.section>
    </div>
  );
};

export default Settings;
