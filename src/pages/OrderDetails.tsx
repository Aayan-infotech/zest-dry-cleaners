import React, { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import {
  Container,
  Box,
  Typography,
  Rating,
  TextField,
} from '@mui/material';
import Button from '../components/ui/Button';
import './OrderDetails.css';
import shirtimg from "../../src/assets/c76246008f63e533577666cde2aa1a78dcf46157.jpg"

const OrderDetails: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(4.5);
  const [feedback, setFeedback] = useState('');

  const order = {
    id: 1,
    service: 'Shirt',
    category: 'Iron',
    date: 'Friday, Sept 26, 2025',
    pickupDate: 'Sunday, 21st September',
    deliveryDate: 'Tuesday, 23rd September',
    image: shirtimg,
    items: [
      { name: 'Iron', price: '$20' },
      { name: 'Service Charge', price: '$2' },
      { name: 'Promo Code', price: '-$20' },
    ],
    total: '$22',
  };

  const handleSubmitFeedback = () => {
    console.log('Rating:', rating, 'Feedback:', feedback);
  };

  return (
    <div className="order-details-page">
      <DashboardNavbar />
      <main className="order-details-content">
        <Container maxWidth="xl">
          <Box className="service-details-section animate-slide-up">
            <Box className="service-details-content-wrapper">
              <Box className="service-info">
                <Typography variant="h3" sx={{ color: 'white', mb: 1 }}>
                  Service: <strong className='fw-bold'>{order.service}</strong>
                </Typography>
                <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
                  Category: <strong className='fw-bold'>{order.category}</strong>
                </Typography>
                <Typography variant="h4" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 2 }}>
                  {order.date}
                </Typography>
                <Box className="animate-fade-in">
                  <Link to="/tracking">
                    <Button variant="primary" type="submit" size="large" className="custom-button--green rounded-pill hover-lift button-pulse w-25">
                      Track Order
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Box className="service-image-card">
                <img src={order.image} alt={order.service} className="service-detail-image" />
              </Box>
            </Box>
          </Box>

          {/* Pickup & Delivery Section */}
          <Box className="pickup-delivery-section animate-slide-up animate-delay-1">
            <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: 'rgba(201, 248, 186, 1)', mb: 2 }}>
              Pickup & Delivery
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'rgba(201, 248, 186, 1)', mb: 1 }}>
              Pickup Date: {order.pickupDate}
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'rgba(201, 248, 186, 1)' }}>
              Delivery Date: {order.deliveryDate}
            </Typography>
          </Box>

          {/* Billings Section */}
          <Box className="billings-section animate-slide-up animate-delay-2">
            <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: 'rgba(51, 107, 63, 1)', mb: 3 }}>
              Billings
            </Typography>
            <Box className="billing-items">
              {order?.items?.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'rgba(51, 107, 63, 1)' }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'rgba(51, 107, 63, 1)', fontWeight: 600 }}>
                    {item.price}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, pt: 3, borderTop: '2px solid rgba(51, 107, 63, 1)' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: 'rgba(51, 107, 63, 1)' }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: 'rgba(51, 107, 63, 1)' }}>
                  {order.total}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Ratings Section */}
          <Box className="ratings-section animate-slide-up animate-delay-3">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: 'white' }}>
                  Ratings
                </Typography>
                <Rating
                  value={rating}
                  precision={0.5}
                  onChange={(newValue) => setRating(newValue)}
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFC107',
                    },
                    '& .MuiRating-iconEmpty': {
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                />
                <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'white' }}>
                  {rating} (Stars)
                </Typography>
              </Box>
              <Box>
                <TextField
                  label="Feedback"
                  variant="outlined"
                  fullWidth
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '28px',
                      width: '300px',
                      backgroundColor: 'transparent',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.8)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 1)'
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'rgba(255, 255, 255, 0.9)',
                    },
                    input: {
                      color: 'white',
                    },
                  }}
                />
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={handleSubmitFeedback}
                    variant="secondary"
                    size="medium"
                    className="hover-lift smooth-transition feedback-btn"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default OrderDetails;

