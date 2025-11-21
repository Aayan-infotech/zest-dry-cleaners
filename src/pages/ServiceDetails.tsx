import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import {
  Container,
  Box,
  Typography,
  Chip,
  Rating,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import casualshirt from '../assets/casual-t-shirt- 1.png';
import './ServiceDetails.css';
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import shirtimg from '../assets/shirt.jpg';

const categoryList = [
  { value: "iron", label: "Iron" },
  { value: "wash", label: "Wash" },
  { value: "dryclean", label: "Dry Clean" }
];
const quantityList = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" }
];

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  // In a real app, you'd fetch service details based on id
  const service = {
    id: 1,
    name: 'Shirts',
    icon: casualshirt,
    iconBgColor: '#FAC7C7',
    bgColor: 'rgb(255 207 207)',
    iconColor: '#f44336',
    price: '$20',
    time: '45 Minutes',
    description:
      'Our shirt ironing service ensures crisp, wrinkle-free results with professional-grade steam press technology. Each shirt is carefully inspected, pressed, and folded to perfection — ready to wear or store.',
    suitableFor: ['Cotton', 'Linen', 'Polyster Blend', 'Denim', 'Formal Wear'],
    notRecommended: '*Not recommended for delicate fabrics like silk or chiffon.',
    averageTime: '45 minutes',
    pickupDelivery: '8 AM - 8 PM',
    rating: 4.8,
    reviewsCount: 240,
    reviews: [
      'Perfect pressing every time — worth it!',
      'Fast and neatly done.',
    ],
  };

  return (
    <div className="service-details-page">
      <DashboardNavbar />
      <main className="service-details-content">
        <Container maxWidth="xl">
          <Box
            className="service-selection-section"
            sx={{
              backgroundColor: 'var(--primary-dark-green)',
              borderRadius: '24px',
              marginBottom: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '32px',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: '24px', flex: 1, }} className="animate-slide-left">
                <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Box
                    sx={{
                      backgroundColor: service.bgColor,
                      width: { xs: '100px', sm: '120px', md: '150px' },
                      height: { xs: '100px', sm: '120px', md: '150px' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className='rounded-pill hover-scale smooth-transition'
                  >
                    <img src={service.icon} alt={service.name} style={{ width: '60%', height: 'auto' }} />
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 700, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
                    {service.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: { xs: '100%', md: '400px' } }}>
                  <Select label="Category" options={categoryList} value={category} onChange={(e) => setCategory(e.target.value)} variant="dark" placeholder="Select Category" />
                  <Select label="Quantity" options={quantityList} value={quantity} onChange={(e) => setQuantity(e.target.value)} variant="dark" placeholder="Select Quantity" />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', fontSize: { xs: '1.25rem', md: '1.5rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                  Price: <strong className='fs-1 fw-bold'>{service.price}</strong>/Item
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "16px", width: { xs: '100%', md: '250px' }, backgroundColor: 'rgb(247 196 196)', padding: { xs: "16px 24px", md: "23px 33px" }, borderRadius: "50px", justifyContent: { xs: 'center', md: 'flex-start' } }} className="hover-lift smooth-transition">
                  <AccessTimeIcon sx={{ fontSize: { xs: "18px", md: "20px" }, color: service.iconColor, }} />
                  <Typography sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 'bold', color: service.iconColor, }}>
                    {service.time}
                  </Typography>
                </Box>
              </Box>
              <Box
                className="animate-slide-right hover-scale smooth-transition"
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', md: '500px' },
                  height: { xs: '250px', sm: '300px', md: '400px' },
                  borderRadius: '20px',
                  backgroundColor: '#D4A574',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginTop: { xs: '24px', md: 0 },
                }}
              >
                <img src={shirtimg} alt="Shirt" style={{ width: "100%", height: "100%", objectFit: "cover", }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ backgroundColor: 'rgba(201, 248, 186, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-1 hover-lift smooth-transition">
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: '#336B3F',
                marginBottom: '16px',
              }}
            >
              Service Overview
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#336B3F', lineHeight: 1.6, }}>
              {service.description}
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: 'rgba(252, 233, 233, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-2 hover-lift smooth-transition">
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: '#d32f2f',
                marginBottom: '16px',
              }}
            >
              Suitable For
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', }}>
              {service.suitableFor.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  className="hover-scale smooth-transition"
                  sx={{
                    backgroundColor: '#FAC7C7',
                    color: '#d32f2f',
                    fontWeight: 600,
                    borderRadius: '20px',
                  }}
                />
              ))}
            </Box>
            <Typography
              sx={{
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                color: '#d32f2f',
                fontStyle: 'italic',
              }}
            >
              {service.notRecommended}
            </Typography>
          </Box>

          {/* Turnaround & Delivery Section */}
          <Box sx={{ backgroundColor: 'rgba(201, 248, 186, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-3 hover-lift smooth-transition">
            <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#336B3F', marginBottom: '16px', }}>
              Turnaround & Delivery
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#336B3F', marginBottom: '8px', fontWeight: 'bold' }}>
              Average: {service.averageTime}
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#336B3F', fontWeight: 'bold' }}>
              Pickup & Delivery: {service.pickupDelivery}
            </Typography>
          </Box>

          {/* Customer Reviews Section */}
          <Box sx={{ backgroundColor: 'rgba(252, 233, 233, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-4 hover-lift smooth-transition">
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: '#d32f2f',
                marginBottom: '16px',
              }}
            >
              Customer Reviews
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Rating value={service.rating} precision={0.1} readOnly sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
              <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#d32f2f', fontWeight: 600, }}>
                ({service.rating}/5, {service.reviewsCount} reviews)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.reviews.map((review, index) => (
                <Typography key={index} sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#d32f2f', }}>
                  "{review}"
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Continue Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px', }} className="animate-fade-in">
            <Button onClick={() => navigate('/cart')} variant="primary" type="submit" size="large" className="custom-button--green hover-lift button-pulse" sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { xs: '200px', md: '250px' } }}>
              Continue
            </Button>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default ServiceDetails;

