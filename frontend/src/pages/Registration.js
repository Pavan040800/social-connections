import React, { useState } from 'react';
import Button from '../components/Button';
import './auth.css';

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
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
              <Button type="submit" className="full-width">Register</Button>
            </form>
            <p className="auth-link">Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
