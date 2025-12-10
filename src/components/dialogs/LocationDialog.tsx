import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldComponent from "../ui/TextField";
import { Button } from "../ui";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../utils/config";

const libraries: any[] = ["places"];

export interface LocationData {
  id: string;
  address: string;
  zipCode: string;
  state: string;
}

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
  onAddLocation?: (location: LocationData) => void;
  indianStates?: Array<{ value: string; label: string }>;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  open,
  onClose,
  onAddLocation,
}) => {
  const apiKey = GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Debug: Log API key status (remove in production)
  React.useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key is missing!");
    } else if (apiKey === 'AIzaSyByeL4973jLw5-DqyPtVl79I3eDN4uAuAQ') {
      console.log("Using default API key. Make sure to set VITE_GOOGLE_MAPS_API_KEY in .env file.");
    }
    if (loadError) {
      console.error("Google Maps load error:", loadError);
    }
    if (isLoaded) {
      console.log("Google Maps loaded successfully");
    }
  }, [apiKey, isLoaded, loadError]);

  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const zipCodeAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const zipCodeInputRef = useRef<HTMLInputElement>(null);

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const addressValue = place.formatted_address || place.name || "";
        setAddress(addressValue);

        const comp = place.address_components || [];

        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) setZipCode(postal.long_name);

        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) setState(st.long_name);
      }
    }
  }, []);

  const handleZipCodePlaceChanged = useCallback(() => {
    if (zipCodeAutocompleteRef.current) {
      const place = zipCodeAutocompleteRef.current.getPlace();
      if (place) {
        const addressValue = place.formatted_address || place.name || "";
        setAddress(addressValue);

        const comp = place.address_components || [];

        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) setZipCode(postal.long_name);

        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) setState(st.long_name);
      }
    }
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !zipCode || !state) return;

    const newLocation: LocationData = {
      id: `location-${Date.now()}`,
      address,
      zipCode,
      state,
    };

    onAddLocation?.(newLocation);

    setAddress("");
    setZipCode("");
    setState("");
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{ 
        sx: { 
          background: "rgba(201,248,186,1)", 
          borderRadius: "20px",
          overflow: "visible", // Allow autocomplete dropdown to be visible
        } 
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            overflow: "visible", // Ensure dropdown is visible
          },
        },
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold" }}>
        Add Location
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 10, top: 10, color: "#336B3F" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2, color: "rgba(51,107,63,0.7)" }}>
          Add home & work locations
        </Typography>

        {loadError && (
          <Typography color="red">
            Failed to load maps. {loadError.message || "Please check your API key."}
          </Typography>
        )}
        {!isLoaded && !loadError && (
          <Typography>Loading address autocomplete...</Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* Address Autocomplete */}
          <Box sx={{ position: "relative", zIndex: 1300 }}>
            <Typography
              component="label"
              sx={{
                display: "block",
                mb: 1,
                color: "#336B3F",
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Address <span style={{ color: "red" }}>*</span>
            </Typography>
            {isLoaded ? (
              <Box sx={{ position: "relative" }}>
                <Autocomplete
                  onLoad={(ref) => {
                    autocompleteRef.current = ref;
                    console.log("Autocomplete loaded:", ref);
                  }}
                  onPlaceChanged={() => {
                    console.log("Place changed triggered");
                    handlePlaceChanged();
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    onFocus={() => {
                      console.log("Input focused, autocomplete ref:", autocompleteRef.current);
                    }}
                    placeholder="Enter address"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "1rem",
                      border: "2.5px solid #336B3F",
                      borderRadius: "14px",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "#336B3F",
                    }}
                  />
                </Autocomplete>
                {/* Ensure Google's autocomplete dropdown is visible */}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address (loading...)"
                disabled
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "1rem",
                  border: "2.5px solid #336B3F",
                  borderRadius: "14px",
                  outline: "none",
                  backgroundColor: "#f5f5f5",
                  color: "#666",
                  cursor: "not-allowed",
                }}
              />
            )}
          </Box>


          {/* Zip Code Autocomplete */}
          <Box sx={{ position: "relative", zIndex: 1300 }}>
            <Typography
              component="label"
              sx={{
                display: "block",
                mb: 1,
                color: "#336B3F",
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Zip Code <span style={{ color: "red" }}>*</span>
            </Typography>
            {isLoaded ? (
              <Box sx={{ position: "relative" }}>
                <Autocomplete
                  onLoad={(ref) => {
                    zipCodeAutocompleteRef.current = ref;
                  }}
                  onPlaceChanged={() => {
                    handleZipCodePlaceChanged();
                  }}
                >
                  <input
                    ref={zipCodeInputRef}
                    type="text"
                    value={zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setZipCode(value);
                    }}
                    placeholder="Enter zip code or search by postal code"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "1rem",
                      border: "2.5px solid #336B3F",
                      borderRadius: "14px",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "#336B3F",
                    }}
                  />
                </Autocomplete>
              </Box>
            ) : (
              <TextFieldComponent
                label="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                required
                disabled={true}
              />
            )}
          </Box>

          <TextFieldComponent
            label="State"
            value={state}
            onChange={() => {}} // Read-only, auto-populated from address
            placeholder="State will be auto-filled from address"
            required
            type="text"
            disabled={true}
          />

          <Button type="submit" style={{ background: "#336B3F", color: "white", borderRadius: 12 }}>
            Add Location
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
