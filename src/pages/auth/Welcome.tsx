import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from '../../components/ui/Button';
import './Auth.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!phone) return alert('Please enter your phone number');
    navigate('/otp'); // redirect to next page (e.g., OTP)
  };

  return (
    <Box className="auth-page welcome-page">
      <Container maxWidth="sm">
        <Box className="auth-panel welcome-panel">
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#1B4D3E',
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2rem' },
            }}
          >
            Welcome
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#1B4D3E',
              opacity: 0.8,
              mb: 4,
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Enter your phone number to get started.
          </Typography>

          <Box sx={{ mb: 3, }}>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: '100%',
                height: '50px',
                borderRadius: '12px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
              buttonStyle={{
                border: 'none',
                background: 'transparent',
              }}
              dropdownStyle={{
                borderRadius: '10px',
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'center', color: '#1B4D3E', opacity: 0.6, mb: 3, fontSize: '0.85rem', fontWeight: 500, }}>
            Privacy and agreements
          </Typography>

          <Button
            onClick={handleContinue}
            variant="primary"
            size="large"
            className="continue-btn"
            style={{ width: '100%' }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;
