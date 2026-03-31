# Expense Tracker - Frontend Application

A modern, responsive expense tracking application built with React.js, Tailwind CSS, and Recharts. Track your income and expenses with beautiful charts, detailed analytics, and a sleek user interface.

## 🎯 Features

✅ **User Authentication**
- Secure login and registration
- Token-based authentication (JWT)
- Protected routes
- Auto-logout on token expiration

✅ **Dashboard**
- Overview of total balance, income, and expenses
- Real-time statistics with trend indicators
- Category-wise expense breakdown (Pie Chart)
- Monthly income vs expenses (Bar Chart)
- Recent transactions at a glance

✅ **Transaction Management**
- Add new transactions (Income/Expense)
- Edit existing transactions
- Delete transactions with confirmation
- Filter by type and category
- Search transactions

✅ **Income & Expense Tracking**
- Dedicated pages for income and expense tracking
- Category-wise statistics
- Month-wise analysis
- Visual representations with charts

✅ **User Interface**
- Responsive design (Mobile, Tablet, Desktop)
- Dark mode toggle
- Clean, modern dashboard
- Smooth animations and transitions
- Professional color scheme
- Sidebar navigation
- Top navbar with logout

✅ **Icons & Visual Elements**
- React Icons for consistent iconography
- Beautiful badge system for categories
- Loading spinners and alerts
- Toast-style notifications

---

## 📋 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React.js 19** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client |
| **Recharts** | Chart visualizations |
| **React Icons** | Icon library |
| **Framer Motion** | Animations (optional) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- Backend API running on `http://localhost:5000` (or configured URL)

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   copy .env.example .env.local
   ```
   Or manually create `.env.local`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/                 # Reusable components
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── Sidebar.jsx        # Side navigation menu
│   │   ├── StatCard.jsx       # Statistics card component
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── Alert.jsx          # Alert/notification component
│   │   └── TransactionList.jsx # Transaction table
│   │
│   └── dashboard/             # Dashboard-specific components
│       ├── Charts.jsx         # Pie & Bar charts
│       └── TransactionList.jsx
│
├── pages/
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Registration page
│   ├── Dashboard.jsx          # Main dashboard
│   ├── Transactions.jsx       # All transactions view
│   ├── AddTransaction.jsx     # Add new transaction
│   ├── EditTransaction.jsx    # Edit transaction
│   ├── Income.jsx             # Income tracking page
│   ├── Expenses.jsx           # Expense tracking page
│   └── Settings.jsx           # Settings page
│
├── context/
│   ├── AuthContext.jsx        # Authentication state management
│   └── AppContext.jsx         # App-wide state (dark mode, etc)
│
├── services/
│   └── api.js                 # API calls with Axios
│
├── utils/
│   ├── constants.js           # Constants, categories, API endpoints
│   └── ProtectedRoute.jsx     # Route protection wrapper
│
├── App.jsx                    # Main app component with routing
├── App.css                    # App styles
├── main.jsx                   # Entry point
└── index.css                  # Global Tailwind styles
```

---

## 🔑 Core Components

### Authentication Context (`AuthContext.jsx`)
Manages user authentication state:
- `user` - Current user object
- `token` - JWT authentication token
- `isAuthenticated` - Boolean flag
- Methods: `login()`, `logout()`, `register()`

### App Context (`AppContext.jsx`)
Application-wide state:
- `transactions` - List of transactions
- `darkMode` - Dark mode toggle state
- Methods: `toggleDarkMode()`

### API Service (`api.js`)
Centralized API calls using Axios:
- Authentication endpoints
- Transaction CRUD operations
- Dashboard statistics
- Auto token injection in headers
- Auto logout on 401 errors

---

## 📱 Pages & Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/login` | Login | ❌ | User login page |
| `/register` | Register | ❌ | User registration page |
| `/dashboard` | Dashboard | ✅ | Main dashboard overview |
| `/transactions` | Transactions | ✅ | All transactions list |
| `/add-transaction` | AddTransaction | ✅ | Add new transaction |
| `/edit-transaction/:id` | EditTransaction | ✅ | Edit existing transaction |
| `/income` | Income | ✅ | Income tracking page |
| `/expenses` | Expenses | ✅ | Expense tracking page |
| `/settings` | Settings | ✅ | User settings |

---

