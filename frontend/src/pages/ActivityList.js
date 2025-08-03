import React, { useEffect, useState } from 'react';
import './ActivityList.css';


const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        activity_text: '',
        activity_type: '',
        location: '',
        activity_time: ''
    });

    const token = localStorage.getItem('token');

    // Fetch all activities
    const fetchActivities = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/activities', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setActivities(data);
        } catch (err) {
            console.error('Error fetching activities:', err);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/activities/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchActivities();
        } catch (err) {
            console.error('Error deleting activity:', err);
        }
    };

    const handleEditClick = (activity) => {
        setEditingId(activity.id);
        setEditForm({ ...activity });
    };

    const handleUpdate = async () => {
        try {
            await fetch(`http://localhost:5000/api/activities/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            setEditingId(null);
            fetchActivities();
        } catch (err) {
            console.error('Error updating activity:', err);
        }
    };

    return (
        <div className="activity-list">
            <h2>Your Shared Activities</h2>
            {activities.map(activity => (
                <div key={activity.id} className="activity-card">
                    {editingId === activity.id ? (
                        <div className="edit-form">
                            <label>
                                Activity Text
                                <textarea
                                    value={editForm.activity_text}
                                    onChange={e => setEditForm({ ...editForm, activity_text: e.target.value })}
                                />
                            </label>
                            <label>
                                Activity Type
                                <input
                                    type="text"
                                    value={editForm.activity_type}
                                    onChange={e => setEditForm({ ...editForm, activity_type: e.target.value })}
                                />
                            </label>
                            <label>
                                Location
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                />
                            </label>
                            <label>
                                Time
                                <input
                                    type="datetime-local"
                                    value={editForm.activity_time?.slice(0, 16)}
                                    onChange={e => setEditForm({ ...editForm, activity_time: e.target.value })}
                                />
                            </label>
                            <div className="edit-buttons">
                                <button className="save-btn" onClick={handleUpdate}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3>{activity.activity_type} at {activity.location}</h3>
                            <p>{activity.activity_text}</p>
                            <p><strong>Time:</strong> {new Date(activity.activity_time).toLocaleString()}</p>
                            <div className="action-buttons">
                                <button onClick={() => handleEditClick(activity)}>Edit</button>
                                <button onClick={() => handleDelete(activity.id)}>Delete</button>
                            </div>
                        </>
                    )}

                </div>
            ))}
        </div>
    );
};

export default ActivityList;
