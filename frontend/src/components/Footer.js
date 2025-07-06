import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SocialConnections</h3>
            <p>Connecting people through shared passions and interests.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h4>Connect With Us</h4>
            <div className="footer-icons">
              <a href="#"><span className="sr-only">Facebook</span><svg className="icon" viewBox="0 0 24 24"><path d="..." /></svg></a>
              <a href="#"><span className="sr-only">Twitter</span><svg className="icon" viewBox="0 0 24 24"><path d="..." /></svg></a>
              <a href="#"><span className="sr-only">Instagram</span><svg className="icon" viewBox="0 0 24 24"><path d="..." /></svg></a>
            </div>
            <p>Subscribe to our newsletter for updates</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SocialConnections. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
