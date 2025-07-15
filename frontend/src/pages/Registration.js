import React, { useState } from 'react';
import Button from '../components/Button';
import './auth.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token & role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Redirect based on role
      if (data.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/';
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
          <h1>Create Your Account</h1>
          <p>Join a community built on shared passions and meaningful connections.</p>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="container">
          <div className="auth-card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="error-text">{error}</p>}
              <Button type="submit" className="full-width" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            <p className="auth-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
