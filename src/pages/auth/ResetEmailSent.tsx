import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import './Auth.css';

const ResetEmailSent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-panel">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: { xs: 70, md: 80 },
                  height: { xs: 70, md: 80 },
                  borderRadius: '50%',
                  backgroundColor: '#E8F5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle sx={{ fontSize: { xs: 40, md: 50 }, color: '#336B3F' }} />
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
              Check Your Email
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                mb: 2,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              We've sent a password reset link to
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#336B3F', 
                fontWeight: 600, 
                mb: 3,
                fontSize: { xs: '0.95rem', md: '1rem' },
                wordBreak: 'break-word'
              }}
            >
              {email}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                fontSize: { xs: '0.85rem', md: '0.875rem' }
              }}
            >
              Please check your email and click on the link to reset your password. If you don't see the email, check your spam folder.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/set-new-password')}
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
              Next
            </Button>

            {/* <Button
              variant="outlined"
              fullWidth
              startIcon={<Email />}
              onClick={() => navigate('/forgot-password')}
              sx={{
                borderColor: '#C9F8BA',
                color: '#336B3F',
                backgroundColor: 'white',
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#A4D6A2',
                  backgroundColor: '#f9f9f9',
                },
              }}
            >
              Resend Email
            </Button> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetEmailSent;

