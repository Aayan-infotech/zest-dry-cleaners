import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import DashboardNavbar from "../components/DashboardNavbar";
import TextFieldComponent from "../components/ui/TextField";
import { Button, Select } from "../components/ui";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import PaymentMethodDialog from "../components/dialogs/PaymentMethodDialog";
import type { CardData } from "../components/dialogs/PaymentMethodDialog";
import LocationDialog from "../components/dialogs/LocationDialog";
import type { LocationData } from "../components/dialogs/LocationDialog";
import LogoutDialog from "../components/dialogs/LogoutDialog";
import ContactForm from "../components/profile/ContactForm";
import PaymentCardForm from "../components/profile/PaymentCardForm";
import LocationCard from "../components/profile/LocationCard";
import { GOOGLE_MAPS_API_KEY } from "../utils/config";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import "./EditProfile.css";

const libraries: any[] = ["places"];
import { getUserProfile, updateUserProfile } from "../utils/auth";
import Loader from "../components/ui/Loader";
import { showSuccessToast } from "../utils/toast";
import { CheckCircle } from "@mui/icons-material";

// Get country codes dynamically from libphonenumber-js
const getCountryCodes = () => {
  const countries = getCountries();
  return countries.map((countryCode) => {
    const dialCode = getCountryCallingCode(countryCode);
    return {
      value: `+${dialCode}`,
      label: `+${dialCode}`,
      countryCode: countryCode,
    };
  }).sort((a, b) => a.value.localeCompare(b.value));
};

// Get max length for a country code using libphonenumber-js
const getMaxLengthForCountry = (countryCode: string): number => {
  try {
    const exampleNumber = getExampleNumber(countryCode as any, examples);
    if (exampleNumber) {
      const parsed = parsePhoneNumber(exampleNumber.number, countryCode as any);
      if (parsed) {
        const exampleLength = parsed.nationalNumber.length;
        return exampleLength + 2;
      }
    }
  } catch (error) {
    console.warn(`Could not determine max length for ${countryCode}, using default`);
  }
  return 15;
};

