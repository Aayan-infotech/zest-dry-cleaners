import React from 'react';
import Button from '../ui/Button';
import { Tag, ContactMail } from '@mui/icons-material';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-section__container">
        <h2 className="about-section__title">Zest Dry Cleaning. We're here</h2>
        <p className="about-section__description">
          Hello, we are <span className='fw-bold text-black'>Zest Dry Cleaning</span>, trying to make an effort to put the right people for you to get the best results. Just insight.
        </p>
        <div className="about-section__actions">
          <Button variant="primary" size="medium" className="about-section__button">
            <Tag />
            <span>Insights</span>
          </Button>
          <Button variant="primary" size="medium" className="about-section__button">
            <ContactMail />
            <span>Contact</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

