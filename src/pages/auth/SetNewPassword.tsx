import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextFieldComponent from '../../components/ui/TextField';
import './Auth.css';

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { password: '', confirmPassword: '' };

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (!newErrors.password && !newErrors.confirmPassword) {
      navigate('/signin');
    }
  };

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-panel">
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
              Set New Password
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#336B3F',
                opacity: 0.8,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              Create strong and secured new password.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <TextFieldComponent
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
                required
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: '38px',
                  minWidth: 'auto',
                  color: '#336B3F',
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            </Box>

            <Box >
              <TextFieldComponent
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                error={errors.confirmPassword}
                required
              />
              <Button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: '38px',
                  minWidth: 'auto',
                  color: '#336B3F',
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              onClick={() => navigate('/welcome')}
              fullWidth
              sx={{
                backgroundColor: '#336B3F',
                color: 'white',
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '8px',
                mt: 2,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#285C34',
                },
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SetNewPassword;

