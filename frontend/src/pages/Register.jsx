import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Alert from '../components/common/Alert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import '../styles/Register.css';

const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', icon: FiUser, placeholder: 'Name' },
  { name: 'email', label: 'Email Address', type: 'email', icon: FiMail, placeholder: 'you@example.com' },
];

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, register, setLoading, loading, setError, error } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [passwordVisible, setPasswordVisible] = useState({ password: false, confirmPassword: false });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handlePasswordToggle = (field) => setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) return 'Please fill in all fields';
    if (password !== confirmPassword) return 'Passwords do not match';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      const { data: { user, token } } = await authAPI.register(formData.name, formData.email, formData.password);
      register(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Creating account..." />;

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          <header className="register-header">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Start tracking your expenses today</p>
          </header>

          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} style={{ marginBottom: '1.5rem' }} />
          )}

          <form onSubmit={handleSubmit}>
            {formFields.map(({ name, label, type, icon: Icon, placeholder }) => (
              <div className="register-form-group" key={name}>
                <label className="register-label">{label}</label>
                <div className="register-input-wrapper">
                  <Icon size={20} />
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="register-input"
                  />
                </div>
              </div>
            ))}

            {['password', 'confirmPassword'].map((field) => (
              <div className="register-form-group" key={field}>
                <label className="register-label">{field === 'password' ? 'Password' : 'Confirm Password'}</label>
                <div className="register-input-wrapper">
                  <FiLock size={20} />
                  <input
                    type={passwordVisible[field] ? 'text' : 'password'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="register-input"
                  />
                  <button type="button" onClick={() => handlePasswordToggle(field)} className="register-toggle-btn">
                    {passwordVisible[field] ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
            ))}

            <div className="register-checkbox-group">
              <input type="checkbox" id="terms" className="register-checkbox" />
              <label htmlFor="terms" className="register-checkbox-label">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" disabled={loading} className="register-submit-btn">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="register-divider">
            <div className="register-divider-line" />
            <span className="register-divider-text">Already have an account?</span>
          </div>

          <Link to="/login" className="register-signin-btn">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
