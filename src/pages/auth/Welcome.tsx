import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import './Auth.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-panel">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  borderRadius: '50%',
                  backgroundColor: '#E8F5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle sx={{ fontSize: { xs: 50, md: 60 }, color: '#336B3F' }} />
              </Box>
            </Box>

            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#336B3F', 
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Welcome to Zest Dry Cleaners!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                mb: 1,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Your account has been successfully created.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                fontSize: { xs: '0.85rem', md: '0.875rem' }
              }}
            >
              Let's get started with setting up your profile.
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#336B3F',
              color: 'white',
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#285C34',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;

