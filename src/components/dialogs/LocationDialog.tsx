import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../utils/config";
import { addUserAddress, updateUserAddress } from "../../utils/auth";
import { getCookie } from "../../utils/cookies";
import { showSuccessToast } from "../../utils/toast";
import Loader from "../ui/Loader";

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
  editAddress?: {
    _id: string;
    userId: string;
    addressType: string;
    zipCode: string;
    houseNumber: string;
    streetName: string;
    area: string;
    landmark?: string;
    city: string;
    state: string;
    isDefault: boolean;
    currentAddress?: {
      type: string;
      coordinates: [number, number];
    };
  } | null;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  open,
  onClose,
  onAddLocation,
  editAddress,
}) => {
  const userId = getCookie("loggedinId");
  const apiKey = GOOGLE_MAPS_API_KEY;
  const isEditMode = !!editAddress;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [addressType, setAddressType] = useState("Home");
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const zipCodeAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const zipCodeInputRef = useRef<HTMLInputElement>(null);

  // Load edit address data when dialog opens
  useEffect(() => {
    if (editAddress && open) {
      // Format address from components
      const parts = [];
      if (editAddress.houseNumber) parts.push(editAddress.houseNumber);
      if (editAddress.streetName) parts.push(editAddress.streetName);
      if (editAddress.area) parts.push(editAddress.area);
      if (editAddress.city) parts.push(editAddress.city);
      if (editAddress.state) parts.push(editAddress.state);
      if (editAddress.zipCode) parts.push(editAddress.zipCode);
      
      setAddress(parts.join(", "));
      setZipCode(editAddress.zipCode || "");
      setState(editAddress.state || "");
      setCity(editAddress.city || "");
      setStreetName(editAddress.streetName || "");
      setHouseNumber(editAddress.houseNumber || "");
      setArea(editAddress.area || "");
      setAddressType(editAddress.addressType || "Home");
      setIsDefault(editAddress.isDefault || false);
      
      // Set coordinates if available
      if (editAddress.currentAddress && editAddress.currentAddress.coordinates) {
        const [lng, lat] = editAddress.currentAddress.coordinates;
        setLatitude(lat);
        setLongitude(lng);
      }
    } else if (!editAddress && open) {
      // Reset form when opening for new address
      setAddress("");
      setZipCode("");
      setState("");
      setCity("");
      setStreetName("");
      setHouseNumber("");
      setArea("");
      setLatitude(null);
      setLongitude(null);
      setAddressType("Home");
      setIsDefault(false);
    }
  }, [editAddress, open]);

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const addressValue = place.formatted_address || place.name || "";
        setAddress(addressValue);

        const comp = place.address_components || [];

        // Extract postal code
        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) setZipCode(postal.long_name);

        // Extract state
        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) setState(st.long_name);

        // Extract city
        const cityComp = comp.find((c: any) => 
          c.types.includes("locality") || c.types.includes("administrative_area_level_2")
        );
        if (cityComp) setCity(cityComp.long_name);

        // Extract street name
        const route = comp.find((c: any) => c.types.includes("route"));
        if (route) setStreetName(route.long_name);

        // Extract house number
        const streetNumber = comp.find((c: any) => c.types.includes("street_number"));
        if (streetNumber) setHouseNumber(streetNumber.long_name);

        // Extract area/neighborhood
        const neighborhood = comp.find((c: any) => 
          c.types.includes("neighborhood") || c.types.includes("sublocality")
        );
        if (neighborhood) setArea(neighborhood.long_name);

        // Extract coordinates from place geometry
        if (place.geometry && place.geometry.location) {
          const lat = typeof place.geometry.location.lat === 'function' 
            ? place.geometry.location.lat() 
            : place.geometry.location.lat;
          const lng = typeof place.geometry.location.lng === 'function' 
            ? place.geometry.location.lng() 
            : place.geometry.location.lng;
          
          setLatitude(lat);
          setLongitude(lng);
        }
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

        // Extract postal code
        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) setZipCode(postal.long_name);

        // Extract state
        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) setState(st.long_name);

        // Extract city
        const cityComp = comp.find((c: any) => 
          c.types.includes("locality") || c.types.includes("administrative_area_level_2")
        );
        if (cityComp) setCity(cityComp.long_name);

        // Extract street name
        const route = comp.find((c: any) => c.types.includes("route"));
        if (route) setStreetName(route.long_name);

        // Extract house number
        const streetNumber = comp.find((c: any) => c.types.includes("street_number"));
        if (streetNumber) setHouseNumber(streetNumber.long_name);

        // Extract area/neighborhood
        const neighborhood = comp.find((c: any) => 
          c.types.includes("neighborhood") || c.types.includes("sublocality")
        );
        if (neighborhood) setArea(neighborhood.long_name);

        // Extract coordinates from place geometry
        if (place.geometry && place.geometry.location) {
          const lat = typeof place.geometry.location.lat === 'function' 
            ? place.geometry.location.lat() 
            : place.geometry.location.lat;
          const lng = typeof place.geometry.location.lng === 'function' 
            ? place.geometry.location.lng() 
            : place.geometry.location.lng;
          
          setLatitude(lat);
          setLongitude(lng);
        }
      }
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !zipCode || !state) return;
    if (latitude === null || longitude === null) {
      console.error("Coordinates are missing. Please select a valid address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        userId: userId,
        city: city || state,         
        state: state,
        zipCode,
        houseNumber: houseNumber || "",
        streetName: streetName || address,
        area: area || "",
        landmark: "",
        longitude: longitude,
        latitude: latitude,
        addressType: addressType,
        isDefault: isDefault
      };

      let response;
      if (isEditMode && editAddress) {
        // Update existing address
        response = await updateUserAddress(editAddress._id, payload);
        showSuccessToast(response.data.message || "Address updated successfully!");
      } else {
        // Add new address
        response = await addUserAddress(payload);
        showSuccessToast(response.data.message || "Address added successfully!");
      }
      
      console.log(response);
      
      // Don't add to savedLocations - let API refresh handle it
      // onAddLocation?.({
      //   id: editAddress?._id || `loc-${Date.now()}`,
      //   address,
      //   zipCode,
      //   state,
      // });
      
      setAddress("");
      setZipCode("");
      setState("");
      setCity("");
      setStreetName("");
      setHouseNumber("");
      setArea("");
      setLatitude(null);
      setLongitude(null);
      setAddressType("Home");
      setIsDefault(false);
      onClose();
      
      // Trigger refresh instead of page reload
      // The refreshTrigger will be handled by parent component
      if (onAddLocation) {
        // Pass a flag to trigger refresh
        onAddLocation({
          id: editAddress?._id || `loc-${Date.now()}`,
          address,
          zipCode,
          state,
        });
      }
    } catch (err: any) {
      console.log(err);
      showSuccessToast(err.message || "Failed to save address");
    } finally {
      setIsSubmitting(false);
    }
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
          overflow: "visible",
        } 
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            overflow: "visible",
          },
        },
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold" }}>
        {isEditMode ? "Edit Location" : "Add Location"}
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 10, top: 10, color: "#336B3F" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
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

          <Select
            label="Address Type"
            options={[
              { value: "Home", label: "Home" },
              { value: "Work", label: "Work" },
              { value: "Other", label: "Other" },
            ]}
            value={addressType}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => 
              setAddressType(e.target.value as string)
            }
            variant="dialog"
            fullWidth={true}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
              }}
            />
            <Typography
              component="label"
              htmlFor="isDefault"
              sx={{
                color: "#336B3F",
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                cursor: "pointer",
              }}
            >
              Set as default address
            </Typography>
          </Box>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            style={{ background: "#336B3F", color: "white", borderRadius: 12 }}
          >
            {isSubmitting ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Loader size={20} color="#fff" />
                <span>{isEditMode ? "Updating..." : "Adding..."}</span>
              </Box>
            ) : (
              isEditMode ? "Update Location" : "Add Location"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
