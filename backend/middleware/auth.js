// Authentication Middleware
const jwt = require('jsonwebtoken');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Accept header in both 'Bearer <token>' and raw token formats
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      token = parts[1];
    } else if (parts.length === 1) {
      token = parts[0];
    }
  }

  // As fallback for easy testing, allow ?token=<token> query param
  if (!token && req.query && req.query.token) {
    token = req.query.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Missing token in Authorization header or ?token query.',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

module.exports = { protect };