// Indian states list (comprehensive list)
const getIndianStates = () => {
  return [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "andaman-nicobar", label: "Andaman and Nicobar Islands" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "dadra-nagar-haveli-daman-diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "delhi", label: "Delhi" },
    { value: "jammu-kashmir", label: "Jammu and Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "lakshadweep", label: "Lakshadweep" },
    { value: "puducherry", label: "Puducherry" },
  ];
};

const EditProfile = () => {
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [paymentMethodDialogOpen, setPaymentMethodDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Get dynamic data
  const countryCodes = useMemo(() => getCountryCodes(), []);
  const indianStates = useMemo(() => getIndianStates(), []);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    address: "",
    zipCode: "",
    state: "",
    profileImage: "",
    isEmailVerified: false,
    isPhoneVerified: false,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [showProfileEditForm, setShowProfileEditForm] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentCardForm, setShowPaymentCardForm] = useState(false);
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [savedCards, setSavedCards] = useState<CardData[]>([]);
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);
  const [locationRefreshTrigger, setLocationRefreshTrigger] = useState(0);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [supportView, setSupportView] = useState<"menu" | "chat" | "call" | "faq">("menu");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { id: string; from: "user" | "assistant"; text: string; time: string }[]>([
      { id: "1", from: "user", text: "Hey, I need help !", time: "08:15 AM" },
      { id: "2", from: "assistant", text: "Good morning ! How can I help?", time: "08:20 AM" },
    ]);

  // Google Maps Autocomplete refs
  const addressAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const zipCodeAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const zipCodeInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  // Load Google Maps
  const { isLoaded: isMapsLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      const user = response.user;
      setProfile(prev => ({
        ...prev,
        _id: user?._id || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        profileImage: user?.profileImage || "",
        address: user?.address || "",
        zipCode: user?.zipCode || "",
        state: user?.state || "",
        isEmailVerified: user?.isEmailVerified || false,
        isPhoneVerified: user?.isPhoneVerified || false,
      }));
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Get country code object from dial code
  const getCountryCodeFromDialCode = (dialCode: string) => {
    const country = countryCodes.find(cc => cc.value === dialCode);
    return country?.countryCode || "US";
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    const countryCodeObj = getCountryCodeFromDialCode(profile.countryCode);
    const maxLength = getMaxLengthForCountry(countryCodeObj);
    setProfile(prev => ({
      ...prev,
      phoneNumber: value.slice(0, maxLength)
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newCode = e.target.value as string;
    const countryCodeObj = getCountryCodeFromDialCode(newCode);
    const maxLength = getMaxLengthForCountry(countryCodeObj);
    setProfile(prev => ({
      ...prev,
      countryCode: newCode,
      phoneNumber: prev.phoneNumber.slice(0, maxLength)
    }));
  };

  // Handle address place selection
  const handleAddressPlaceChanged = useCallback(() => {
    if (addressAutocompleteRef.current) {
      const place = addressAutocompleteRef.current.getPlace();
      if (place) {
        const addressValue = place.formatted_address || place.name || "";
        setProfile(prev => ({ ...prev, address: addressValue }));
        const comp = place.address_components || [];
        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) {
          setProfile(prev => ({ ...prev, zipCode: postal.long_name }));
        }
        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) {
          const stateLabel = st.long_name;
          const matchedState = indianStates.find(s => s.label === stateLabel || s.label.toLowerCase() === stateLabel.toLowerCase());
          if (matchedState) {
            setProfile(prev => ({ ...prev, state: matchedState.value }));
          } else {
            setProfile(prev => ({ ...prev, state: stateLabel }));
          }
        }
      }
    }
  }, [indianStates]);

  // Handle zip code place selection
  const handleZipCodePlaceChanged = useCallback(() => {
    if (zipCodeAutocompleteRef.current) {
      const place = zipCodeAutocompleteRef.current.getPlace();
      if (place) {
        const addressValue = place.formatted_address || place.name || "";
        setProfile(prev => ({ ...prev, address: addressValue }));
        const comp = place.address_components || [];
        const postal = comp.find((c: any) => c.types.includes("postal_code"));
        if (postal) {
          setProfile(prev => ({ ...prev, zipCode: postal.long_name }));
        }
        const st = comp.find((c: any) => c.types.includes("administrative_area_level_1"));
        if (st) {
          const stateLabel = st.long_name;
          const matchedState = indianStates.find(s => s.label === stateLabel || s.label.toLowerCase() === stateLabel.toLowerCase());
          if (matchedState) {
            setProfile(prev => ({ ...prev, state: matchedState.value }));
          } else {
            setProfile(prev => ({ ...prev, state: stateLabel }));
          }
        }
      }
    }
  }, [indianStates]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);  // required for API
      const reader = new FileReader();
      reader.onloadend = () => setProfile((prev) => ({ ...prev!, profileImage: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber
      };
      const res = await updateUserProfile(profile?._id, payload, selectedImageFile || undefined);
      showSuccessToast("Profile Updated Successfully!");
      setProfile((prev) => ({
        ...prev!,
        fullName: res.user.fullName,
        phoneNumber: res.user.phoneNumber,
        profileImage: res.user.profileImage,
      }));
      fetchProfile();
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleShowEditProfile = () => {
    setShowProfileEditForm(true);
    setShowContactForm(false);
    setShowPaymentCardForm(false);
    setShowLocationCard(false);
  };

  const handleShowContactForm = () => {
    setShowContactForm(true);
    setShowProfileEditForm(false);
    setShowPaymentCardForm(false);
    setSupportView("menu");
  };
  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "user", text: chatInput.trim(), time },
    ]);
    setChatInput("");
  };


  const handleShowPaymentCard = () => {
    setShowPaymentCardForm(true);
    setShowProfileEditForm(false);
    setShowContactForm(false);
    setShowLocationCard(false);
  };

  const handleShowLocationCard = () => {
    setShowLocationCard(true);
    setShowPaymentCardForm(false);
    setShowProfileEditForm(false);
    setShowContactForm(false);
  };

  const handlePaymentMethodDialogOpen = () => {
    setPaymentMethodDialogOpen(true);
  };

  const handleAddCard = (card: CardData) => {
    setSavedCards((prevCards) => {
      const exists = prevCards.some((c) => c.id === card.id);
      if (exists) {
        return prevCards;
      }
      return [...prevCards, card];
    });
  };

  const handleAddLocation = (_location: LocationData) => {
    // Don't add to savedLocations - addresses will come from API
    // Just trigger refresh to fetch updated addresses from API
    setLocationRefreshTrigger((prev) => prev + 1);
  };

  const handleEditLocation = (location: LocationData) => {
    // Find the API address if this is an API address
    // We'll need to pass the full API address object to the dialog
    // For now, we'll set a flag and the LocationCard will pass the address
    setEditingAddress(location);
    setLocationDialogOpen(true);
  };

  const handleDeleteLocation = (locationId: string) => {
    setSavedLocations((prevLocations) => prevLocations.filter((l) => l.id !== locationId));
    // Trigger refresh of addresses from API
    setLocationRefreshTrigger((prev) => prev + 1);
  };

  const handleEditCard = (_card: CardData) => {
    // Open payment method dialog with existing card data for editing
    setPaymentMethodDialogOpen(true);
    // TODO: Pass the card to the dialog if it supports editing
    // For now, just opening the dialog - you may need to update PaymentMethodDialog to support edit mode
  };

  const handleDeleteCard = (cardId: string) => {
    setSavedCards((prevCards) => prevCards.filter((c) => c.id !== cardId));
  };


  return (
    <Box className="profile-page">
      <DashboardNavbar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loader />
        </Box>
      ) : (
        <main className="my-orders-content">
          <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
            <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} sx={{ gap: { xs: 2, md: 2 } }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box className="sidebar-card" sx={{ padding: { xs: "20px", sm: "24px", md: "30px" } }}>
                  <Box className="sidebar-item" onClick={handleShowEditProfile}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Avatar
                        src={profile?.profileImage || "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="}
                        sx={{ width: { xs: 50, sm: 55, md: 60 }, height: { xs: 50, sm: 55, md: 60 } }}
                      />
                      <Box>
                        <Typography className="item-title" sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}>{profile?.fullName || "User Name"}</Typography>
                        <Typography className="item-sub" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } }}>{profile.email || "example@email.com"}</Typography>
                      </Box>
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }} />
                  </Box>
                  <Typography variant="h6" className="sidebar-section" sx={{ fontWeight: 'bold' }}>GENERAL</Typography>
                  <Box className="sidebar-item" onClick={() => handleShowPaymentCard()}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <PaymentIcon />
                      <Box>
                        <Typography className="item-title">Payment Methods</Typography>
                        <Typography className="item-sub">Add credit & debit cards</Typography>
                      </Box>
                    </Box>
                    <ChevronRightIcon />
                  </Box>
                  <Box className="sidebar-item" onClick={() => handleShowLocationCard()}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <LocationOnIcon />
                      <Box>
                        <Typography className="item-title">Locations</Typography>
                        <Typography className="item-sub">Add home & work locations</Typography>
                      </Box>
                    </Box>
                    <ChevronRightIcon />
                  </Box>
                  <Typography variant="h6" className="sidebar-section" sx={{ fontWeight: 'bold' }}>NOTIFICATIONS</Typography>
                  <Box className="sidebar-item">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <NotificationsNoneIcon />
                      <Box>
                        <Typography className="item-title">Push Notifications</Typography>
                        <Typography className="item-sub">Daily updates</Typography>
                      </Box>
                    </Box>
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked color="primary" />} label={undefined} />
                    </FormGroup>
                  </Box>

                  <Box className="sidebar-item">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <NotificationsNoneIcon />
                      <Box>
                        <Typography className="item-title">Promotional Notifications</Typography>
                        <Typography className="item-sub">New offers</Typography>
                      </Box>
                    </Box>
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked color="primary" />} label={undefined} />
                    </FormGroup>
                  </Box>
                  <Typography variant="h6" className="sidebar-section" sx={{ fontWeight: 'bold' }}>MORE</Typography>
                  <Box className="sidebar-item" onClick={handleShowContactForm}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <PhoneIcon />
                      <Box>
                        <Typography className="item-title">Contact Us</Typography>
                        <Typography className="item-sub">Get help</Typography>
                      </Box>
                    </Box>
                    <ChevronRightIcon />
                  </Box>

                  <Box className="sidebar-item" onClick={() => setLogoutDialogOpen(true)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <LogoutIcon />
                      <Box>
                        <Typography className="item-title">Logout</Typography>
                      </Box>
                    </Box>
                    <ChevronRightIcon />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {showProfileEditForm && (
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2, position: "relative" }}>
                      <Box component="label" htmlFor="profile-image-upload" sx={{ position: "relative", cursor: "pointer", display: "inline-block", }}>
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="profile-image-upload" />
                        <Avatar src={profile?.profileImage || undefined} sx={{ width: { xs: 80, sm: 90, md: 100 }, height: { xs: 80, sm: 90, md: 100 } }} />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            backgroundColor: "#336B3F",
                            borderRadius: "50%",
                            width: { xs: 28, sm: 30, md: 32 },
                            height: { xs: 28, sm: 30, md: 32 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #C9F8BA",
                            cursor: "pointer",
                          }}
                        >
                          <CameraAltIcon sx={{ color: "#C9F8BA", fontSize: { xs: 16, sm: 17, md: 18 }, }} />
                        </Box>
                      </Box>
                    </Box>
                    <TextFieldComponent
                      label="Full Name"
                      value={profile?.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      borderColor="#C9F8BA"
                      labelColor="#C9F8BA"
                      textColor="#C9F8BA"
                      required
                    />
                    <Box sx={{ position: "relative" }}>
                      <TextFieldComponent
                        label="Email Address"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        type="email"
                        borderColor="#C9F8BA"
                        labelColor="#C9F8BA"
                        textColor="#C9F8BA"
                        disabled
                      />
                      {profile.isEmailVerified && (
                        <CheckCircle
                          sx={{
                            position: "absolute",
                            right: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#c9f8ba",
                            fontSize: { xs: 20, sm: 22, md: 24 }
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 2 }, alignItems: { xs: "stretch", sm: "flex-start" } }}>
                      <Box sx={{ width: { xs: "100%", sm: "120px" }, flexShrink: 0 }}>
                        <Select label="Code" options={countryCodes} value={profile?.countryCode} onChange={handleCountryCodeChange} fullWidth={true} variant="dark" />
                      </Box>
                      <Box sx={{ flex: 1, position: "relative" }}>
                        <TextFieldComponent
                          label="Phone Number"
                          value={profile.phoneNumber}
                          onChange={handlePhoneNumberChange}
                          borderColor="#C9F8BA"
                          labelColor="#C9F8BA"
                          textColor="#C9F8BA"
                          required
                        />

                        {profile.isPhoneVerified && (
                          <CheckCircle
                            sx={{
                              position: "absolute",
                              right: 14,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#c9f8ba",
                              fontSize: { xs: 20, sm: 22, md: 24 }
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                    {/* Current Address Autocomplete */}
                    <Box>
                      <Typography
                        component="label"
                        sx={{
                          display: "block",
                          mb: 1,
                          color: "#C9F8BA",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        Current Address <span style={{ color: "red" }}>*</span>
                      </Typography>
                      {isMapsLoaded ? (
                        <Box sx={{ position: "relative" }}>
                          <Autocomplete
                            onLoad={(ref) => {
                              addressAutocompleteRef.current = ref;
                            }}
                            onPlaceChanged={handleAddressPlaceChanged}
                          >
                            <input
                              ref={addressInputRef}
                              type="text"
                              value={profile?.address || ""}
                              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                              placeholder="Enter address"
                              required
                              style={{
                                width: "100%",
                                padding: "14px 16px",
                                fontSize: "1rem",
                                border: "2.5px solid #C9F8BA",
                                borderRadius: "14px",
                                outline: "none",
                                backgroundColor: "transparent",
                                color: "#C9F8BA",
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
                            input::placeholder {
                              color: #C9F8BA !important;
                              opacity: 0.7;
                            }
                            input::-webkit-input-placeholder {
                              color: #C9F8BA !important;
                              opacity: 0.7;
                            }
                            input::-moz-placeholder {
                              color: #C9F8BA !important;
                              opacity: 0.7;
                            }
                            input:-ms-input-placeholder {
                              color: #C9F8BA !important;
                              opacity: 0.7;
                            }
                          `}</style>
                        </Box>
                      ) : (
                        <TextFieldComponent
                          label="Current Address"
                          value={profile?.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          borderColor="#C9F8BA"
                          labelColor="#C9F8BA"
                          textColor="#C9F8BA"
                          required
                          disabled={true}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 2, sm: 3 } }}>
                      <Box sx={{ flex: 1 }}>
                        {isMapsLoaded ? (
                          <Box sx={{ position: "relative" }}>
                            <Autocomplete
                              onLoad={(ref) => {
                                zipCodeAutocompleteRef.current = ref;
                              }}
                              onPlaceChanged={handleZipCodePlaceChanged}
                            >
                              <input
                                ref={zipCodeInputRef}
                                type="text"
                                value={profile?.zipCode || ""}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, "");
                                  setProfile({ ...profile, zipCode: value });
                                }}
                                placeholder="Enter zip code or search by postal code"
                                required
                                style={{
                                  width: "100%",
                                  padding: "14px 16px",
                                  fontSize: "1rem",
                                  border: "2.5px solid #C9F8BA",
                                  borderRadius: "14px",
                                  outline: "none",
                                  backgroundColor: "transparent",
                                  color: "#C9F8BA",
                                }}
                              />
                            </Autocomplete>
                            <style>{`
                              input::placeholder {
                                color: #C9F8BA !important;
                                opacity: 0.7;
                              }
                              input::-webkit-input-placeholder {
                                color: #C9F8BA !important;
                                opacity: 0.7;
                              }
                              input::-moz-placeholder {
                                color: #C9F8BA !important;
                                opacity: 0.7;
                              }
                              input:-ms-input-placeholder {
                                color: #C9F8BA !important;
                                opacity: 0.7;
                              }
                            `}</style>
                          </Box>
                        ) : (
                          <TextFieldComponent
                            label="Zip Code"
                            value={profile?.zipCode}
                            onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                            borderColor="#C9F8BA"
                            labelColor="#C9F8BA"
                            textColor="#C9F8BA"
                            required
                            disabled={true}
                          />
                        )}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <TextFieldComponent
                          label="State"
                          value={profile?.state ? (indianStates.find(s => s.value === profile.state)?.label || profile.state) : ""}
                          onChange={() => { }} // Read-only, auto-populated from address
                          placeholder="State will be auto-filled from address"
                          borderColor="#C9F8BA"
                          labelColor="#C9F8BA"
                          textColor="#C9F8BA"
                          required
                          type="text"
                          disabled={true}
                        />
                      </Box>
                    </Box>
                    <Button
                      type="button"
                      size="large"
                      onClick={() => setChangePasswordDialogOpen(true)}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #C9F8BA",
                        color: "#C9F8BA",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      Change Password
                      <ArrowForwardIcon />
                    </Button>
                    <Button type="submit" disabled={saving}  size="large" style={{ backgroundColor: "#C9F8BA", border: "none", color: "#336B3F", borderRadius: "12px", fontWeight: "bold", }}>
                      {saving ? <Loader size={20} color="#fff" /> : "Save Changes"}
                    </Button>
                  </Box>
                )}

                {showContactForm && (
                  <ContactForm
                    supportView={supportView}
                    setSupportView={setSupportView}
                    chatMessages={chatMessages}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    onSendChatMessage={handleSendChatMessage}
                  />
                )}
                {showPaymentCardForm && (
                  <PaymentCardForm
                    savedCards={savedCards}
                    onAddCard={handlePaymentMethodDialogOpen}
                    onEditCard={handleEditCard}
                    onDeleteCard={handleDeleteCard}
                  />
                )}

                {showLocationCard && (
                  <LocationCard
                    savedLocations={savedLocations}
                    indianStates={indianStates}
                    onAddLocation={() => setLocationDialogOpen(true)}
                    onEditLocation={handleEditLocation}
                    onDeleteLocation={handleDeleteLocation}
                    refreshTrigger={locationRefreshTrigger}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        </main>
      )}
      {/* DIALOGS */}
      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        onClose={() => setChangePasswordDialogOpen(false)}
      />
      <PaymentMethodDialog
        open={paymentMethodDialogOpen}
        onClose={() => setPaymentMethodDialogOpen(false)}
        onAddCard={handleAddCard}
      />
      <LocationDialog
        open={locationDialogOpen}
        onClose={() => {
          setLocationDialogOpen(false);
          setEditingAddress(null);
        }}
        onAddLocation={handleAddLocation}
        indianStates={indianStates}
        editAddress={editingAddress}
      />
      <LogoutDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      />

    </Box>
  );
};

export default EditProfile;
