import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
} from "@mui/material";

const DestinationSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("2045 Lodgeville Street, Eagan");

  const handleContinue = () => {
    sessionStorage.setItem("selectedDestination", selectedAddress);
    navigate("/billing");
  };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <DashboardNavbar />

      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#e8f5e9",
          borderRadius: 3,
          border: "3px solid #336B3F",
          p: 3,
          mt: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#336B3F",
            textAlign: "center",
            mb: 3,
          }}
        >
          Select Destination
        </Typography>

        {/* Address Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#336B3F",
            borderRadius: 2,
            p: 1.5,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#336B3F",
              }}
            />
          </Box>
          <TextField
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            placeholder="Enter destination address"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                fontSize: "1rem",
              },
            }}
          />
        </Box>

        {/* Map Area */}
        <Box
          sx={{
            width: "100%",
            height: 400,
            backgroundColor: "#e8f5e9",
            borderRadius: 2,
            mb: 3,
            position: "relative",
            overflow: "hidden",
            border: "2px solid rgba(51, 107, 63, 0.2)",
          }}
        >
          {/* Simplified map pattern */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(51, 107, 63, 0.15) 30px, rgba(51, 107, 63, 0.15) 31px),
                repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(51, 107, 63, 0.15) 30px, rgba(51, 107, 63, 0.15) 31px)
              `,
              position: "relative",
            }}
          >
            {/* Location Pin */}
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              {/* Outer yellow pin */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#FFD700",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Inner green pin */}
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#336B3F",
                    border: "2px solid #fff",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
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
          Continue
        </Button>
      </Card>
    </Box>
  );
};

export default DestinationSelection;

