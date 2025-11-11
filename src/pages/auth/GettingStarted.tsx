import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextFieldComponent from '../../components/ui/TextField';
import SelectComponent from '../../components/ui/Select';
import './Auth.css';

const steps = ['Personal Information', 'Contact Details', 'Preferences'];

const GettingStarted: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    preferredService: '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleNext = () => {
    const newErrors: any = {};
    
    if (activeStep === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    } else if (activeStep === 1) {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      if (activeStep === steps.length - 1) {
        navigate('/profile');
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextFieldComponent
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
              required
            />
            <TextFieldComponent
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextFieldComponent
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
            <TextFieldComponent
              label="Address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              error={errors.address}
              required
            />
            <TextFieldComponent
              label="City"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              error={errors.city}
              required
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <SelectComponent
              label="Preferred Service"
              placeholder="Select your preferred service"
              options={[
                { value: 'shirts', label: 'Shirts' },
                { value: 'suits', label: 'Suits' },
                { value: 'bedsheets', label: 'Bedsheets' },
                { value: 'curtains', label: 'Curtains' },
              ]}
              value={formData.preferredService}
              onChange={(e) => handleChange('preferredService', e.target.value)}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="auth-page">
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mt: { xs: 2, md: 5 }, borderRadius: '16px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#336B3F', mb: 1 }}>
              Getting Started
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Let's set up your profile to get the best experience
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 4, minHeight: '300px' }}>
            {renderStepContent()}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: '#336B3F',
                textTransform: 'none',
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#336B3F',
                color: 'white',
                px: 4,
                py: 1,
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#285C34',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GettingStarted;

