// FakeDoorFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '@/css/footer.css';
import '@/css/global.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
        <p className="footer-text">© 2025 Scwall. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