## 🎨 Styling System

### Tailwind CSS Configuration
- Custom color scheme with primary, success, danger colors
- Dark mode support with `dark:` prefix
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)
- **Info**: `#3b82f6` (Blue)

### Dark Mode
Toggle using the sun/moon icon in navbar. State persists in localStorage.

---

## 🔌 API Integration

### Base URL
```javascript
http://localhost:5000/api
```

### Authentication
Token is automatically added to all requests:
```javascript
Authorization: Bearer <token>
```

### Endpoints Used

**Authentication**
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user
- `POST /auth/logout` - Logout user

**Transactions**
- `GET /transactions` - Get all transactions (with filters)
- `GET /transactions/:id` - Get single transaction
- `POST /transactions` - Create transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

**Dashboard**
- `GET /dashboard/stats` - Get balance, income, expense stats
- `GET /dashboard/recent-transactions` - Get recent transactions
- `GET /dashboard/category-stats` - Get category breakdown
- `GET /dashboard/monthly-stats` - Get monthly income/expense

---

## 📊 Transaction Categories

```javascript
[
  { id: 'food', label: 'Food & Dining', color: '#FF6B6B' },
  { id: 'travel', label: 'Travel', color: '#4ECDC4' },
  { id: 'utilities', label: 'Utilities & Bills', color: '#FFE66D' },
  { id: 'entertainment', label: 'Entertainment', color: '#95E1D3' },
  { id: 'shopping', label: 'Shopping', color: '#F38181' },
  { id: 'salary', label: 'Salary', color: '#52B788' },
  { id: 'freelance', label: 'Freelance', color: '#74C0FC' },
  { id: 'investment', label: 'Investment', color: '#B197FC' },
  { id: 'other', label: 'Other', color: '#9CA3AF' },
]
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Hot Module Replacement (HMR)
Vite provides automatic HMR. Any changes to components will reflect instantly in the browser.

### Environment Variables
Create a `.env.local` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🔐 Authentication Flow

1. User fills login/register form
2. Credentials sent to backend
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token added to all subsequent API requests
6. On 401 response, user is logged out automatically
7. Protected routes redirect to login if not authenticated

---

## 💾 Local Storage

The application uses localStorage to persist:
- **token** - JWT authentication token
- **user** - User object (name, email, etc)
- **darkMode** - Dark mode preference (true/false)

---

## 📊 Data Flow

```
User Input → React Component
    ↓
State Update (useState/useContext)
    ↓
API Call (Axios)
    ↓
Backend Processing
    ↓
Response Handling
    ↓
UI Update
```

---

## 🚨 Error Handling

- API errors display as alert notifications
- Form validation with user feedback
- Loading states while fetching data
- Confirmation dialogs for destructive actions
- Auto logout on authentication failures

---

## 🌐 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Hidden sidebar on mobile (toggle with hamburger menu)
- Optimized navigation
- Touch-friendly buttons
- Responsive grid layouts

---

## 🔄 State Management Strategy

### Context API
- **AuthContext**: User authentication state
- **AppContext**: Global app state (dark mode, transactions)

### Local Component State
- Form inputs
- UI toggles
- Loading/error states

### localStorage
- Authentication token
- User preferences
- Last saved state

---

## 📦 Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Build Optimizations
- Code splitting
- Tree shaking
- CSS minification
- JavaScript bundling and minification
- Image optimization

---

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension
- Network tab for API calls
- Application tab for localStorage
- Console for error messages

### Debug Mode
Enable verbose logging by checking browser console during development.

---

## 🔑 Demo Credentials

For testing purposes:
```
Email: demo@example.com
Password: Demo@123
```

---

## 📝 Best Practices Implemented

✅ Component composition and reusability
✅ Proper error handling and validation
✅ Responsive design approach
✅ Dark mode support
✅ Secure authentication pattern
✅ Efficient state management
✅ Clean code organization
✅ Performance optimization
✅ Accessibility considerations
✅ User feedback mechanisms

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Support

For issues or questions, please contact the development team.

---

## 🎉 What's Next?

Planned future enhancements:
- [ ] Budget setting and tracking
- [ ] Recurring transactions
- [ ] Export to PDF/CSV
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reports
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] User profile avatars
- [ ] Social sharing features

---

**Happy tracking! 🚀**
