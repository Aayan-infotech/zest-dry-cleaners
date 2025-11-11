import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo text-black">
          <Link to="/">Zest Dry Cleaners</Link>
        </div>
        
        <div className="footer__copyright">
          © 2025 ABC. All Rights Reserved.
        </div>
        
        <div className="footer__social">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Facebook"
          >
            <Facebook />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Twitter"
          >
            <Twitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

