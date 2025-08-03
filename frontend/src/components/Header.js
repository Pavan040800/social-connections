import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setNotifications(data.filter(n => !n.is_read));
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    await fetch(`http://localhost:5000/api/notifications/read/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
            <span>SocialConnections</span>
          </Link>

          <nav className="nav-desktop">
            {!isLoggedIn && (
              <>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
              </>
            )}
            {isLoggedIn ? (
              <>
                <Link to="/user/dashboard">Dashboard</Link>
                <Link to="/all_activities">All</Link>
                <Link to="/activity_form">Create</Link>
                <Link to="/activities">My Activities</Link>
                <Link to="/my-connections">Connections</Link>
                <div className="notification-wrapper">
                  <button className="bell-btn" onClick={() => setShowDropdown(!showDropdown)}>
                    🔔
                    {notifications.length > 0 && (
                      <span className="badge">{notifications.length}</span>
                    )}
                  </button>
                  {showDropdown && (
                    <div className="dropdown">
                      {notifications.length === 0 ? (
                        <p>No new notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className="dropdown-item">
                            <p>{n.message}</p>
                            <button onClick={() => markAsRead(n.id)}>Mark as read</button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="nav-link-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>

          <div className="join-button-desktop">
            {!isLoggedIn && (
              <Button to="/contact" variant="outline-white">Join Now</Button>
            )}
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
