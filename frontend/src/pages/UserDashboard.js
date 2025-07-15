import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import './UserDashboard.css';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [hobbies, setHobbies] = useState({
    hobby1: '',
    hobby2: '',
    hobby3: '',
    hobby4: '',
    hobby5: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user hobbies and name
  useEffect(() => {
    fetch('http://localhost:5000/api/user/hobbies/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUserName(data.name || '');
        setHobbies({
          hobby1: data.hobby1 || '',
          hobby2: data.hobby2 || '',
          hobby3: data.hobby3 || '',
          hobby4: data.hobby4 || '',
          hobby5: data.hobby5 || '',
        });
      });

    fetch('http://localhost:5000/api/user/suggestions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setSuggestions);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHobbies(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveHobbies = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/user/hobbies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hobbies),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Hobbies updated!');
    } else {
      alert(data.message || 'Failed to save hobbies');
    }
  };

  const userHobbies = Object.values(hobbies).filter(Boolean);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userName} 👋</h1>

      {/* Hobby Form */}
      <Card className="mb-6 hobbies-section">
        <h2 className="hobbies-heading">Your Hobbies</h2>
        <form className="hobbies-form" onSubmit={handleSaveHobbies}>
          <input type="text" name="hobby1" placeholder="Enter hobby1" value={hobbies.hobby1} onChange={handleChange} required />
          <input type="text" name="hobby2" placeholder="Enter hobby2" value={hobbies.hobby2} onChange={handleChange} required />
          <input type="text" name="hobby3" placeholder="Enter hobby3" value={hobbies.hobby3} onChange={handleChange} />
          <input type="text" name="hobby4" placeholder="Enter hobby4" value={hobbies.hobby4} onChange={handleChange} />
          <input type="text" name="hobby5" placeholder="Enter hobby5" value={hobbies.hobby5} onChange={handleChange} />
          <Button type="submit" className="hobbies-submit">Save Hobbies</Button>
        </form>

        {/* Display Existing Hobbies */}
        {userHobbies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Your Saved Hobbies</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {userHobbies.map((hobby, idx) => (
                <li key={idx}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Friend Suggestions */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Friends with Similar Hobbies</h2>
        <ul className="space-y-2">
          {suggestions.length === 0 ? (
            <p className="text-gray-500">No suggestions yet. Add hobbies to get started!</p>
          ) : (
            suggestions.map((user, idx) => (
              <li key={idx} className="border p-3 rounded">
                {user.name} — Shared Hobby: {user.hobby}
              </li>
            ))
          )}
        </ul>
      </Card>
    </div>
  );
};

export default UserDashboard;
