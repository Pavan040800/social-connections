import React, { useState } from 'react';
import Button from '../components/Button';
import './auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and role to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Redirect based on role
      if (data.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (data.role === 'user') {
        window.location.href = '/user/dashboard';
      } else {
        window.location.href = '/'; // fallback
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="container center">
          <h1>Welcome Back</h1>
          <p>Log in to connect with like-minded people.</p>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="container">
          <div className="auth-card">
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="error-text">{error}</p>}
              <Button type="submit" className="full-width" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <p className="auth-link">
              Don’t have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
