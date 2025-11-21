import React from "react";
import { Container, Box, Typography, Chip } from "@mui/material";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const OrderStatusSection: React.FC = () => {
  return (
    <div className="py-5">
      <Container maxWidth="xl">
        <Box className="shadow-sm p-4 p-md-5" sx={{ backgroundColor: "#C9F8BA", borderRadius: "24px", }}>
          <Box className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <Box>
              <Typography sx={{ fontSize: { xs: "1.7rem", sm: "2rem", md: "2.4rem" }, fontWeight: 700, color: "#336B3F", }}>
                Arriving in <strong>57 Minutes</strong>
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#336B3F", mt: 2, }}>
                Booking ID : <strong>230509</strong>
              </Typography>
            </Box>
            <Box className="d-flex flex-column align-items-end gap-3">
              <Chip
                icon={<LocalLaundryServiceIcon sx={{ color: "#336B3F" }} />}
                label="In Process"
                sx={{
                  backgroundColor: "#DFFFD1",
                  color: "#336B3F",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: "20px",
                  border: "1px solid rgba(51,107,63,0.25)",
                }}
              />
              <Link to="/tracking">
                <Button type="submit" variant="primary" size="large" className="w-100">
                  Track Order
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default OrderStatusSection;
