import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WavingHandIcon from "@mui/icons-material/WavingHand";

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  time: string;
  priority: "high" | "low";
  address: string;
  serviceType: string;
  items: number;
}

const EmployeeDashboard: React.FC = () => {
  const orders: Order[] = [
    {
      id: "1",
      customerName: "John Doe",
      phoneNumber: "+1234567890",
      time: "12:00 PM",
      priority: "high",
      address: "123 Main St., NYC",
      serviceType: "Iron",
      items: 1,
    },
    {
      id: "2",
      customerName: "Mike",
      phoneNumber: "+1234567890",
      time: "12:00 PM",
      priority: "low",
      address: "123 Main St., NYC",
      serviceType: "Dry Cleaning",
      items: 1,
    },
  ];

  const handleOrderClick = (orderId: string) => {
    console.log("View order details:", orderId);
    // Navigate to order details page
  };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />
      
      <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 10, md: 12 }, maxWidth: "1400px", mx: "auto" }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography
            sx={{
              color: "#336B3F",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Welcome
          </Typography>
          <WavingHandIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "#FFD700" }} />
          <Typography
            sx={{
              color: "rgba(51, 107, 63, 0.8)",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: 400,
            }}
          >
            Let's make today productive.
          </Typography>
        </Box>

        {/* Active Orders Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#336B3F",
              color: "#fff",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2d5a35",
                boxShadow: "none",
              },
            }}
          >
            Active Orders
          </Button>
        </Box>

        {/* Order Cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{
                p: { xs: 2, md: 3 },
                background: "rgba(201, 248, 186, 1)",
                borderRadius: 4,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {/* Customer Info */}
                <Box>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontWeight: 700,
                      fontSize: { xs: "1.5rem", md: "1.8rem" },
                      mb: 0.5,
                    }}
                  >
                    {order.customerName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 400,
                    }}
                  >
                    {order.phoneNumber}
                  </Typography>
                </Box>

                {/* Time and Priority */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon sx={{ color: "#336B3F", fontSize: { xs: 18, md: 20 } }} />
                    <Typography
                      sx={{
                        color: "#336B3F",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 500,
                      }}
                    >
                      {order.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.priority === "high" ? "High Priority" : "Low Priority"}
                    sx={{
                      backgroundColor:
                        order.priority === "high"
                          ? "rgba(255, 165, 0, 0.3)"
                          : "rgba(201, 248, 186, 0.8)",
                      color: order.priority === "high" ? "#FF8C00" : "#336B3F",
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      height: { xs: 24, md: 28 },
                      borderRadius: "20px",
                    }}
                  />
                </Box>
              </Box>

              {/* Order Details */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: { xs: 2, md: 3 },
                  mb: 2,
                }}
              >
                {/* Address */}
                <Box>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Pickup or Delivery Address
                  </Typography>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 400,
                    }}
                  >
                    {order.address}
                  </Typography>
                </Box>

                {/* Service Type */}
                <Box>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Service Type
                  </Typography>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 400,
                    }}
                  >
                    {order.serviceType}
                  </Typography>
                </Box>

                {/* Items */}
                <Box>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Items
                  </Typography>
                  <Typography
                    sx={{
                      color: "#336B3F",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 400,
                    }}
                  >
                    {String(order.items).padStart(2, "0")}
                  </Typography>
                </Box>
              </Box>

              {/* Action Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => handleOrderClick(order.id)}
                  sx={{
                    backgroundColor: "#336B3F",
                    color: "#fff",
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    "&:hover": {
                      backgroundColor: "#2d5a35",
                    },
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;

