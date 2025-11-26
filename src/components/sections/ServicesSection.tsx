import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './ServicesSection.css';
import casualshirt from '../../assets/casual-t-shirt- 1.png';
import Group from '../../assets/Group.png';
import blanket from '../../assets/blanket 1.png';
import curtains from '../../assets/curtains 1.png';
import { CircularProgress, Container } from '@mui/material';
import { useCategoryServices } from '../../hooks/useCategoryServices';

interface Service {
  id: number;
  name: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  bgColor: string;
}

const staticServices: Service[] = [
  {
    icon: casualshirt,
    iconBgColor: '#FAC7C7',
    bgColor: '#FCE9E9',
    iconColor: '#f44336',
    id: 0,
    name: ''
  },
  {
    icon: Group,
    iconBgColor: '#BCFFC9',
    bgColor: '#F0FAF2',
    iconColor: '#2d8659',
    id: 0,
    name: ''
  },
  {
    icon: blanket,
    iconBgColor: '#CBF0FB',
    bgColor: '#E8F7FC',
    iconColor: '#2196f3',
    id: 0,
    name: ''
  },
  {
    icon: curtains,
    iconBgColor: '#FBCBEF',
    bgColor: '#FCE8F5',
    iconColor: '#e91e63',
    id: 0,
    name: ''
  },
];

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategoryServices();

  const services = useMemo(() => {
    return categories.map((cat: any, index: number) => ({
      ...cat,
      ...staticServices[index % staticServices.length],
    }));
  }, [categories]);

  const displayServices = services.slice(0, 4);
  const totalCount = services.length;

  return (
    <section className="services-section">
      <Container maxWidth="xl">
        <div className="services-section__container">
          <div className="services-section__header">
            <h2 className="services-section__title">Services</h2>
            <Link to="/services-list" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="small" className="services-section__button rounded-pill">
                See All Services ({totalCount})
              </Button>
            </Link>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <CircularProgress />
            </div>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <div className="services-section__grid">
              {displayServices?.map((service, idx) => (
                <Card key={service?.id || idx} onClick={() => navigate(`/services/${service._id}`)}
                  className="services-section__card" style={{ backgroundColor: service.bgColor }}>
                  <div className="services-section__icon-wrapper" style={{ backgroundColor: service.iconBgColor }}>
                    <div className="services-section__icon p-3" style={{ color: service.iconColor }}>
                      {service?.profileImage ? (
                        <img
                          src={service.profileImage}
                          alt={service.categoryName || 'Service Icon'}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 30 }}
                        />
                      ) : (
                        <img
                          src={service.icon}
                          alt={service.categoryName || 'Service Icon'}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 30 }}
                        />
                      )}
                    </div>
                  </div>
                  <h3 className="services-section__card-title">
                    {service.categoryName || 'Unnamed Service'}
                  </h3>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;

