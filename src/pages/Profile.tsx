import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Avatar, Grid, Divider } from '@mui/material';
import { Edit, Person, Email, LocationOn, Settings } from '@mui/icons-material';
import TextFieldComponent from '../components/ui/TextField';
import './Profile.css';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street',
    city: 'New York',
    preferredService: 'Shirts',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box className="profile-page">
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 5 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5, md: 4 }, borderRadius: { xs: '12px', sm: '16px' } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 0 }, mb: { xs: 3, sm: 3.5, md: 4 } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#336B3F', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
              My Profile
            </Typography>
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{
                  backgroundColor: '#336B3F',
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    backgroundColor: '#285C34',
                  },
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  fullWidth={xs}
                  sx={{
                    borderColor: '#336B3F',
                    color: '#336B3F',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  fullWidth={xs}
                  sx={{
                    backgroundColor: '#336B3F',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    '&:hover': {
                      backgroundColor: '#285C34',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 100, md: 150 },
                    height: { xs: 80, sm: 100, md: 150 },
                    mx: 'auto',
                    mb: { xs: 1.5, sm: 2 },
                    bgcolor: '#336B3F',
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  }}
                >
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}>
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' } }}>
                  {profileData.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ color: '#336B3F', mr: 1, fontSize: { xs: '20px', sm: '24px' } }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
                      Personal Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    <Grid item xs={12} sm={6}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="First Name"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.firstName}</Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Last Name"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.lastName}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ color: '#336B3F', mr: 1, fontSize: { xs: '20px', sm: '24px' } }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
                      Contact Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.email}</Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.phone}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ color: '#336B3F', mr: 1, fontSize: { xs: '20px', sm: '24px' } }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
                      Address
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.address}</Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="City"
                          value={profileData.city}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{profileData.city}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Settings sx={{ color: '#336B3F', mr: 1, fontSize: { xs: '20px', sm: '24px' } }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
                      Preferences
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Preferred Service: {profileData.preferredService}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;

