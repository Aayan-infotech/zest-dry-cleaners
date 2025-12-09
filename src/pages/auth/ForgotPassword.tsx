import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Auth.css';
import { forgotPassword } from '../../utils/auth';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    const formattedPhone = phoneNumber.replace(/^44/, "");
    const finalPhone = formattedPhone.replace(/^\+44/, "");
    try {
      setLoading(true);
      const res = await forgotPassword({ phoneNumber: finalPhone });
      showSuccessToast(res?.message || "OTP sent to your phone");

      navigate("/otp-verification", { state: { phoneNumber: finalPhone } });
    } catch (err: any) {
      showErrorToast(err?.message);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-page" sx={{ minHeight: "100vh", backgroundColor: "#336B3F", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 1, sm: 2 } }}>
      <Container maxWidth="sm" sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
        <Box className="auth-panel" sx={{
          backgroundColor: "rgba(201, 248, 186, 1)",
          borderRadius: { xs: "20px", sm: "24px" },
          padding: { xs: "24px 20px", sm: "32px 28px", md: "40px" },
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/signin')}
            sx={{
              mb: { xs: 2, sm: 3 },
              color: '#336B3F',
              textTransform: 'none',
              fontSize: { xs: "0.875rem", sm: "1rem" },
              '&:hover': { backgroundColor: 'rgba(51, 107, 63, 0.1)' }
            }}
          >
            Back to Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#336B3F', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
              Forgot Password?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#336B3F',
                opacity: 0.8,
                fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              No worries! Enter your phone number address and we'll send you a link to reset your password.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 } }}>
            <Box>
              <PhoneInput
                country={'gb'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                disableDropdown={true}
                countryCodeEditable={false}
                inputStyle={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '8px',
                  border: error ? '2px solid #d32f2f' : '2px solid #336B3F',
                  fontSize: '1rem',
                  color: '#336B3F',
                  backgroundColor: 'transparent',
                  paddingLeft: '48px',
                }}
                buttonStyle={{
                  border: 'none',
                  background: 'transparent',
                  borderRight: error ? '2px solid #d32f2f' : '2px solid #336B3F',
                  borderRadius: '8px 0 0 8px',
                }}
                dropdownStyle={{
                  borderRadius: '10px',
                }}
                containerStyle={{
                  width: '100%',
                }}
              />
              {error && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#d32f2f',
                    mt: 0.5,
                    ml: 1.5,
                    display: 'block',
                    fontSize: '0.75rem',
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#336B3F',
                color: 'white',
                py: { xs: 1.25, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#285C34',
                },
                '&:disabled': {
                  backgroundColor: '#285C34',
                  opacity: 0.6,
                },
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: { xs: 1.5, sm: 2 } }}><Link to="/signin" style={{ color: '#336B3F', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem', }}>
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

