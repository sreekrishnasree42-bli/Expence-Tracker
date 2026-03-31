// Authentication Controller
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword, sanitizeInput } = require('../utils/validation');
const { sendWelcomeEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email',
      });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Sanitize inputs
    name = sanitizeInput(name);
    email = email.toLowerCase().trim();

    // Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    // Send welcome email if enabled
    if (process.env.SEND_WELCOME_EMAIL === 'true') {
      await sendWelcomeEmail(user);
    }

    // Create token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }

    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email',
      });
    }

    // Sanitize email
    email = email.toLowerCase().trim();

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
