import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import './Auth.css';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.split('').filter((char) => /^\d$/.test(char)).slice(0, otp.length);
    
    if (digits.length === otp.length) {
      const newOtp = [...digits];
      setOtp(newOtp);
      setError('');
      // Focus last input
      inputRefs.current[otp.length - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== otp.length) {
      setError('Please enter the complete OTP');
      return;
    }

    // Here you would verify the OTP with your backend
    // For now, we'll just navigate to set new password
    setError('');
    navigate('/set-new-password', { state: { email, otp: otpString } });
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setTimer(60);
    setCanResend(false);
    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // Here you would call your API to resend OTP
    console.log('Resending OTP to:', email);
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
            onClick={() => navigate('/forgot-password')}
            sx={{ 
              mb: { xs: 2, sm: 3 }, 
              color: '#336B3F', 
              textTransform: 'none',
              fontSize: { xs: "0.875rem", sm: "1rem" },
              '&:hover': { backgroundColor: 'rgba(51, 107, 63, 0.1)' }
            }}
          >
            Back
          </Button>

          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#336B3F', 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              Enter OTP
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#336B3F', 
                opacity: 0.8,
                fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                px: { xs: 1, sm: 0 },
                mb: 1
              }}
            >
              We've sent a 6-digit code to
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: '#336B3F', 
                fontWeight: 600, 
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                wordBreak: 'break-word',
                mb: { xs: 3, sm: 4 }
              }}
            >
              {email}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleVerify} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 1.5 }, mb: 1 }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontWeight: 600,
                    },
                  }}
                  sx={{
                    width: { xs: '45px', sm: '50px', md: '55px' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'transparent',
                      '& fieldset': {
                        borderColor: '#336B3F',
                        borderWidth: '2.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#336B3F',
                        borderWidth: '2.5px',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#336B3F',
                        borderWidth: '3px',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#336B3F',
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                      fontWeight: 600,
                    },
                  }}
                />
              ))}
            </Box>

            {error && (
              <Typography 
                sx={{ 
                  color: '#d32f2f', 
                  fontSize: { xs: '0.875rem', sm: '0.9rem' },
                  textAlign: 'center',
                  mt: -1
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
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
              }}
            >
              Verify OTP
            </Button>

            <Box sx={{ textAlign: 'center', mt: { xs: 1, sm: 1.5 } }}>
              {canResend ? (
                <Button
                  onClick={handleResend}
                  sx={{
                    color: '#336B3F',
                    textTransform: 'none',
                    fontSize: { xs: '0.875rem', sm: '0.9rem' },
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(51, 107, 63, 0.1)',
                    },
                  }}
                >
                  Resend OTP
                </Button>
              ) : (
                <Typography
                  sx={{
                    color: '#336B3F',
                    fontSize: { xs: '0.875rem', sm: '0.9rem' },
                    opacity: 0.7,
                  }}
                >
                  Resend OTP in {timer}s
                </Typography>
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mt: { xs: 1.5, sm: 2 } }}>
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

export default OTPVerification;

