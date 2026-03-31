# Expense Tracker Backend API

A complete, advanced backend for an Expense Tracker application built with Node.js, Express.js, and MongoDB with analytics, export/import, and email notifications.

## Features

✨ **Complete CRUD Operations** - Create, read, update, and delete transactions
📊 **Advanced Analytics** - Dashboard summaries, monthly breakdowns, trends, and recommendations
📥 **Export/Import** - Export to CSV/JSON and import from JSON
📧 **Email Notifications** - Welcome emails, transaction notifications, monthly reports
🔐 **Secure Authentication** - JWT tokens with bcryptjs password hashing
✅ **Input Validation** - Comprehensive validation for all data
📱 **Pagination** - Built-in pagination for transaction listings

## Project Structure

```
backend/
├── config/
│   └── db.js                     # MongoDB connection
├── models/
│   ├── User.js                   # User model with authentication
│   └── Transaction.js            # Transaction model
├── controllers/
│   ├── authController.js         # Register & Login with validation
│   ├── transactionController.js  # Transaction CRUD with validation
│   ├── analyticsController.js    # Analytics & dashboard features
│   └── exportController.js       # Export/Import functionality
├── routes/
│   ├── authRoutes.js             # Auth endpoints (public)
│   ├── transactionRoutes.js      # Transaction endpoints (protected)
│   ├── analyticsRoutes.js        # Analytics endpoints (protected)
│   └── exportRoutes.js           # Export/Import endpoints (protected)
├── middleware/
│   ├── auth.js                   # JWT verification middleware
│   └── errorHandler.js           # Global error handling
├── utils/
│   ├── validation.js             # Input validation utilities
│   └── emailService.js           # Email notification service
├── server.js                     # Main server entry point
├── .env                          # Environment variables (pre-configured)
├── .gitignore                    # Git ignore rules
└── package.json                  # Dependencies & scripts
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account (optional, for email notifications)

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages:
- express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv, nodemailer, json2csv

### 2. Configure Environment Variables

Update the `.env` file with your settings:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# Authentication
JWT_SECRET=your_super_secret_key

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000

# Email Notification Flags
SEND_WELCOME_EMAIL=true
SEND_TRANSACTION_EMAIL=false
SEND_MONTHLY_REPORT=true
```

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 1. Authentication Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201 Created):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation:**
- Email must be valid format
- Password must be at least 6 characters
- Email must be unique
- All fields are required

### Login User
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 2. Transaction Endpoints (Protected)

### Get All Transactions
```
GET /api/transactions?limit=50&page=1&category=groceries&type=expense&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>

Query Parameters (all optional):
- limit: Number of results per page (default: 50)
- page: Page number (default: 1)
- category: Filter by category (groceries, utilities, entertainment, etc.)
- type: Filter by type (income or expense)
- startDate: Filter by start date (YYYY-MM-DD)
- endDate: Filter by end date (YYYY-MM-DD)

Response (200 OK):
{
  "success": true,
  "count": 10,
  "total": 25,
  "pages": 3,
  "currentPage": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439010",
      "amount": 500,
      "type": "expense",
      "category": "groceries",
      "date": "2024-03-22T00:00:00.000Z",
      "description": "Weekly grocery shopping",
      "createdAt": "2024-03-22T10:30:00.000Z",
      "updatedAt": "2024-03-22T10:30:00.000Z"
    }
  ]
}
```

**Valid Categories:**
- groceries, utilities, entertainment, transportation, healthcare, food, salary, bonus, investment, rent, insurance, education, personal, other

### Add New Transaction
```
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "amount": 500,
  "type": "expense",
  "category": "groceries",
  "date": "2024-03-22",
  "description": "Weekly grocery shopping"
}

Response (201 Created):
{
  "success": true,
  "message": "Transaction added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "amount": 500,
    "type": "expense",
    "category": "groceries",
    "date": "2024-03-22T00:00:00.000Z",
    "description": "Weekly grocery shopping",
    "createdAt": "2024-03-22T10:30:00.000Z",
    "updatedAt": "2024-03-22T10:30:00.000Z"
  }
}
```

