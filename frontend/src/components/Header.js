import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Header.css';
import logo from '../assets/images/logo.png'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="logo">
  <img src={logo} alt="SocialConnections Logo" className="logo-image" />
  <span>SocialConnections</span>
</Link>



          <nav className="nav-desktop">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>

          <div className="join-button-desktop">
            <Button to="/contact" variant="outline-white">
              Join Now
            </Button>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="nav-mobile">
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/about" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            <Link to="/login" onClick={toggleMenu}>Login</Link>
            <Link to="/register" onClick={toggleMenu}>Register</Link>
            <Button to="/contact" fullWidth onClick={toggleMenu}>Join Now</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
