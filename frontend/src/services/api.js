import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  register: (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password }),
  logout: () => apiClient.post('/auth/logout'),
};

// Transactions APIs
export const transactionsAPI = {
  getAll: (params) =>
    apiClient.get('/transactions', { params }),
  getById: (id) =>
    apiClient.get(`/transactions/${id}`),
  create: (data) =>
    apiClient.post('/transactions', data),
  update: (id, data) =>
    apiClient.put(`/transactions/${id}`, data),
  delete: (id) =>
    apiClient.delete(`/transactions/${id}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () =>
    apiClient.get('/dashboard/stats'),
  getRecentTransactions: (limit = 5) =>
    apiClient.get('/dashboard/recent-transactions', { params: { limit } }),
  getCategoryStats: () =>
    apiClient.get('/dashboard/category-stats'),
  getMonthlyStats: () =>
    apiClient.get('/dashboard/monthly-stats'),
};

export default apiClient;
