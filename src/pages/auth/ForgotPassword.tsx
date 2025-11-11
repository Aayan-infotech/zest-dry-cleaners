import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import TextFieldComponent from '../../components/ui/TextField';
import './Auth.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setError('');
    navigate('/reset-email-sent', { state: { email } });
  };

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-panel">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/signin')}
            sx={{ 
              mb: 3, 
              color: '#336B3F', 
              textTransform: 'none',
              '&:hover': { backgroundColor: 'rgba(51, 107, 63, 0.1)' }
            }}
          >
            Back to Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#336B3F', 
                mb: 1,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Forgot Password?
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              No worries! Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextFieldComponent
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
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
              Send Reset Link
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                to="/signin"
                style={{
                  color: '#336B3F',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
              >
                Remember your password? Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;

