# Quick Start Guide - Expense Tracker Frontend

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create `.env.local` in the project root:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to `http://localhost:5173`

### Step 5: Login
Use demo credentials:
- **Email**: demo@example.com
- **Password**: Demo@123

---

## 📦 Installation (Detailed)

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Backend API running on port 5000

### Full Setup Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - react@19.2.4
   - react-dom@19.2.4
   - react-router-dom (navigation)
   - axios (HTTP requests)
   - tailwindcss (UI styling)
   - recharts (charts & graphs)
   - react-icons (icons)
   - framer-motion (animations)

3. **Update package.json (if needed)**
   The package has been updated with all dependencies. If you're setting up fresh, ensure your `package.json` includes:
   ```json
   {
     "dependencies": {
       "react": "^19.2.4",
       "react-dom": "^19.2.4",
       "react-router-dom": "^6.x",
       "axios": "^1.x",
       "tailwindcss": "^3.x",
       "recharts": "^2.x",
       "react-icons": "^5.x",
       "framer-motion": "^10.x"
     }
   }
   ```

4. **Create environment configuration**
   ```bash
   # On Windows
   copy .env.example .env.local
   
   # On Mac/Linux
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **Options:**
   - Local: `http://localhost:5000/api`
   - Development: `https://api-dev.example.com/api`
   - Production: `https://api.example.com/api`

5. **Verify Tailwind CSS Setup**
   Files should exist:
   - `tailwind.config.js` ✅
   - `postcss.config.js` ✅
   - `src/index.css` with @tailwind directives ✅

6. **Start development server**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Press h to show help
   ```

7. **Test the application**
   - Open http://localhost:5173 in your browser
   - You should see the Login page
   - Try logging in with demo credentials

---

## 🔧 Troubleshooting

### Port 5173 Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend API Not Connecting
1. Verify backend is running on port 5000
2. Check `.env.local` has correct API URL
3. Open browser DevTools → Network tab
4. Look for API requests and check status

### Dark Mode Not Working
- Clear browser localStorage
- Try in an incognito window
- Check if dark class is in HTML element

### Charts Not Displaying
1. Verify Recharts is installed: `npm list recharts`
2. Check browser console for errors
3. Ensure API returns correct data format

### Tailwind Styles Not Applied
```bash
# Rebuild Tailwind CSS
npm run dev -- --force
```

---

## 🚀 Development Workflow

### Running Development Server
```bash
npm run dev
```
- Hot Module Replacement (HMR) enabled
- Changes reflect instantly in browser
- Keep devtools console open for errors

### Building for Production
```bash
npm run build
```
Creates optimized `dist/` folder for deployment.

### Preview Production Build
```bash
npm run preview
```
Test production build locally.

### Run Linter
```bash
npm run lint
```
Check code quality and style issues.

---

## 📁 Directory Structure Reference

```
src/
├── components/
│   ├── common/           # Reusable, shared components
│   └── dashboard/        # Dashboard-specific components
├── pages/               # Full page components
├── context/             # React Context (State Management)
├── services/            # API & external services
├── utils/               # Helper functions & constants
├── App.jsx              # Main app component
├── main.jsx             # React DOM render
└── index.css            # Global Tailwind CSS
```

---

## 🔐 Authentication Setup

### How It Works
1. User submits login credentials
2. Axios makes POST request to `/api/auth/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. AuthContext updated with user data
6. User redirected to dashboard

### Token Management
- Token auto-injected in all API requests
- Expires based on backend configuration
- Auto logout on 401 response
- Token persists across page refreshes

### Logout
- Clears token from localStorage
- Clears user from context
- Redirects to login page

---

## 📊 Dashboard Overview

### What You'll See
1. **Statistics Cards**
   - Total Balance
   - Total Income
   - Total Expenses
   
2. **Charts**
   - Pie Chart: Expense breakdown by category
   - Bar Chart: Monthly income vs expenses
   
3. **Recent Transactions**
   - Last 10 transactions
   - Filter by type and category
   - Edit/Delete options

---

## 💾 Data Persistence

### localStorage Keys
- `token` - JWT authentication token
- `user` - User object (JSON stringified)
- `darkMode` - Boolean for dark mode state

### Clear All Data
```javascript
// In browser console
localStorage.clear();
location.reload();
```

---

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR_HEX',
    },
  },
}
```

### Add New Transaction Category
Edit `src/utils/constants.js`:
```javascript
export const CATEGORIES = [
  // ... existing categories
  { id: 'custom', label: 'Custom Category', color: '#COLOR_HEX' },
];
```

### Change API Base URL
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'YOUR_API_URL';
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Dashboard loads with data
- [ ] Dark mode toggle works
- [ ] Can add new transaction
- [ ] Can edit transaction
- [ ] Can delete transaction
- [ ] Charts display correctly
- [ ] Responsive on mobile
- [ ] Navigation works correctly

---

## 📈 Performance Tips

1. **Lazy Load Routes**
   Already implemented with React Router

2. **Code Splitting**
   Vite handles automatic code splitting

3. **Image Optimization**
   Use optimized images in assets folder

4. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

---

## 🔗 Useful Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Recharts Documentation](https://recharts.org)

---

## 📞 Getting Help

1. Check browser console for error messages
2. Review network tab in DevTools
3. Check localStorage for stored data
4. Verify backend API is running
5. Check environment variables
6. Review component props and data flow

---

## ✅ Setup Verification Checklist

- [ ] Node.js is installed (check: `node --version`)
- [ ] Dependencies installed (check: `npm list`)
- [ ] `.env.local` file created with API URL
- [ ] Tailwind CSS working (check: styled elements)
- [ ] Backend API running on correct port
- [ ] Development server running at localhost:5173
- [ ] Can see login page
- [ ] Can login with demo credentials
- [ ] Dashboard displays without errors
- [ ] Dark mode toggle works

If all items are checked, you're ready to go! 🎉

---

**Need more help? Check README.md for comprehensive documentation.**
