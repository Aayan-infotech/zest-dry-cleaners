import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationDialog from "../components/dialogs/LocationDialog";
import { LocationData } from "../components/dialogs/LocationDialog";

interface SavedAddress {
  id: string;
  address: string;
  isDestination?: boolean;
}

const LocationSelection: React.FC = () => {
  // const navigate = useNavigate();
  const [openLocationDialog, setOpenLocationDialog] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    { id: "1", address: "3329 Joyce Str" },
    { id: "2", address: "2045 Lodgevil" },
    { id: "3", address: "3329 Joyce St", isDestination: true },
  ]);

  const handleLocationAdd = (location: LocationData) => {
    const newAddress: SavedAddress = {
      id: `addr-${Date.now()}`,
      address: location.address,
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setOpenLocationDialog(false);
  };

  const handleSkip = () => {
    setOpenLocationDialog(false);
  };

  // const handleContinue = () => {
  //   navigate("/destination-selection");
  // };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />

      <Box sx={{ position: "relative", minHeight: "calc(100vh - 80px)" }}>
        {/* Map Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            opacity: 0.3,
            zIndex: 0,
          }}
        >
          {/* Simplified map pattern */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(51, 107, 63, 0.1) 20px, rgba(51, 107, 63, 0.1) 21px),
                repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(51, 107, 63, 0.1) 20px, rgba(51, 107, 63, 0.1) 21px)
              `,
            }}
          />
        </Box>

        {/* Saved Addresses Panel */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 80,
            bottom: 0,
            width: { xs: "100%", md: "40%" },
            zIndex: 1,
            overflowY: "auto",
          }}
        >
          <Card
            sx={{
              m: 2,
              p: 2,
              backgroundColor: "rgba(51, 107, 63, 0.9)",
              borderRadius: 2,
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
          >
            {savedAddresses.map((addr, index) => (
              <Box key={addr.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "2px solid rgba(201, 248, 186, 0.5)",
                      backgroundColor: addr.isDestination
                        ? "transparent"
                        : "rgba(201, 248, 186, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    {addr.isDestination ? (
                      <StarIcon
                        sx={{
                          color: "rgba(201, 248, 186, 1)",
                          fontSize: 18,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "rgba(201, 248, 186, 1)",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      color: "rgba(201, 248, 186, 1)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {addr.address}
                  </Typography>
                </Box>
                {index < savedAddresses.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      height: 20,
                      backgroundColor: "rgba(201, 248, 186, 0.3)",
                      ml: 2.5,
                      mb: 1,
                      borderStyle: "dotted",
                    }}
                  />
                )}
              </Box>
            ))}
          </Card>
        </Box>

        {/* Compass Icon */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(51, 107, 63, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid rgba(201, 248, 186, 1)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "rgba(201, 248, 186, 1)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <LocationDialog
        open={openLocationDialog}
        onClose={handleSkip}
        onAddLocation={handleLocationAdd}
      />
    </Box>
  );
};

export default LocationSelection;

