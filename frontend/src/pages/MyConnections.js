import React, { useEffect, useState } from 'react';

const MyConnections = () => {
  const [connections, setConnections] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/connections/mine', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setConnections(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load connections', err);
        setConnections([]);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="public-activities">
      <h2>My Connections</h2>
      {connections.length === 0 ? (
        <p>You haven't connected to any activities yet.</p>
      ) : (
        connections.map(({ id, Activity }) => (
          <div key={id} className="activity-card">
            <h3>{Activity?.activity_type || 'N/A'} at {Activity?.location || 'N/A'}</h3>
            <p>{Activity?.activity_text || 'No description provided.'}</p>
            <p><strong>Time:</strong> {
              Activity?.activity_time
                ? new Date(Activity.activity_time).toLocaleString()
                : 'Not provided'
            }</p>
            <p><strong>Owner:</strong> {Activity?.user?.name || 'Unknown'} ({Activity?.user?.email})</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyConnections;
