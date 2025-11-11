import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#336B3F', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: '100px', display: 'flex', justifyContent: 'center', }}     >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '100px' }}>
                    <Box sx={{ display: 'flex', gap: 5 }}>
                        <Typography variant="h6" sx={{ textDecoration: 'none', color: 'white', fontWeight: 600, ml: 2, }}>
                            Zest Dry Cleaners
                        </Typography>
                        <Button component={Link} to="/terms" color="inherit" sx={{ textTransform: 'none', fontWeight: 400 }}>
                            Terms & Condition
                        </Button>
                        <Button component={Link} to="/privacy" color="inherit" sx={{ textTransform: 'none', fontWeight: 400 }}>
                            Privacy Policy
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Link to="/login">
                            <Button variant="outlined" sx={{ color: 'black', backgroundColor: 'white', borderColor: 'white', textTransform: 'none', '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'white', }, }}>
                                Log In
                            </Button>
                        </Link>
                        <Typography sx={{ color: "black" }}>|</Typography>
                        <Link to="/signup">
                            <Button variant="contained" sx={{ backgroundColor: '#C9F8BA', color: 'black', textTransform: 'none', '&:hover': { backgroundColor: '#A4D6A2', }, }}>
                                Sign Up
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;