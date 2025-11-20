import React, { useState } from "react";
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
import { Button, Select } from "../ui";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
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
  indianStates = [],
}) => {
  const apiKey = GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      handlePlaceSelected(place);
    }
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place) {
      const formattedAddress = place.formatted_address || place.name || "";
      setAddress(formattedAddress);
      const addressComponents = place.address_components || [];
      const postalCode = addressComponents.find(
        (component: any) => component.types.includes("postal_code")
      );
      if (postalCode) {
        setZipCode(postalCode.long_name);
      }
      const stateComponent = addressComponents.find(
        (component: any) => component.types.includes("administrative_area_level_1")
      );
      if (stateComponent) {
        const matchedState = indianStates.find(
          (s) => s.label.toLowerCase().includes(stateComponent.long_name.toLowerCase()) ||
            stateComponent.long_name.toLowerCase().includes(s.label.toLowerCase())
        );
        setState(matchedState ? matchedState.value : stateComponent.long_name);
      }
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, '');
    setZipCode(zip);
    if (zip.length >= 5 && !address && (window as any).google && (window as any).google.maps) {
      const geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode(
        { address: zip },
        (results: any[], status: any) => {
          if (status === 'OK' && results && results.length > 0) {
            const result = results[0];
            setAddress(result.formatted_address);
            const addressComponents = result.address_components || [];
            const stateComponent = addressComponents.find(
              (component: any) => component.types.includes("administrative_area_level_1")
            );
            if (stateComponent) {
              const matchedState = indianStates.find(
                (s) => s.label.toLowerCase().includes(stateComponent.long_name.toLowerCase()) ||
                  stateComponent.long_name.toLowerCase().includes(s.label.toLowerCase())
              );
              setState(matchedState ? matchedState.value : stateComponent.long_name);
            }
          }
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddLocation) {
      const newLocation: LocationData = {
        id: Date.now().toString(),
        address,
        zipCode,
        state,
      };
      onAddLocation(newLocation);
    }
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
          backgroundColor: "rgba(201, 248, 186, 1)",
          borderRadius: "28px",
        }
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold", fontSize: "1.5rem" }}>
        Add Location
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: "#336B3F", }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)", mb: 3, }}>
          Add home & work locations
        </Typography>
        {loadError && (
          <Box sx={{ py: 2, mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#e74c3c" }}>
              Error loading maps: {loadError.message}
            </Typography>
          </Box>
        )}
        {!isLoaded && !loadError && (
          <Box sx={{ py: 2, mb: 2 }}>
            <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)" }}>
              Loading Google Maps...
            </Typography>
          </Box>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            {apiKey && isLoaded ? (
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={{
                  types: ["geocode", "establishment"],
                  componentRestrictions: { country: "in" },
                }}
              >
                 <input
                   type="text"
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                   placeholder="Enter address"
                   style={{
                     width: "100%",
                     height: "56px",
                     padding: "0 14px",
                     fontSize: "16px",
                     borderRadius: "14px",
                     border: "2px solid #336B3F",
                     backgroundColor: "transparent",
                     color: "#336B3F",
                     outline: "none",
                     fontFamily: "inherit",
                   }}
                   required
                 />
              </Autocomplete>
            ) : (
              <TextFieldComponent
                label="Current Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                borderColor="#336B3F"
                labelColor="#336B3F"
                textColor="#336B3F"
                required
              />
            )}

          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextFieldComponent
                label="Zip Code"
                value={zipCode}
                onChange={handleZipCodeChange}
                borderColor="#336B3F"
                labelColor="#336B3F"
                textColor="#336B3F"
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Select
                label="State"
                options={indianStates}
                value={state}
                onChange={(e) => setState(e.target.value as string)}
                placeholder="Select State"
                variant="dialog"
                required
              />
            </Box>
          </Box>
          <Button type="submit" variant="primary" size="large" style={{ backgroundColor: "#336B3F", color: "white", borderRadius: "12px", fontWeight: "bold", marginTop: 2, }}>
            Add Location
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;

