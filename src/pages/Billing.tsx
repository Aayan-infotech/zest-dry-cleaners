import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import PaymentMethodDialog from "../components/dialogs/PaymentMethodDialog";
import type { CardData } from "../components/dialogs/PaymentMethodDialog";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StarIcon from "@mui/icons-material/Star";
import { useGoogleMaps } from "../hooks/useGoogleMaps";
import { GOOGLE_MAPS_API_KEY } from "../utils/config";

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [promoCode, setPromoCode] = useState("A9CCXJP");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [savedCards, setSavedCards] = useState<CardData[]>([]);
  const [items] = useState([
    { id: 1, name: "Iron", price: 20 },
  ]);
  const [serviceCharge] = useState(2);
  const [promoDiscount] = useState(20);
  const [addresses] = useState([
    { id: "1", address: "2045 Lodgeville Street, Eagan", icon: "circle" },
    { id: "2", address: "3329 Joyce Stree, PA, USA", icon: "star" },
  ]);

  const { isLoaded } = useGoogleMaps(GOOGLE_MAPS_API_KEY);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const googleMapRef = React.useRef<any>(null);

  useEffect(() => {
    // Load addresses from sessionStorage if available
    const routeAddresses = sessionStorage.getItem("routeAddresses");
    if (routeAddresses) {
      try {
        JSON.parse(routeAddresses);
        // Use parsed addresses if available
      } catch (e) {
        console.error("Error parsing route addresses:", e);
      }
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || googleMapRef.current) return;

    const initializeMap = async () => {
      if (!mapRef.current || googleMapRef.current) return;

      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        setTimeout(() => {
          if (window.google && window.google.maps && mapRef.current && !googleMapRef.current) {
            initializeMap();
          }
        }, 100);
        return;
      }

      try {
        // Use traditional Google Maps API constructor
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 44.8365, lng: -93.2040 },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ],
          disableDefaultUI: true,
        });

        googleMapRef.current = map;

        // Add yellow marker
        new window.google.maps.Marker({
          position: { lat: 44.8365, lng: -93.2040 },
          map: map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#FFD700",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 3,
          },
        });

        // Add blue home icon using a custom SVG path
        const homeIcon = {
          path: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
          fillColor: "#2196F3",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
          scale: 1.5,
          anchor: new window.google.maps.Point(12, 20),
        };
        
        new window.google.maps.Marker({
          position: { lat: 44.8380, lng: -93.2060 },
          map: map,
          icon: homeIcon,
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();
  }, [isLoaded]);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + serviceCharge - promoDiscount;

  const handleRemovePromo = () => {
    setPromoCode("");
  };

  const handleContinue = () => {
    if (paymentMethod === "online") {
      setOpenPaymentDialog(true);
    } else {
      navigate("/order-confirmation");
    }
  };

  const handlePaymentComplete = (card?: CardData) => {
    if (card) {
      setSavedCards([...savedCards, card]);
    }
    setOpenPaymentDialog(false);
    navigate("/order-confirmation");
  };

  const handleAddCard = (card: CardData) => {
    setSavedCards([...savedCards, card]);
  };

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          p: { xs: 2, md: 4 },
          pt: { xs: 10, md: 12 },
          maxWidth: "1400px",
          mx: "auto",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* Left Card - Billings */}
        <Card
          sx={{
            flex: 1,
            p: 4,
            background: "#336B3F",
            borderRadius: 3,
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              mb: 4,
              color: "#fff",
            }}
          >
            Billings
          </Typography>

          {/* Iron */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
              Iron
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
              ${items[0].price}
            </Typography>
          </Box>

          {/* Service Charge */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
              Service Charge
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
              ${serviceCharge}
            </Typography>
          </Box>

          {/* Promo Code */}
          {promoCode && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#fff", fontSize: "1rem", mr: 1 }}>
                    Promo Code
                  </Typography>
                  <TextField
                    value={promoCode}
                    size="small"
                    disabled
                    sx={{
                      backgroundColor: "rgba(201, 248, 186, 1)",
                      borderRadius: 1,
                      width: "120px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "& input": {
                          color: "#336B3F",
                          fontSize: "0.9rem",
                          py: 0.5,
                          px: 1,
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          size="small"
                          onClick={handleRemovePromo}
                          sx={{ color: "#336B3F", p: 0.5 }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
                <Typography sx={{ color: "#fff", fontSize: "1rem" }}>
                  -${promoDiscount}
                </Typography>
              </Box>
            </>
          )}

          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              mb: 4,
              pt: 3,
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                color: "rgba(201, 248, 186, 1)",
                fontSize: "1.8rem",
                fontWeight: 700,
              }}
            >
              ${total}
            </Typography>
          </Box>

          {/* Payment Methods */}
          <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" }, mt: 2 }}>
            {/* Online Payment */}
            <Box
              onClick={() => setPaymentMethod("online")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {paymentMethod === "online" ? (
                <CheckCircleIcon
                  sx={{
                    color: "rgba(201, 248, 186, 1)",
                    fontSize: 28,
                    mb: 0.5,
                  }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    color: "#fff",
                    fontSize: 28,
                    mb: 0.5,
                  }}
                />
              )}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1.5,
                  backgroundColor: "#336B3F",
                  border: "1px solid rgba(201, 248, 186, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 0.5,
                }}
              >
                <CreditCardIcon
                  sx={{
                    color: "#fff",
                    fontSize: 28,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Online Payment
              </Typography>
            </Box>

            {/* Cash */}
            <Box
              onClick={() => setPaymentMethod("cash")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {paymentMethod === "cash" ? (
                <CheckCircleIcon
                  sx={{
                    color: "rgba(201, 248, 186, 1)",
                    fontSize: 28,
                    mb: 0.5,
                  }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    color: "#fff",
                    fontSize: 28,
                    mb: 0.5,
                  }}
                />
              )}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1.5,
                  backgroundColor: "#336B3F",
                  border: "1px solid rgba(201, 248, 186, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 0.5,
                }}
              >
                <AccountBalanceWalletIcon
                  sx={{
                    color: "#fff",
                    fontSize: 28,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Cash
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Right Card - Map and Addresses */}
        <Card
          sx={{
            flex: 1,
            p: 3,
            background: "#336B3F",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Map */}
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 2,
              mb: 3,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div
              ref={mapRef}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
            
            {/* Distance Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#336B3F",
                color: "#fff",
                borderRadius: "20px",
                px: 1.5,
                py: 0.5,
                fontSize: "0.85rem",
                fontWeight: 600,
                zIndex: 1000,
              }}
            >
              847m
            </Box>
          </Box>

          {/* Address List */}
          <Box sx={{ mb: 3, flex: 1 }}>
            {addresses.map((addr, index) => (
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
                      border: "2px solid rgba(201, 248, 186, 1)",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    {addr.icon === "circle" ? (
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: "#336B3F",
                        }}
                      />
                    ) : (
                      <StarIcon
                        sx={{
                          color: "#336B3F",
                          fontSize: 18,
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontWeight: 400,
                    }}
                  >
                    {addr.address}
                  </Typography>
                </Box>
                {index < addresses.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      height: 20,
                      borderLeft: "2px dotted rgba(201, 248, 186, 0.5)",
                      ml: 2.5,
                      mb: 1,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            fullWidth
            sx={{
              backgroundColor: "rgba(201, 248, 186, 1)",
              color: "#336B3F",
              borderRadius: "20px",
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgba(201, 248, 186, 0.8)",
              },
            }}
          >
            Continue
          </Button>
        </Card>
      </Box>

      {/* Payment Method Dialog */}
      <PaymentMethodDialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        onAddCard={handleAddCard}
        onPaymentComplete={handlePaymentComplete}
      />
    </Box>
  );
};

export default Billing;
