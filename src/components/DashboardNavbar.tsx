import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './DashboardNavbar.css';

const DashboardNavbar: React.FC = () => {
  const [locationAnchor, setLocationAnchor] = React.useState<null | HTMLElement>(null);

  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      className="animate-slide-down"
      sx={{
        backgroundColor: '#336B3F',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: { xs: '80px', md: '100px' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: '80px', md: '100px' }, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: { xs: 1, md: 0 } }}>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3, md: 5 }, alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <Link to="/dashboard" className="dashboard-navbar__brand">
              <Typography variant="h6" sx={{ textDecoration: 'none', color: 'white', fontWeight: 600, }}>
                Zest Dry Cleaners
              </Typography>
            </Link>
            <Button
              component={Link}
              to="/my-orders"
              color="inherit"
              variant="text"
              disableRipple
              sx={{
                textTransform: "none",
                fontWeight: 400,
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
                "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flexWrap: 'nowrap' }}>
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
              <LocationOnIcon sx={{ fontSize: { xs: '18px', md: '24px' } }} />
              <Typography sx={{ color: 'white', fontWeight: 400, fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, display: { xs: 'none', sm: 'block' } }}>
                Jakarta, Indonesia
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: { xs: '16px', md: '20px' } }} />
            </Box>
            <Menu
              anchorEl={locationAnchor}
              open={Boolean(locationAnchor)}
              onClose={handleLocationClose}
            >
              <MenuItem onClick={handleLocationClose}>Jakarta, Indonesia</MenuItem>
              <MenuItem onClick={handleLocationClose}>Bandung, Indonesia</MenuItem>
              <MenuItem onClick={handleLocationClose}>Surabaya, Indonesia</MenuItem>
            </Menu>
            <IconButton
              component={Link}
              to="/notifications"
              color="inherit"
              className="hover-scale smooth-transition"
              sx={{
                color: 'white',
                padding: { xs: '6px', md: '8px' }
              }}
            >
              <NotificationsIcon sx={{ fontSize: { xs: '20px', md: '24px' } }} />
            </IconButton>
            <IconButton
              component={Link}
              to="/edit-profile"
              color="inherit"
              className="hover-scale smooth-transition"
              sx={{
                color: 'white',
                padding: { xs: '6px', md: '8px' }
              }}
            >
              <AccountCircleIcon sx={{ fontSize: { xs: '20px', md: '24px' } }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardNavbar;

