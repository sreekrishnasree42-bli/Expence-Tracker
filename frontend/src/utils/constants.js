// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,

  // Transactions
  TRANSACTIONS: `${API_BASE_URL}/transactions`,
  TRANSACTION_DETAIL: (id) => `${API_BASE_URL}/transactions/${id}`,
  TRANSACTION_CREATE: `${API_BASE_URL}/transactions`,
  TRANSACTION_UPDATE: (id) => `${API_BASE_URL}/transactions/${id}`,
  TRANSACTION_DELETE: (id) => `${API_BASE_URL}/transactions/${id}`,

  // Dashboard
  DASHBOARD: `${API_BASE_URL}/dashboard`,
  STATISTICS: `${API_BASE_URL}/statistics`,
};

// Transaction categories
export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#FF6B6B' },
  { id: 'travel', label: 'Travel', color: '#4ECDC4' },
  { id: 'utilities', label: 'Utilities & Bills', color: '#FFE66D' },
  { id: 'entertainment', label: 'Entertainment', color: '#95E1D3' },
  { id: 'shopping', label: 'Shopping', color: '#F38181' },
  { id: 'salary', label: 'Salary', color: '#52B788' },
  { id: 'freelance', label: 'Freelance', color: '#74C0FC' },
  { id: 'investment', label: 'Investment', color: '#B197FC' },
  { id: 'other', label: 'Other', color: '#9CA3AF' },
];

// Transaction types
export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];
