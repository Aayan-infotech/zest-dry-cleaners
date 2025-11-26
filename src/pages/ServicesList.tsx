import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { Container, Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import casualshirt from "../assets/casual-t-shirt- 1.png";
import Group from "../assets/Group.png";
import blanket from "../assets/blanket 1.png";
import curtains from "../assets/curtains 1.png";
import "./ServicesList.css";
import { useCategoryServices } from "../hooks/useCategoryServices";
import Loader from "../components/ui/Loader";
import defaultimage from "../../src/assets/default-image_450.png"

const staticStyles = [
  {
    icon: casualshirt,
    iconBgColor: "rgba(250, 199, 199, 1)",
    bgColor: "rgba(252, 233, 233, 1)",
    iconColor: "rgba(241, 87, 87, 1)",
    chipBgColor: "rgb(247 196 196)"
  },
  {
    icon: Group,
    iconBgColor: "rgba(188, 255, 201, 1)",
    bgColor: "rgba(240, 250, 242, 1)",
    iconColor: "rgba(79, 191, 103, 1)",
    chipBgColor: "rgb(198 252 210)"
  },
  {
    icon: blanket,
    iconBgColor: "rgba(203, 240, 251, 1)",
    bgColor: "rgba(232, 247, 252, 1)",
    iconColor: "rgba(113, 215, 244, 1)",
    chipBgColor: "rgb(190 239 253)"
  },
  {
    icon: curtains,
    iconBgColor: "rgba(255, 228, 152, 1)",
    bgColor: "rgba(255, 243, 211, 1)",
    iconColor: "rgba(199, 138, 9, 1)",
    chipBgColor: "rgb(242 226 191)"
  },
];

const ServicesList: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading } = useCategoryServices();

  const services = useMemo(() => {
    return categories.map((cat: any, index: number) => ({
      ...cat,
      ...staticStyles[index % staticStyles.length]
    }));
  }, [categories]);

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="services-list-page">
      <DashboardNavbar />
      <main className="services-list-content">
        <Container maxWidth="xl">
          <Box className="services-list-container">
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <Loader />
              </div>
            ) : (
              <div className="services-list-grid">
                {services.map((service) => (
                  <Box
                    key={service.id}
                    className="service-card hover-lift smooth-transition"
                    onClick={() => handleServiceClick(service.id)}
                    sx={{
                      backgroundColor: service.bgColor,
                      borderRadius: "24px",
                      padding: { xs: "20px", sm: "22px", md: "30px" },
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Box
                        sx={{
                          backgroundColor: service.iconBgColor,
                          width: { xs: "100px", md: "115px" },
                          height: { xs: "100px", md: "115px" },
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img src={service?.profileImage || service?.icon || defaultimage} onError={(e) => (e.currentTarget.src = defaultimage)} alt={service?.categoryName} style={{ width: "80px", height: "80px", borderRadius:'50px' }} />
                      </Box>

                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black' }}>
                        {service?.categoryName}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                      <ArrowForwardIosIcon sx={{ fontSize: "22px", color: service.iconColor }} />
                    </Box>

                    {/* Time + Price Row */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px", }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: service.chipBgColor, padding: "6px 14px", borderRadius: "20px", }}>
                        <AccessTimeIcon sx={{ fontSize: "18px", color: service.iconColor, }} />
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: service.iconColor, }}>
                          {service?.estimatedDeliveryTime}
                        </Typography>
                      </Box>

                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: service.iconColor, }}>
                        ${service?.pricePerPiece}/Item
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </div>
            )}
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default ServicesList;
