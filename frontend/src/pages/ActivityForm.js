import React, { useState } from 'react';
import './ActivityForm.css';
const ActivityForm = () => {
  const [form, setForm] = useState({
    activity_text: '',
    activity_type: '',
    location: '',
    activity_time: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to share activity');
      }

      setMessage('Activity shared successfully!');
      setForm({ activity_text: '', activity_type: '', location: '', activity_time: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <textarea
        required
        placeholder="Share your activity (e.g., I want to go walking at 6 AM...)"
        value={form.activity_text}
        onChange={e => setForm({ ...form, activity_text: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type (e.g., Walking, Yoga)"
        value={form.activity_type}
        onChange={e => setForm({ ...form, activity_type: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={e => setForm({ ...form, location: e.target.value })}
      />
      <input
        type="datetime-local"
        value={form.activity_time}
        onChange={e => setForm({ ...form, activity_time: e.target.value })}
      />
      <button type="submit">Share Activity</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ActivityForm;
