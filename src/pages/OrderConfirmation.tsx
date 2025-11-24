import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderId: `ORD-${Date.now()}`,
    items: [{ id: 1, name: "Iron", price: 20 }],
    serviceCharge: 2,
    promoDiscount: 20,
    total: 0,
    paymentMethod: "online",
    address: "2045 Lodgeville Street, Eagan",
  });

  // Calculate total
  useEffect(() => {
    const subtotal = orderDetails.items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + orderDetails.serviceCharge - orderDetails.promoDiscount;
    setOrderDetails((prev) => ({ ...prev, total }));
  }, []);

  useEffect(() => {
    // Load order details from sessionStorage if available
    const routeAddresses = sessionStorage.getItem("routeAddresses");
    if (routeAddresses) {
      try {
        const parsed = JSON.parse(routeAddresses);
        if (parsed && parsed.length > 0) {
          setOrderDetails((prev) => ({
            ...prev,
            address: parsed[0].address || prev.address,
          }));
        }
      } catch (e) {
        console.error("Error parsing route addresses:", e);
      }
    }
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            p: { xs: 3, md: 4 },
            background: "rgba(201, 248, 186, 1)",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          {/* Success Icon */}
          <Box sx={{ mb: 3 }}>
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "#336B3F",
              }}
            />
          </Box>

          {/* Order Confirmed Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              fontWeight: 700,
              color: "#336B3F",
              mb: 2,
            }}
          >
            Order Confirmed!
          </Typography>

          {/* Order ID */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "rgba(51, 107, 63, 0.8)",
              mb: 4,
            }}
          >
            Order ID: {orderDetails.orderId}
          </Typography>

          <Divider sx={{ my: 3, borderColor: "rgba(51, 107, 63, 0.2)" }} />

          {/* Order Summary */}
          <Box sx={{ textAlign: "left", mb: 3 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#336B3F",
                mb: 2,
              }}
            >
              Order Summary
            </Typography>

            {orderDetails.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#336B3F", fontSize: "1rem" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ color: "#336B3F", fontSize: "1rem", fontWeight: 600 }}>
                  ${item.price}
                </Typography>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: "#336B3F", fontSize: "1rem" }}>
                Service Charge
              </Typography>
              <Typography sx={{ color: "#336B3F", fontSize: "1rem", fontWeight: 600 }}>
                ${orderDetails.serviceCharge}
              </Typography>
            </Box>

            {orderDetails.promoDiscount > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#336B3F", fontSize: "1rem" }}>
                  Promo Discount
                </Typography>
                <Typography sx={{ color: "#336B3F", fontSize: "1rem", fontWeight: 600 }}>
                  -${orderDetails.promoDiscount}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2, borderColor: "rgba(51, 107, 63, 0.2)" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#336B3F",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  color: "#336B3F",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                ${orderDetails.total}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: "rgba(51, 107, 63, 0.2)" }} />

          {/* Delivery Address */}
          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#336B3F",
                mb: 1.5,
              }}
            >
              Delivery Address
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <HomeIcon sx={{ color: "#336B3F", mt: 0.5 }} />
              <Typography sx={{ color: "#336B3F", fontSize: "1rem" }}>
                {orderDetails.address}
              </Typography>
            </Box>
          </Box>

          {/* Payment Method */}
          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#336B3F",
                mb: 1.5,
              }}
            >
              Payment Method
            </Typography>
            <Typography sx={{ color: "#336B3F", fontSize: "1rem", textTransform: "capitalize" }}>
              {orderDetails.paymentMethod}
            </Typography>
          </Box>

          {/* Back to Home Button */}
          <Button
            onClick={handleBackToHome}
            fullWidth
            sx={{
              backgroundColor: "#336B3F",
              color: "#fff",
              borderRadius: "20px",
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#2d5a35",
              },
            }}
          >
            Back to Home
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;

