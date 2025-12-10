import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Button as MuiButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LocationDialog from "../components/dialogs/LocationDialog";
import type { LocationData } from "../components/dialogs/LocationDialog";
import { GOOGLE_MAPS_API_KEY } from "../utils/config";
import { useGoogleMaps } from "../hooks/useGoogleMaps";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { Autocomplete } from "@react-google-maps/api";

import "./RouteSelection.css";
import { AddLocation, MyLocation } from "@mui/icons-material";

// Declare Google Maps types
declare global {
  interface Window {
    google: typeof google;
  }
}

interface RouteAddress {
  id: string;
  address: string;
  lat?: number;
  lng?: number;
  isDestination?: boolean;
}

const RouteSelection: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const currentLocationAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const currentLocationInputRef = useRef<HTMLInputElement>(null);

  // store date/time from session (keeps your previous behavior)
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  // route addresses (dynamic - loaded from sessionStorage or empty)
  const [addresses, setAddresses] = useState<RouteAddress[]>([]);
  const currentLocationFromHook = useCurrentLocation();
  const [currentLocation, setCurrentLocation] = useState<string>(currentLocationFromHook);

  // selected address ID for radio buttons
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // dialog state for adding new location
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 44.8365, lng: -93.2040 });

  // Load Google Maps
  const { isLoaded, loadError } = useGoogleMaps(GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    // read selected date/time from session storage (if present)
    const date = sessionStorage.getItem("selectedDate");
    const time = sessionStorage.getItem("selectedTime");

    if (date) {
      const dateObj = new Date(date);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];
      const dayName = days[dateObj.getDay()];
      const monthName = months[dateObj.getMonth()];
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();

      // Set day name separately
      setSelectedDay(dayName);
      // Set full date
      setSelectedDate(`${monthName} ${day}, ${year}`);
    } else {
      // fallback example
      const today = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];
      setSelectedDay(days[today.getDay()]);
      setSelectedDate(`${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
    }

    if (time) {
      setSelectedTime(time);
    } else {
      setSelectedTime("8:00 pm");
    }

    // Load saved addresses from sessionStorage if available
    const savedAddresses = sessionStorage.getItem("routeAddresses");
    if (savedAddresses) {
      try {
        const parsed = JSON.parse(savedAddresses);
        setAddresses(parsed);
        // Select first address if available
        if (parsed.length > 0 && !selectedAddressId) {
          setSelectedAddressId(parsed[0].id);
        }
      } catch (e) {
        console.error("Error loading saved addresses:", e);
      }
    }
  }, []);

  // Initialize Google Map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || googleMapRef.current) return;

    const initializeMap = async () => {
      if (!mapRef.current || googleMapRef.current) return;

      // Ensure google.maps is available and fully loaded
      if (typeof window === 'undefined' || !window.google || !window.google.maps || !window.google.maps.MapTypeId) {
        // Wait a bit and retry if Google Maps is still loading
        setTimeout(() => {
          if (window.google && window.google.maps && window.google.maps.MapTypeId && mapRef.current && !googleMapRef.current) {
            initializeMap();
          }
        }, 100);
        return;
      }

      try {
        // Import the maps library to get the Map class
        const { Map } = await window.google.maps.importLibrary('maps') as any;

        if (!mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: { lat: mapCenter.lat, lng: mapCenter.lng },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        googleMapRef.current = map;

        // Add listener for map center changes
        map.addListener("center_changed", () => {
          const center = map.getCenter();
          if (center) {
            setMapCenter({ lat: center.lat(), lng: center.lng() });
          }
        });
      } catch (error) {
        console.error("Error initializing Google Map:", error);
      }
    };

    initializeMap();
  }, [isLoaded, mapCenter.lat, mapCenter.lng]);

  // Update markers when addresses change
  useEffect(() => {
    if (!googleMapRef.current || !isLoaded) return;

    // Ensure google.maps is available
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      return;
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers
    addresses
      .filter((a) => typeof a.lat === "number" && typeof a.lng === "number")
      .forEach((addr) => {
        const marker = new window.google.maps.Marker({
          position: { lat: addr.lat!, lng: addr.lng! },
          map: googleMapRef.current!,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#FFD700",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 3,
          },
          title: addr.address,
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px; font-size: 14px;">${addr.address}</div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(googleMapRef.current!, marker);
        });

        markersRef.current.push(marker);
      });
  }, [addresses, isLoaded]);

  // Handle address selection via radio button
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  // Geocode address to get coordinates
  const geocodeAddress = (address: string): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!window.google || !window.google.maps) {
        // Fallback: use map center with small offset
        const offsetLat = (Math.random() - 0.5) * 0.01;
        const offsetLng = (Math.random() - 0.5) * 0.01;
        resolve({ lat: mapCenter.lat + offsetLat, lng: mapCenter.lng + offsetLng });
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          // Fallback: use map center with small offset
          const offsetLat = (Math.random() - 0.5) * 0.01;
          const offsetLng = (Math.random() - 0.5) * 0.01;
          resolve({ lat: mapCenter.lat + offsetLat, lng: mapCenter.lng + offsetLng });
        }
      });
    });
  };

  // Add new location using LocationDialog
  const handleLocationAdd = async (location: LocationData) => {
    const coords = await geocodeAddress(location.address);

    const newAddr: RouteAddress = {
      id: location.id,
      address: location.address,
      lat: coords?.lat,
      lng: coords?.lng,
    };

    const updatedAddresses = [...addresses, newAddr];
    setAddresses(updatedAddresses);

    // Save to sessionStorage
    sessionStorage.setItem("routeAddresses", JSON.stringify(updatedAddresses));

    // Select the newly added address
    setSelectedAddressId(location.id);

    setOpenLocationDialog(false);
  };

  // Remove an address
  const handleRemoveAddress = (addressId: string) => {
    const updated = addresses.filter((a) => a.id !== addressId);
    setAddresses(updated);
    sessionStorage.setItem("routeAddresses", JSON.stringify(updated));

    // If removed address was selected, select first available or clear selection
    if (selectedAddressId === addressId) {
      if (updated.length > 0) {
        setSelectedAddressId(updated[0].id);
      } else {
        setSelectedAddressId("");
      }
    }
  };

  // Proceed action
  const handleProceed = () => {
    // Save current addresses to sessionStorage before navigating
    sessionStorage.setItem("routeAddresses", JSON.stringify(addresses));
    navigate("/billing");
  };

  // Recenter map
  const handleRecenter = () => {
    if (googleMapRef.current && typeof window !== 'undefined' && (window as any).google) {
      googleMapRef.current.setCenter({ lat: mapCenter.lat, lng: mapCenter.lng });
      googleMapRef.current.setZoom(15);
    }
  };

  // Sync currentLocation state with hook value when it changes
  useEffect(() => {
    if (currentLocationFromHook && currentLocationFromHook !== 'Loading...') {
      setCurrentLocation(currentLocationFromHook);
    }
  }, [currentLocationFromHook]);

  console.log(selectedAddressId, addresses, 'addresses');

  return (
    <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
      <DashboardNavbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          minHeight: "calc(100vh - 80px)",
          p: { xs: 2, md: 4 },
        }}
      >
        {/* rounded white map background card */}
        <Card className="map-card">
          {/* Google Map container */}
          {loadError && (
            <Box sx={{ p: 2, textAlign: "center", color: "#336B3F" }}>
              <Typography>Error loading map: {loadError}</Typography>
            </Box>
          )}
          {!isLoaded && !loadError && (
            <Box sx={{ p: 2, textAlign: "center", color: "#336B3F" }}>
              <Typography>Loading map...</Typography>
            </Box>
          )}
          <div
            ref={mapRef}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 12,
              minHeight: 580,
            }}
          />
        </Card>

        {/* Center top date/time/day */}
        <Box className="center-datetime">
          {selectedDay && (
            <Typography className="day-text" sx={{ color: "#336B3F", fontSize: "0.95rem", fontWeight: 600, mb: 0.5 }}>
              {selectedDay}
            </Typography>
          )}
          <Typography className="date-text">{selectedDate}</Typography>
          <Typography className="time-text">{selectedTime}</Typography>
        </Box>

        {/* Static yellow marker (design element) near center-right (keeps visual parity with Figma) */}
        <Box className="design-static-marker">
          <Box
            sx={{
              width: 64,
              height: 64,
              backgroundColor: "#FFD700",
              border: "4px solid #fff",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: "#336B3F",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>

        {/* Recenter button (positioned on map) */}
        <Box className="recenter-btn">
          <IconButton
            onClick={handleRecenter}
            sx={{
              backgroundColor: "#336B3F",
              color: "#fff",
              width: 56,
              height: 56,
              "&:hover": { backgroundColor: "#2d5a35" },
            }}
          >
            {/* simple crosshair with CSS circle inside */}
            <Box sx={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff" }} />
          </IconButton>
        </Box>

        {/* Address Selection Panel Card - positioned on map */}
        <Box className="address-card">
          <Card sx={{ p: 1, backgroundColor: "#336B3F", borderRadius: 3 }}>
            <RadioGroup
              row
              value={selectedAddressId}
              onChange={(e) => handleAddressSelect(e.target.value)}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                mb: 1,
              }}
            >
              {addresses?.map((addr) => (
                <Box
                  key={addr.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#C9F8BA",
                    borderRadius: 2,
                    padding: "4px 10px",
                    gap: 0.5,
                    width: "31%",
                    minWidth: "150px",
                  }}
                >
                  <FormControlLabel
                    sx={{
                      margin: 0,
                      flex: 1,
                    }}
                    value={addr.id}
                    control={
                      <Radio
                        sx={{
                          color: "#336B3F",
                          "&.Mui-checked": { color: "#336B3F" },
                          p: 0.2,
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          color: "#336B3F",
                          fontSize: "0.82rem",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100px",
                        }}
                      >
                        {addr.address}
                      </Typography>
                    }
                  />

                  <IconButton
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleRemoveAddress(addr.id); }}
                    sx={{
                      color: "#336B3F",
                      p: "2px",
                      "&:hover": { color: "#fff" }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </RadioGroup>

            {/* Add New button */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <MuiButton
                onClick={() => setOpenLocationDialog(true)}
                startIcon={<AddIcon />}
                sx={{
                  color: "rgba(201, 248, 186, 1)",
                  backgroundColor: "rgba(0,0,0,0.07)",
                  borderRadius: 4,
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Add New
              </MuiButton>
            </Box>

            {/* Divider */}
            <Box sx={{ height: 1, backgroundColor: "rgba(201, 248, 186, 0.12)", my: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1, mb: 2 }}>
              <MyLocation sx={{ fontSize: 24, color: "rgba(201,248,186,1)" }} />
              {isLoaded ? (
                <Box sx={{ position: "relative", flex: 1 }}>
                  <Autocomplete
                    onLoad={(ref) => {
                      currentLocationAutocompleteRef.current = ref;
                    }}
                    onPlaceChanged={() => {
                      if (currentLocationAutocompleteRef.current) {
                        const place = currentLocationAutocompleteRef.current.getPlace();
                        if (place) {
                          const addressValue = place.formatted_address || place.name || "";
                          setCurrentLocation(addressValue);
                        }
                      }
                    }}
                  >
                    <input
                      ref={currentLocationInputRef}
                      type="text"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      placeholder="Type or choose current location"
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "rgba(201,248,186,1)",
                        fontSize: "0.9rem",
                        width: "100%",
                      }}
                    />
                  </Autocomplete>

                  <style>{`
                    .pac-container {
                      z-index: 1400 !important;
                      border-radius: 14px;
                      margin-top: 4px;
                    }
                    .pac-item {
                      padding: 10px;
                      cursor: pointer;
                    }
                    .pac-item:hover {
                      background-color: #f5f5f5;
                    }
                  `}</style>
                </Box>
              ) : (
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="Loading location autocomplete..."
                  disabled
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "rgba(201,248,186,0.6)",
                    fontSize: "0.9rem",
                    width: "100%",
                    cursor: "not-allowed",
                  }}
                />
              )}
              {currentLocation && currentLocation !== "Loading..." && (
                <IconButton
                  size="small"
                  onClick={() => setCurrentLocation("")}
                  sx={{ color: "rgba(255,255,255,0.85)", "&:hover": { color: "#fff" } }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Divider sx={{ height: "2px", background: "#FFFFFF", my: 1.5 }} />
            <Box sx={{ mb: 2, color: "rgba(201, 248, 186, 1)", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">
                <AddLocation sx={{ fontSize: '24px' }} /> {selectedAddressId ? addresses.find((a) => a.id === selectedAddressId)?.address : "No address selected"}
              </Typography>
            </Box>

            {/* Proceed */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <MuiButton
                onClick={handleProceed}
                sx={{
                  mt: 1,
                  backgroundColor: "rgba(201, 248, 186, 1)",
                  color: "#336B3F",
                  borderRadius: "20px",
                  py: 1.25,
                  fontWeight: 700,
                  textTransform: "none",
                  width: "70%",
                  "&:hover": { backgroundColor: "rgba(201, 248, 186, 0.85)" },
                }}
              >
                Proceed
              </MuiButton>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Add Location Dialog */}
      <LocationDialog
        open={openLocationDialog}
        onClose={() => setOpenLocationDialog(false)}
        onAddLocation={handleLocationAdd}
      />
    </Box>
  );
};

export default RouteSelection;
