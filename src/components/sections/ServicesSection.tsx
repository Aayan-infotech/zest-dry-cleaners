import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './ServicesSection.css';
import casualshirt from '../../assets/casual-t-shirt- 1.png';
import Group from '../../assets/Group.png';
import blanket from '../../assets/blanket 1.png';
import curtains from '../../assets/curtains 1.png';
import { Container } from '@mui/material';

interface Service {
  id: number;
  name: string;
  icon: string; // image URL
  iconBgColor: string;
  iconColor: string;
  bgColor: string;
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      name: 'Shirts',
      icon: casualshirt,
      iconBgColor: '#FAC7C7',
      bgColor: '#FCE9E9',
      iconColor: '#f44336',
    },
    {
      id: 2,
      name: 'Suits',
      icon: Group,
      iconBgColor: '#BCFFC9',
      bgColor: '#F0FAF2',
      iconColor: '#2d8659',
    },
    {
      id: 3,
      name: 'Bedsheets',
      icon: blanket,
      iconBgColor: '#CBF0FB',
      bgColor: '#E8F7FC',
      iconColor: '#2196f3',
    },
    {
      id: 4,
      name: 'Curtains',
      icon: curtains,
      iconBgColor: '#FBCBEF',
      bgColor: '#FCE8F5',
      iconColor: '#e91e63',
    },
  ];

  return (
    <section className="services-section">
      <Container maxWidth="xl">
        <div className="services-section__container">
          <div className="services-section__header">
            <h2 className="services-section__title">Services</h2>
            <Button variant="secondary" size="small" className="services-section__button rounded-pill">
              See All
            </Button>
          </div>
          <div className="services-section__grid">
            {services?.map((service) => (
              <Card key={service.id} className="services-section__card" backgroundColor={service.bgColor} >
                <div className="services-section__icon-wrapper" style={{ backgroundColor: service.iconBgColor, }}>
                  <div className="services-section__icon p-3" style={{ color: service.iconColor, }}>
                    <img src={service.icon} alt="Service Icon" />
                  </div>
                </div>
                <h3 className="services-section__card-title">{service.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;

