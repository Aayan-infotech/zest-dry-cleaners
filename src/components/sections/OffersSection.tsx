import React from 'react';
import Card from '../ui/Card';
import { Bolt, Star } from '@mui/icons-material';
import './OffersSection.css';
import { Container, Typography } from '@mui/material';
import cardImg from '../../assets/394f01afab8dd0807d2497c20f9aff975c62d919.png'; // woman holding clothes

interface Offer {
  id: number;
  title: string;
  discount: string;
  description: string;
  backgroundColor: string;
  icon: React.ReactNode;
}

const OffersSection: React.FC = () => {
  const offers: Offer[] = [
    {
      id: 1,
      title: 'Limited Offer',
      discount: '40% OFF',
      description: 'On First Cleaning Service',
      backgroundColor: 'radial-gradient(103.03% 103.03% at 0% 0%, #D080FF 0%, #6C5DD3 100%)',
      icon: <Bolt />,
    },
    {
      id: 2,
      title: 'New User',
      discount: '15% OFF',
      description: 'Winter Offers',
      backgroundColor: 'radial-gradient(103.03% 103.03% at 0% 0%, #7AC2EB 0%, #2299DD 100%)',
      icon: <Star />,
    },
    {
      id: 3,
      title: 'New User',
      discount: '23% OFF',
      description: 'Online Payment',
      backgroundColor: 'radial-gradient(103.03% 103.03% at 0% 0%, #8D7C3A 0%, #DDCD22 100%)',
      icon: <Star />,
    },
  ];

  return (
    <section className="offers-section">
      <Container maxWidth="xl">
        <div className="offers-section__container">
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
            }} 
            gutterBottom
          >
            Offers
          </Typography>

          <div className="offers-section__grid">
            {offers.map((offer) => (
              <Card key={offer.id} variant="colored" backgroundColor={offer.backgroundColor} className="offers-section__card">
                <div className="offers-section__content">
                  <div className="offers-section__text">
                    <span className="offers-section__brand">
                      Zest Dry Cleaners
                    </span>
                    <div className="offers-section__badge">
                      {offer.icon}
                      <span>{offer.title}</span>
                    </div>
                    <h3 className="offers-section__discount">{offer.discount}</h3>
                    <p className="offers-section__description">
                      {offer.description}
                    </p>
                  </div>
                  <div className="offers-section__image">
                    <img src={cardImg} alt="Offer" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OffersSection;
