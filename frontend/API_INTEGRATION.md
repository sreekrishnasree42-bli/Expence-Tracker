# API Integration Guide

## 🔌 Overview

This document outlines all API endpoints used by the Expense Tracker frontend and how they are integrated.

---

## ⚙️ Base Configuration

### API Base URL
```javascript
http://localhost:5000/api
```

### Environment Configuration
Set in `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### Default Headers
All requests include:
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'  // Added after login
}
```

---

## 🔐 Authentication Endpoints

### 1. Login
```
POST /auth/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response** (401):
```json
{
  "message": "Invalid credentials"
}
```

**Frontend Implementation**:
```javascript
// src/pages/Login.jsx
import { authAPI } from '../services/api';

const response = await authAPI.login(email, password);
const { user, token } = response.data;
login(user, token);  // Updates AuthContext
```

---

### 2. Register
```
POST /auth/register
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (201 Created):
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Frontend Implementation**:
```javascript
// src/pages/Register.jsx
const response = await authAPI.register(name, email, password);
const { user, token } = response.data;
register(user, token);  // Updates AuthContext
```

---

### 3. Logout
```
POST /auth/logout
```

**Request Body**: None

**Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

**Frontend Implementation**:
```javascript
const handleLogout = () => {
  logout();  // Clears token from localStorage
  navigate('/login');
};
```

---

## 💰 Transaction Endpoints

### 1. Get All Transactions
```
GET /transactions
```

**Query Parameters**:
```
?type=expense          // Filter by type (income/expense)
?category=food         // Filter by category
?searchTerm=grocery    // Search in description
?page=1                // Page number
?limit=20              // Items per page
```

**Example Request**:
```javascript
GET /transactions?type=expense&category=food&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 500.00,
      "type": "expense",
      "category": "food",
      "date": "2024-03-22",
      "description": "Grocery shopping",
      "createdAt": "2024-03-22T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "pages": 15
  }
}
```

**Frontend Implementation**:
```javascript
// src/pages/Transactions.jsx
const response = await transactionsAPI.getAll({
  type: filters.type,
  category: filters.category,
  searchTerm: filters.searchTerm,
  page: pagination.page,
  limit: pagination.limit
});
const { transactions, pagination } = response.data;
```

---

### 2. Get Single Transaction
```
GET /transactions/:id
```

