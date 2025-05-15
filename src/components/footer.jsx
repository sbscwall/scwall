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
        <p className="footer-text"> Scwall provides data-driven tools and insights to assist with real estate investment decisions. However, Scwall does not provide financial, investment, or legal advice. All investment decisions are made at your own discretion and risk. Real estate investing involves significant risk, including the loss of capital. Always consult with a professional financial advisor or legal expert before making any investment decisions. The information on this platform is intended for general informational purposes only and should not be considered as professional advice.</p>

      </div>
    </footer>
  );
};

export default Footer;
