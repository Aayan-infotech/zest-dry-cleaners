import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Avatar, Grid, Divider } from '@mui/material';
import { Edit, Person, Email, Phone, LocationOn, Settings } from '@mui/icons-material';
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
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#336B3F' }}>
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
                  '&:hover': {
                    backgroundColor: '#285C34',
                  },
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#336B3F',
                    color: '#336B3F',
                    textTransform: 'none',
                    borderRadius: '8px',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: '#336B3F',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '8px',
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

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: { xs: 100, md: 150 },
                    height: { xs: 100, md: 150 },
                    mx: 'auto',
                    mb: 2,
                    bgcolor: '#336B3F',
                    fontSize: { xs: '3rem', md: '4rem' },
                  }}
                >
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {profileData.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ color: '#336B3F', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600 }}>
                      Personal Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="First Name"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1">{profileData.firstName}</Typography>
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
                        <Typography variant="body1">{profileData.lastName}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ color: '#336B3F', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600 }}>
                      Contact Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1">{profileData.email}</Typography>
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
                        <Typography variant="body1">{profileData.phone}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ color: '#336B3F', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600 }}>
                      Address
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {isEditing ? (
                        <TextFieldComponent
                          label="Address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body1">{profileData.address}</Typography>
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
                        <Typography variant="body1">{profileData.city}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Settings sx={{ color: '#336B3F', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 600 }}>
                      Preferences
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">Preferred Service: {profileData.preferredService}</Typography>
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