**Validation:**
- amount must be a positive number
- type must be "income" or "expense"
- category must be from valid categories list
- date must be a valid date format

### Update Transaction
```
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

Body (all fields optional):
{
  "amount": 550,
  "category": "food",
  "description": "Updated grocery shopping"
}

Response (200 OK):
{
  "success": true,
  "message": "Transaction updated successfully",
  "data": { ... transaction object ... }
}
```

### Delete Transaction
```
DELETE /api/transactions/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {}
}
```

---

## 3. Analytics Endpoints (Protected)

### Get Dashboard Summary
```
GET /api/analytics/summary
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": {
    "totalIncome": 5000,
    "totalExpense": 2500,
    "netSavings": 2500,
    "transactionCount": 45,
    "categoryBreakdown": {
      "groceries": {
        "income": 0,
        "expense": 800,
        "count": 12
      },
      "salary": {
        "income": 5000,
        "expense": 0,
        "count": 1
      }
    }
  }
}
```

### Get Monthly Analytics
```
GET /api/analytics/monthly?year=2024&month=3
Authorization: Bearer <token>

Query Parameters (optional):
- year: Year (default: current year)
- month: Month 1-12 (default: current month)

Response (200 OK):
{
  "success": true,
  "month": "2024-03",
  "data": {
    "totalIncome": 5000,
    "totalExpense": 2000,
    "netSavings": 3000,
    "transactionCount": 25,
    "dailyBreakdown": {
      "2024-03-01": { "income": 0, "expense": 150 },
      "2024-03-02": { "income": 5000, "expense": 0 }
    },
    "categoryBreakdown": {
      "groceries": 500,
      "utilities": 200
    }
  }
}
```

### Get Category Analytics
```
GET /api/analytics/category?category=groceries
Authorization: Bearer <token>

Query Parameters (optional):
- category: Filter by specific category

Response (200 OK):
{
  "success": true,
  "data": {
    "groceries": {
      "income": 0,
      "expense": 1200,
      "count": 15,
      "percentage": "48.00"
    },
    "utilities": {
      "income": 0,
      "expense": 800,
      "count": 8,
      "percentage": "32.00"
    }
  }
}
```

### Get Spending Trends
```
GET /api/analytics/trends?months=6
Authorization: Bearer <token>

Query Parameters (optional):
- months: Number of months to show (default: 6)

Response (200 OK):
{
  "success": true,
  "data": {
    "2024-01": { "income": 5000, "expense": 2000 },
    "2024-02": { "income": 5000, "expense": 2200 },
    "2024-03": { "income": 5000, "expense": 2100 }
  }
}
```

### Get Budget Recommendations
```
GET /api/analytics/recommendations
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "totalExpense": 2500,
  "recommendations": [
    {
      "type": "warning",
      "category": "entertainment",
      "percentage": "35.20",
      "message": "Your entertainment spending is 35.20% of total expenses. Consider reducing it."
    },
    {
      "type": "info",
      "category": "food",
      "percentage": "25.50",
      "message": "Your food spending is 25.50% of total expenses."
    }
  ]
}
```

---

## 4. Export/Import Endpoints (Protected)

### Export as CSV
```
GET /api/export/csv?category=groceries&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>

Query Parameters (all optional):
- category: Filter by category
- startDate: From date (YYYY-MM-DD)
- endDate: To date (YYYY-MM-DD)

Response: CSV file download
```

**CSV Format:**
```
Date,Type,Category,Amount,Description,Created At
03/22/2024,expense,groceries,500,Weekly grocery shopping,3/22/2024, 10:30:00 AM
```

### Export as JSON
```
GET /api/export/json?category=groceries&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>

Query Parameters (all optional):
- category: Filter by category
- startDate: From date (YYYY-MM-DD)
- endDate: To date (YYYY-MM-DD)

Response (200 OK):
{
  "exportDate": "2024-03-22T15:30:00.000Z",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "summary": {
    "totalTransactions": 25,
    "totalIncome": 5000,
    "totalExpense": 2500
  },
  "transactions": [ ... array of transactions ... ]
}
```

