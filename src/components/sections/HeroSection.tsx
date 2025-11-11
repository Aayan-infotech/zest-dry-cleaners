import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import heroHome from "../../assets/hero-home.png";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${heroHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", }}>
        <Box sx={{ p: { xs: 2, md: 4 }, }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#2E2E2E",
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Need a helping hand today?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#333",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: 0.9,
              maxWidth: "100%",
            }}
          >
            Let’s embody your beautiful ideas together, simplify the way you
            visualize your next big things.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#336B3F",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#285C34",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
