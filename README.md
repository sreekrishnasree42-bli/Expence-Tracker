# 💰 Expense Tracker

A modern, full-stack expense tracking application built with React, Node.js, and MongoDB. Features a beautiful SaaS-style dashboard with real-time analytics, transaction management, and comprehensive financial insights.

![Status](https://img.shields.io/badge/status-active-success.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Page Overview](#page-overview)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

### Dashboard & Analytics
- **Real-time Dashboard** - View balance, income, and expense summaries at a glance
- **Interactive Charts** - Pie charts for expense categories, bar charts for monthly trends
- **Recent Transactions** - Quick view of latest transactions with sorting and filtering
- **Financial Trends** - Track spending patterns and income trends over time

### Transaction Management
- **Add Transactions** - Create income or expense entries with categories and descriptions
- **Edit Transactions** - Update transaction details anytime
- **Delete Transactions** - Remove entries with confirmation
- **Filter & Search** - Filter by type, category, amount, and date range
- **Transaction History** - Complete view of all transactions with pagination

### Categories & Organization
- **Pre-defined Categories** - Groceries, Utilities, Entertainment, Transportation, Healthcare, Food, Salary, Bonus, Investment, and more
- **Category Analytics** - Visualize spending by category with percentage breakdown
- **Color-coded Categories** - Easy identification with unique colors for each category

### Income & Expense Pages
- **Income Tracking** - Monitor all income sources with detailed breakdown
- **Expense Tracking** - Track all expenses with category-wise analysis
- **Monthly Statistics** - View monthly income and expense totals
- **Comparison Charts** - Visualize income vs expense trends

### Authentication & Security
- **User Registration** - Create new account with email validation
- **Secure Login** - JWT-based authentication
- **Protected Routes** - Role-based access control
- **Session Management** - Auto logout on token expiry

### UI/UX Features
- **Modern Design** - SaaS-inspired clean and professional interface
- **Dark Mode** - Easy on the eyes with beautiful dark theme
- **Smooth Animations** - Framer Motion animations for enhanced interactivity
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Loading States** - Skeleton loaders for better perceived performance
- **Toast Notifications** - Real-time feedback for user actions

### Settings & Preferences
- **Account Management** - Edit profile and change password
- **Notification Preferences** - Control email and push notifications
- **Security Settings** - 2FA and session management
- **Appearance Settings** - Theme and color customization

---

## 🛠 Tech Stack

### Frontend
- **React 19.2.4** - UI framework
- **Vite 8.0.1** - Fast build tool and dev server
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **Framer Motion 12.38.0** - Animation library
- **Recharts 3.8.0** - Chart library for visualizations
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons 5.6.0** - Icon library

### Backend
- **Node.js/Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Custom Middleware** - Authentication and error handling

### Development Tools
- **ESLint** - Code quality and style checking
- **Npm** - Package management
- **Git** - Version control

---

## 📁 Project Structure

```
Expense-Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── transactionController.js
│   │   ├── analyticsController.js
│   │   └── exportController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Transaction.js       # Transaction schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── exportRoutes.js
│   ├── utils/
│   │   ├── emailService.js      # Email notifications
│   │   └── validation.js        # Input validation
│   ├── .env                     # Environment variables
│   ├── server.js                # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── Skeleton.jsx
│   │   │   └── dashboard/
│   │   │       ├── Charts.jsx
│   │   │       └── TransactionList.jsx
│   │   ├── context/
│   │   │   ├── AppContext.jsx   # Global app state
│   │   │   └── AuthContext.jsx  # Auth state
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Income.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── AddTransaction.jsx
│   │   │   ├── EditTransaction.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── api.js          # API client with interceptors
│   │   ├── styles/             # CSS files for each page
│   │   ├── utils/
│   │   │   ├── constants.js    # Categories, transaction types
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                    # Environment variables
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Expense-Tracker.git
cd Expense-Tracker
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# See Configuration section below

# Start the backend server
npm start
# Server runs on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# Copy the template from SETUP.md or create manually

# Start the development server
npm run dev
# Frontend runs on http://localhost:5173 (or next available port)
```

---

## ⚙️ Configuration

### Backend (.env)

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# JWT Secret (use a strong, random string)
JWT_SECRET=your_super_secret_key_change_this_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Email Notification Flags
SEND_WELCOME_EMAIL=true
SEND_TRANSACTION_EMAIL=false
SEND_MONTHLY_REPORT=true
```

#### MongoDB Atlas Setup:
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user and whitelist your IP
4. Copy the connection string and add to `.env`

### Frontend (.env)

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Output: Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:5173
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: { success: true, token: "...", user: {...} }
```

### Transaction Endpoints

#### Get All Transactions
```
GET /api/transactions?type=income&category=salary&limit=50&page=1
Headers: Authorization: Bearer {token}

Response: {
  success: true,
  count: 10,
  total: 50,
  pages: 5,
  data: [...]
}
```

#### Create Transaction
```
POST /api/transactions
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2024-01-15",
  "description": "Monthly salary"
}

Response: { success: true, data: {...} }
```

#### Update Transaction
```
PUT /api/transactions/:id
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 6000,
  "description": "Updated description"
}

Response: { success: true, data: {...} }
```

#### Delete Transaction
```
DELETE /api/transactions/:id
Headers: Authorization: Bearer {token}

Response: { success: true, message: "Transaction deleted" }
```

### Dashboard Endpoints

#### Get Dashboard Stats
```
GET /api/dashboard/stats
Headers: Authorization: Bearer {token}

Response: {
  success: true,
  data: {
    balance: 25000,
    income: 50000,
    expenses: 25000,
    balanceTrend: { type: "up", value: 12 },
    incomeTrend: { type: "up", value: 8 },
    expensesTrend: { type: "down", value: 5 }
  }
}
```

#### Get Recent Transactions
```
GET /api/dashboard/recent-transactions?limit=10
Headers: Authorization: Bearer {token}

Response: { success: true, data: [...] }
```

#### Get Category Statistics
```
GET /api/dashboard/category-stats
Headers: Authorization: Bearer {token}

Response: {
  success: true,
  data: [
    { name: "Groceries", value: 5000 },
    { name: "Utilities", value: 3000 },
    ...
  ]
}
```

#### Get Monthly Statistics
```
GET /api/dashboard/monthly-stats
Headers: Authorization: Bearer {token}

Response: {
  success: true,
  data: [
    { month: "Jan", income: 50000, expense: 25000 },
    ...
  ]
}
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  amount: Number (required),
  type: String (enum: ['income', 'expense']),
  category: String (required),
  date: Date (default: current date),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📖 Usage Guide

### Creating Your First Transaction

1. **Login** - Use your registered credentials
2. **Click "Add Transaction"** - Navigate to add a new transaction
3. **Fill Details**:
   - Select Type: Income or Expense
   - Choose Category: Salary, Groceries, Entertainment, etc.
   - Enter Amount: How much money
   - Pick Date: When the transaction occurred
   - Add Description: Optional notes
4. **Save** - Click "Save Transaction"

### Viewing Analytics

1. **Dashboard** - Home page shows summary cards and charts
2. **Charts Section**:
   - **Pie Chart** - Shows expense breakdown by category
   - **Bar Chart** - Monthly income vs expense comparison
3. **Click Category** - Drill down to see specific category transactions

### Managing Transactions

1. **View All** - Go to Transactions page
2. **Filter** - Filter by type or category
3. **Edit** - Click the edit icon to update
4. **Delete** - Click delete with confirmation

### Tracking Income & Expenses

1. **Income Page** - View all income sources
2. **Expenses Page** - View all expenses
3. **Statistics** - See monthly totals and trends
4. **Export** - Download data as CSV (future feature)

### Customizing Settings

1. **Settings Page** - Access from navbar
2. **Account Tab** - Edit profile and password
3. **Notifications Tab** - Configure email and push alerts
4. **Security Tab** - Manage 2FA and connected apps
5. **Appearance Tab** - Toggle dark mode and theme

---

## 📄 Page Overview

### Dashboard
- Real-time financial overview
- Summary cards (Balance, Income, Expenses)
- Category breakdown pie chart
- Monthly income vs expense bar chart
- Recent transactions table
- Quick action buttons

### Transactions
- Complete transaction list with filtering
- Search and sort capabilities
- Edit and delete options
- Pagination for large datasets
- Transaction details view

### Income
- List of all income transactions
- Category-wise breakdown
- Monthly income statistics
- Total income calculation

### Expenses
- List of all expense transactions
- Spending by category
- Monthly expense analysis
- Total expense tracking

### Add Transaction
- Form to create new transaction
- Form validation
- Category selection with colors
- Date picker
- Amount input with validation

### Edit Transaction
- Pre-filled form with current data
- Update any field
- Confirmation before save
- Quick delete option

### Login/Register
- Secure authentication forms
- Email validation
- Password strength indicator
- Remember me option

### Settings
- Account management
- Notification preferences
- Security configuration
- Theme customization
- Account deletion option

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=3001
```

### MongoDB Connection Error
- Verify MONGO_URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure network is accessible
- Verify username and password

### CORS Error
- Check FRONTEND_URL in backend .env
- Verify VITE_API_URL in frontend .env
- Ensure both match actual URLs

### Frontend Not Loading API Data
- Check browser console for errors
- Verify backend is running on correct port
- Check API response structure
- Verify JWT token in localStorage

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Re-login to get fresh token
- Verify JWT_SECRET matches

### Charts Not Displaying
- Ensure data is being fetched correctly
- Check browser console for errors
- Verify Recharts library is installed
- Check data format matches chart expectations

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙋 Support

For questions or issues:
- Check [Troubleshooting](#troubleshooting) section
- Review API documentation
- Check component documentation
- Open an issue on GitHub

---

## 🎉 Changelog

### Version 1.0.0 (Current)
- ✅ Complete dashboard with analytics
- ✅ Transaction management (CRUD)
- ✅ User authentication with JWT
- ✅ Modern SaaS-style UI
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Category-based analytics
- ✅ Monthly statistics

---

**Made with ❤️ by the Expense Tracker Team**
