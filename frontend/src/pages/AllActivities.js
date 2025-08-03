import React, { useEffect, useState } from 'react';
import './AllActivities.css';

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/activities/public')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error('Failed to fetch public activities:', err));
  }, []);

  const handleConnect = async (activityId) => {
    try {
      const res = await fetch('http://localhost:5000/api/connections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ activity_id: activityId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(`✅ Connected to activity #${activityId}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="public-activities">
      <h2>All Shared Activities</h2>
      {message && <p className="status-message">{message}</p>}
      {activities.length === 0 ? (
        <p>No activities posted yet.</p>
      ) : (
        activities.map(activity => (
          <div key={activity.id} className="activity-card">
            <h3>{activity.activity_type} at {activity.location}</h3>
            <p>{activity.activity_text}</p>
            <p><strong>Time:</strong> {new Date(activity.activity_time).toLocaleString()}</p>
            <p className="posted-by">Posted by: {activity.User?.name || 'Unknown'}</p>
            <button className="connect-btn" onClick={() => handleConnect(activity.id)}>
              Connect
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AllActivities;
