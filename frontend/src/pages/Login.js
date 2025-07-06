import React, { useState } from 'react';
import Button from '../components/Button';
import './auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
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
              <Button type="submit" className="full-width">Login</Button>
            </form>
            <p className="auth-link">Don’t have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