### Import from JSON
```
POST /api/export/import-json
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "transactions": [
    {
      "amount": 500,
      "type": "expense",
      "category": "groceries",
      "date": "2024-03-22",
      "description": "Weekly shopping"
    },
    {
      "amount": 3000,
      "type": "income",
      "category": "salary",
      "date": "2024-03-01",
      "description": "Monthly salary"
    }
  ]
}

Response (201 Created):
{
  "success": true,
  "message": "Imported 2 transactions successfully",
  "data": {
    "importedCount": 2,
    "skippedCount": 0
  }
}
```

### Get Export History
```
GET /api/export/history
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": {
    "totalTransactions": 45,
    "dateRange": {
      "from": "03/01/2024",
      "to": "03/22/2024"
    },
    "totalIncome": 5000,
    "totalExpense": 2500,
    "exportFormats": ["csv", "json"]
  }
}
```

---

## Email Notifications

The system can send automated emails for:

### Welcome Email
- Sent automatically on user registration
- Controlled by `SEND_WELCOME_EMAIL` in .env

### Transaction Notifications
- Sent when a new transaction is added
- Controlled by `SEND_TRANSACTION_EMAIL` in .env

### Monthly Report
- Can be sent manually or scheduled
- Controlled by `SEND_MONTHLY_REPORT` in .env

### Setup Gmail for Email Service

1. Enable 2-factor authentication in Gmail
2. Create an App Password at https://myaccount.google.com/apppasswords
3. Update `.env`:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

### Add Transaction (use token from login)
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "type": "expense",
    "category": "groceries",
    "description": "Weekly shopping"
  }'
```

### Get Analytics
```bash
curl -X GET http://localhost:5000/api/analytics/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Export to CSV
```bash
curl -X GET http://localhost:5000/api/export/csv \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o transactions.csv
```

---

## Error Handling

### Response Format

All errors return appropriate HTTP status codes with consistent JSON format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid JWT token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  amount: Number (positive),
  type: String (enum: ['income', 'expense']),
  category: String,
  date: Date,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Validation Rules

### User Registration
- Name: Required, string
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters

### Transaction
- Amount: Required, positive number
- Type: Required, either "income" or "expense"
- Category: Required, from predefined categories
- Date: Optional, valid date format
- Description: Optional, string

### Categories
Valid transaction categories:
- groceries, utilities, entertainment, transportation, healthcare, food, salary, bonus, investment, rent, insurance, education, personal, other

---

## Security Features

✅ JWT authentication with 30-day expiration
✅ Password hashing with bcryptjs (10 salt rounds)
✅ Email validation
✅ User ownership verification for transactions
✅ Input sanitization to prevent XSS
✅ CORS enabled for secure cross-origin requests
✅ Protected routes requiring valid JWT

---

## Performance

- Database indexing on userId for fast queries
- Pagination support for large datasets
- Efficient aggregation pipelines for analytics
- Optimized MongoDB queries

---

## Troubleshooting

### MongoDB Connection Error
- Verify internet connection
- Check MONGO_URI in .env
- Ensure IP whitelist on MongoDB Atlas

### JWT Token Errors
- Token expires after 30 days
- Users must re-login for new token
- Check Authorization header format: `Bearer TOKEN`

### Email Service Not Working
- Verify EMAIL_USER and EMAIL_PASSWORD
- Enable Less secure apps (if not using App Password)
- Check SEND_*_EMAIL flags in .env

### Port Already in Use
- Change PORT in .env
- Or kill existing process using port 5000

---

## Development Workflow

1. Start server: `npm run dev`
2. Test endpoints using cURL or Postman
3. Check server logs for debugging
4. Validate input with validation utilities
5. Monitor database with MongoDB Atlas

---

## Version History

- v2.0.0 - Added analytics, export/import, email notifications, validation
- v1.0.0 - Initial release with CRUD operations and authentication

---

## License

ISC

---

## Support

For issues or questions, check the server logs for detailed error messages and stack traces.