**Example**: `GET /transactions/550e8400-e29b-41d4-a716-446655440000`

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 500.00,
  "type": "expense",
  "category": "food",
  "date": "2024-03-22",
  "description": "Grocery shopping",
  "createdAt": "2024-03-22T10:30:00Z",
  "updatedAt": "2024-03-22T10:30:00Z"
}
```

**Frontend Implementation**:
```javascript
// src/pages/EditTransaction.jsx
const response = await transactionsAPI.getById(transactionId);
const transaction = response.data;
setFormData(transaction);
```

---

### 3. Create Transaction
```
POST /transactions
```

**Request Body**:
```json
{
  "amount": 500.00,
  "type": "expense",
  "category": "food",
  "date": "2024-03-22",
  "description": "Weekly grocery shopping"
}
```

**Response** (201 Created):
```json
{
  "id": "new-uuid",
  "amount": 500.00,
  "type": "expense",
  "category": "food",
  "date": "2024-03-22",
  "description": "Weekly grocery shopping",
  "createdAt": "2024-03-22T10:30:00Z"
}
```

**Frontend Implementation**:
```javascript
// src/pages/AddTransaction.jsx
await transactionsAPI.create({
  amount: parseFloat(formData.amount),
  type: formData.type,
  category: formData.category,
  date: formData.date,
  description: formData.description
});
// Show success message
// Redirect to dashboard
```

---

### 4. Update Transaction
```
PUT /transactions/:id
```

**Request Body**: Same as Create

**Response** (200 OK): Updated transaction object

**Frontend Implementation**:
```javascript
// src/pages/EditTransaction.jsx
await transactionsAPI.update(transactionId, {
  amount: parseFloat(formData.amount),
  type: formData.type,
  category: formData.category,
  date: formData.date,
  description: formData.description
});
// Show success message
// Redirect to dashboard
```

---

### 5. Delete Transaction
```
DELETE /transactions/:id
```

**Request Body**: None

**Response** (200 OK):
```json
{
  "message": "Transaction deleted successfully"
}
```

**Frontend Implementation**:
```javascript
// src/components/dashboard/TransactionList.jsx
const handleDeleteTransaction = async (id) => {
  if (window.confirm('Are you sure?')) {
    await transactionsAPI.delete(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }
};
```

---

## 📊 Dashboard Endpoints

### 1. Get Dashboard Statistics
```
GET /dashboard/stats
```

**Response** (200 OK):
```json
{
  "balance": 50000.00,
  "income": 100000.00,
  "expenses": 50000.00,
  "balanceTrend": {
    "type": "up",
    "value": 15
  },
  "incomeTrend": {
    "type": "up",
    "value": 10
  },
  "expensesTrend": {
    "type": "down",
    "value": 5
  }
}
```

**Frontend Implementation**:
```javascript
// src/pages/Dashboard.jsx
const response = await dashboardAPI.getStats();
const stats = response.data;
setStats(stats);
```

---

### 2. Get Recent Transactions
```
GET /dashboard/recent-transactions
```

**Query Parameters**:
```
?limit=5  // Default: 5, Max: 50
```

**Response** (200 OK):
```json
[
  {
    "id": "uuid",
    "amount": 500.00,
    "type": "expense",
    "category": "food",
    "date": "2024-03-22",
    "description": "Grocery"
  },
  // ... more transactions
]
```

**Frontend Implementation**:
```javascript
// src/pages/Dashboard.jsx
const response = await dashboardAPI.getRecentTransactions(10);
const transactions = response.data;
setTransactions(transactions);
```

---

### 3. Get Category Statistics
```
GET /dashboard/category-stats
```

**Response** (200 OK):
```json
[
  {
    "name": "Food & Dining",
    "value": 5000
  },
  {
    "name": "Travel",
    "value": 3000
  },
  {
    "name": "Utilities",
    "value": 2000
  }
  // ... more categories
]
```

**Frontend Implementation**:
```javascript
// src/pages/Dashboard.jsx
const response = await dashboardAPI.getCategoryStats();
const categoryData = response.data;
setCategoryData(categoryData);
// Pass to Recharts <PieChart>
```

---

### 4. Get Monthly Statistics
```
GET /dashboard/monthly-stats
```

**Response** (200 OK):
```json
[
  {
    "month": "January",
    "income": 10000,
    "expense": 5000
  },
  {
    "month": "February",
    "income": 12000,
    "expense": 6000
  },
  // ... more months
]
```

**Frontend Implementation**:
```javascript
// src/pages/Dashboard.jsx
const response = await dashboardAPI.getMonthlyStats();
const monthlyData = response.data;
setMonthlyData(monthlyData);
// Pass to Recharts <BarChart>
```

---

## 🛠️ API Client Setup

### src/services/api.js

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API groups
export const authAPI = { ... };
export const transactionsAPI = { ... };
export const dashboardAPI = { ... };
```

---

## 📡 Error Handling

### Standard Error Response
```json
{
  "message": "Error description",
  "status": 400 | 401 | 404 | 500,
  "error": "ErrorType"
}
```

### Frontend Error Handling
```javascript
try {
  const response = await transactionsAPI.create(data);
  // Success - update UI
} catch (error) {
  const errorMessage = error.response?.data?.message 
    || 'An error occurred';
  setError(errorMessage);
  console.error('API Error:', error);
}
```

### Common Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid token)
- **404** - Not Found
- **500** - Server Error

---

## 🔄 Request/Response Flow

```
Frontend Component
    ↓
Call API Function (transactionsAPI.create())
    ↓
Axios Request with Token
    ↓
Backend Processing
    ↓
Axios Response Interceptor
    ↓
Return Data to Component
    ↓
Update React State
    ↓
Component Re-renders
```

---

## 💡 Tips & Best Practices

1. **Always handle errors**
   ```javascript
   try { ... } catch (error) { ... }
   ```

2. **Show loading states**
   ```javascript
   const [loading, setLoading] = useState(false);
   ```

3. **Use environment variables**
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;
   ```

4. **Request debouncing** (for search)
   ```javascript
   const [searchTerm, setSearchTerm] = useState('');
   useEffect(() => {
     const timer = setTimeout(() => {
       // fetch with searchTerm
     }, 300);
   }, [searchTerm]);
   ```

5. **Validation before API call**
   ```javascript
   if (!email || !password) {
     setError('Please fill all fields');
     return;
   }
   ```

---

## 🧪 Testing API Integration

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Transactions
curl -X GET http://localhost:5000/api/transactions \
  -H "Authorization: Bearer <token>"
```

### Using Postman
1. Create collection
2. Add requests for each endpoint
3. Set token in Authorization tab
4. Test request/response

---

## 📚 Additional Resources

- Backend API Documentation (if available)
- Axios Documentation: https://axios-http.com
- HTTP Status Codes: https://httpstatuses.com
- JSON Format: https://www.json.org

---

**Your frontend is ready to integrate with any REST API following this pattern!** 🚀
