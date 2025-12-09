import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { getCookie } from "../utils/cookies";
import { getAllActiveEmployeeOrders } from "../utils/auth";
import Loader from "../components/ui/Loader";

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
  const [loading, setLoading] = useState(true);
  const [employeeActiveOrders, setEmployeeActiveOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  const employeeId = getCookie('loggedinId');

  useEffect(() => {
    const fetchActiveOrders = async () => {
      if (!employeeId) return;
      try {
        setLoading(true);
        const data = await getAllActiveEmployeeOrders(employeeId);
        console.log(data?.orders, 'orders')
        setEmployeeActiveOrders(data?.orders || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch category');
      } finally {
        setLoading(false);
      }
    };
    fetchActiveOrders();
  }, [employeeId]);

  const formatTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const handleOrderClick = (orderId: string) => {
    console.log("View order details:", orderId);
    // Navigate to order details page
  };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />
      {error && (
        <Box sx={{ background: "#ffdddd", color: "#b30000", p: 2, textAlign: "center", fontWeight: 600, borderRadius: "8px", mx: 2, mt: 2 }}>
          {error}
        </Box>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1400px", mx: "auto" }}>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography sx={{ color: "white", fontWeight: 700, fontSize: { xs: "1.5rem", md: "2rem" }, }}>
              Welcome
            </Typography>
            <WavingHandIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "#FFD700" }} />
            <Typography sx={{ color: "white", fontSize: { xs: "1rem", md: "1.2rem" }, fontWeight: 400, }}>
              Let's make today productive.
            </Typography>
          </Box>

          {/* Active Orders Button */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
                backgroundColor: "#2d5a35",
              }}
            >
              Active Orders
            </Button>
          </Box>

          {/* Order Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {employeeActiveOrders?.map((order: any) => (
              <Card key={order.id} sx={{ p: { xs: 2, md: 3 }, background: "rgba(201, 248, 186, 1)", borderRadius: 4, position: "relative", }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2, }}>
                  <Typography sx={{ color: "#336B3F", fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.8rem" }, mb: 0.5, }}>
                    {order?.userId?.fullName}
                  </Typography>

                  <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: "bold", }}>
                    {order?.userId?.phoneNumber}
                  </Typography>

                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: { xs: 16, md: 18 }, color: "#336B3F" }} />}
                    label={formatTime(order.createdAt)}
                    sx={{
                      backgroundColor: "rgba(51, 107, 63, 0.2)",
                      color: "#336B3F",
                      fontWeight: "bold",
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      height: { xs: 34, md: 38 },
                      borderRadius: "20px",
                      px: 1.5,
                    }}
                  />

                  <Chip
                    label={order.priority === "high" ? "High Priority" : "Low Priority"}
                    sx={{
                      backgroundColor:
                        order.priority === "high"
                          ? "rgba(255, 165, 0, 0.3)"
                          : "rgba(201, 248, 186, 0.8)",
                      color: order.priority === "high" ? "rgba(255, 77, 0, 1)" : "#336B3F",
                      fontWeight: "bold",
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      height: { xs: 34, md: 38 },
                      borderRadius: "20px",
                    }}
                  />
                </Box>
                <Divider sx={{ borderColor: 'rgba(51, 107, 63, 0.2)', my: 0, mb: 2, borderWidth: 2 }} />
                {/* Order Details Grid */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.85rem", md: "0.95rem" }, fontWeight: 600, mb: 0.5, }}>
                      Pickup / Delivery Address
                    </Typography>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 400, wordBreak: "break-word", }}>
                      {order?.deliveryAddress?.city}
                    </Typography>
                  </Box>

                  {/* Service Type */}
                  <Box>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.85rem", md: "0.95rem" }, fontWeight: 600, mb: 0.5, }}>
                      Service Type
                    </Typography>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 400, }}>
                      {order?.items[0]?.categoryId?.categoryName}
                    </Typography>
                  </Box>

                  {/* Items */}
                  <Box>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.85rem", md: "0.95rem" }, fontWeight: 600, mb: 0.5, }}>
                      Items
                    </Typography>
                    <Typography sx={{ color: "#336B3F", fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 400, }}>
                      {String(order?.items?.length).padStart(2, "0")}
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, alignItems: "center", }}>
                    <IconButton
                      onClick={() => handleOrderClick(order?.id)}
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
                </Box>
              </Card>
            ))}
          </Box>

        </Box>
      )}
    </Box>
  );
};

export default EmployeeDashboard;

