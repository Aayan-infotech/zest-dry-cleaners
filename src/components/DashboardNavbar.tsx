import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Divider, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './DashboardNavbar.css';
import { getUserRole, isAuthenticated } from '../utils/auth';
import { GOOGLE_MAPS_API_KEY } from '../utils/config';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../hooks/useCart.tsx';

const DashboardNavbar: React.FC = () => {
  const [locationAnchor, setLocationAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('Loading...');
  const [userRole, setUserRole] = useState<string | null>(null);

  const { cartCount } = useCart();

  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchor(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Get user role on mount
  useEffect(() => {
    if (isAuthenticated()) {
      setUserRole(getUserRole());
    }
  }, []);

  // Get current location using geolocation API
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setCurrentLocation('Location not available');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              let city = '';
              let country = '';

              // Extract city and country from address components
              for (const component of addressComponents) {
                if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                  city = component.long_name;
                }
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
              }

              if (city && country) {
                setCurrentLocation(`${city}, ${country}`);
              } else if (city) {
                setCurrentLocation(city);
              } else if (country) {
                setCurrentLocation(country);
              } else {
                setCurrentLocation('Location detected');
              }
            } else {
              setCurrentLocation('Location not found');
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
            setCurrentLocation('Location detected');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location unavailable');
        }
      );
    };

    getCurrentLocation();
  }, []);

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: '#336B3F', height: '100%', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Zest Dry Cleaners
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {userRole === 'employee' ? (
          <>
            <ListItem component={Link} to="/employee-dashboard" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="My Day" />
            </ListItem>
            <ListItem component={Link} to="/terms" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="Terms & Conditions" />
            </ListItem>
            <ListItem component={Link} to="/privacy" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="Privacy Policy" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} to="/my-orders" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem component={Link} to="/services-list" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem component={Link} to="/terms" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="Terms & Conditions" />
            </ListItem>
            <ListItem component={Link} to="/privacy" onClick={handleDrawerToggle} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemText primary="Privacy Policy" />
            </ListItem>
          </>
        )}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <Box sx={{ p: 2 }}>
        <Box
          className="hover-lift smooth-transition"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            color: 'white',
            padding: '8px',
            borderRadius: '8px',
            mb: 2,
          }}
          onClick={(e) => {
            handleDrawerToggle();
            handleLocationClick(e as any);
          }}
        >
          <LocationOnIcon sx={{ fontSize: '24px' }} />
          <Typography sx={{ color: 'white', fontWeight: 400, fontSize: '1rem' }}>
            {currentLocation}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '20px' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <IconButton
            component={Link}
            to="/notifications"
            onClick={handleDrawerToggle}
            color="inherit"
            className="hover-scale smooth-transition"
            sx={{
              color: 'white',
              padding: '8px'
            }}
          >
            <NotificationsIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton
            component={Link}
            to="/edit-profile"
            onClick={handleDrawerToggle}
            color="inherit"
            className="hover-scale smooth-transition"
            sx={{
              color: 'white',
              padding: '8px'
            }}
          >
            <AccountCircleIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      className="animate-slide-down"
      sx={{
        backgroundColor: '#336B3F',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: { xs: '70px', sm: '80px', md: '100px' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: '70px', sm: '80px', md: '100px' }, flexWrap: 'nowrap', gap: { xs: 1, md: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2, md: 3 } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: { xs: 0.5, sm: 1 }, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/dashboard" className="dashboard-navbar__brand">
              <Typography variant="h6" sx={{ textDecoration: 'none', color: 'white', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
                Zest Dry Cleaners
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { md: 2, lg: 3 }, alignItems: 'center' }}>
              {userRole === 'employee' ? (
                <>
                  <Button
                    component={Link}
                    to="/employee-dashboard"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    My Day
                  </Button>
                  <Button
                    component={Link}
                    to="/terms"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    Terms & Conditions
                  </Button>
                  <Button
                    component={Link}
                    to="/privacy"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    Privacy Policy
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/my-orders"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    My Orders
                  </Button>
                  <Button
                    component={Link}
                    to="/services-list"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    Services
                  </Button>
                  <Button
                    component={Link}
                    to="/terms"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    Terms & Conditions
                  </Button>
                  <Button
                    component={Link}
                    to="/privacy"
                    color="inherit"
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: { md: '0.9rem', lg: '1rem' },
                      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    }}
                  >
                    Privacy Policy
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1, md: 2 }, flexWrap: 'nowrap' }}>
            <Box
              className="hover-lift smooth-transition"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, md: 1 },
                cursor: 'pointer',
                color: 'white',
                padding: { xs: '4px', md: '8px' },
                borderRadius: '8px',
              }}
              onClick={handleLocationClick}
            >
              <LocationOnIcon sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }} />
              <Typography sx={{ color: 'white', fontWeight: 400, fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, display: { xs: 'none', sm: 'block' } }}>
                {currentLocation}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' }, display: { xs: 'none', sm: 'block' } }} />
            </Box>
            <Menu
              anchorEl={locationAnchor}
              open={Boolean(locationAnchor)}
              onClose={handleLocationClose}
            >
              <MenuItem onClick={handleLocationClose}>{currentLocation}</MenuItem>
            </Menu>
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              className="hover-scale smooth-transition"
              sx={{
                color: 'white',
                padding: { xs: '6px', sm: '7px', md: '8px' }
              }}
            >
              <Badge
                badgeContent={cartCount}
                sx={{ "& .MuiBadge-badge": { backgroundColor: "rgba(201,248,186,1)", color: "#000", fontWeight: "bold" } }}
              >
                <ShoppingCart sx={{ fontSize: { xs: '20px', sm: '22px', md: '24px' } }} />
              </Badge>
            </IconButton>
            <IconButton
              component={Link}
              to="/notifications"
              color="inherit"
              className="hover-scale smooth-transition"
              sx={{
                color: 'white',
                padding: { xs: '6px', sm: '7px', md: '8px' }
              }}
            >
              <NotificationsIcon sx={{ fontSize: { xs: '20px', sm: '22px', md: '24px' } }} />
            </IconButton>
            <IconButton
              component={Link}
              to="/edit-profile"
              color="inherit"
              className="hover-scale smooth-transition"
              sx={{
                color: 'white',
                padding: { xs: '6px', sm: '7px', md: '8px' }
              }}
            >
              <AccountCircleIcon sx={{ fontSize: { xs: '20px', sm: '22px', md: '24px' } }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default DashboardNavbar;

