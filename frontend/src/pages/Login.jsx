import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, setLoading, loading, setError, error } =
    useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      const { user, token } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Logging in..." />;

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Card */}
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your Expense Tracker account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{ marginBottom: '1.5rem' }}>
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="login-form-group">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrapper">
                <FiMail size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="login-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <FiLock size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-toggle-btn"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="login-checkbox-group">
              <input
                type="checkbox"
                id="remember"
                className="login-checkbox"
              />
              <label htmlFor="remember" className="login-checkbox-label">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span className="login-divider-text">Don't have an account?</span>
          </div>

          {/* Sign Up Link */}
          <Link to="/register" className="login-register-btn">
            Create Account
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="login-demo-box">
          <p className="login-demo-title">Demo Credentials:</p>
          <p className="login-demo-text">Email: demo@example.com</p>
          <p className="login-demo-text">Password: Demo@123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
