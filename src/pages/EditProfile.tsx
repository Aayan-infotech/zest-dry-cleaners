import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
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
import { GOOGLE_MAPS_API_KEY } from "../utils/config";
import AddIcon from '@mui/icons-material/Add';
import "./EditProfile.css";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  // Get dynamic data
  const countryCodes = useMemo(() => getCountryCodes(), []);
  const indianStates = useMemo(() => getIndianStates(), []);

  // Form state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showProfileEditForm, setShowProfileEditForm] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentCardForm, setShowPaymentCardForm] = useState(false);
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [savedCards, setSavedCards] = useState<CardData[]>([]);
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);
  const [supportView, setSupportView] = useState<"menu" | "chat" | "call" | "faq">("menu");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { id: string; from: "user" | "assistant"; text: string; time: string }[]>([
    { id: "1", from: "user", text: "Hey, I need help !", time: "08:15 AM" },
    { id: "2", from: "assistant", text: "Good morning ! How can I help?", time: "08:20 AM" },
  ]);
  const [profileImage, setProfileImage] = useState<string | null>(
    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
  );

  const openDialog = (title: string) => {
    setDialogTitle(title);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Get country code object from dial code
  const getCountryCodeFromDialCode = (dialCode: string) => {
    const country = countryCodes.find(cc => cc.value === dialCode);
    return country?.countryCode || "US";
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    // Get max length for current country code using libphonenumber-js
    const countryCodeObj = getCountryCodeFromDialCode(countryCode);
    const maxLength = getMaxLengthForCountry(countryCodeObj);
    // Limit to max length
    const limitedValue = digitsOnly.slice(0, maxLength);
    setPhoneNumber(limitedValue);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newCountryCode = e.target.value as string;
    setCountryCode(newCountryCode);
    // If current phone number exceeds new country's max length, truncate it
    const countryCodeObj = getCountryCodeFromDialCode(newCountryCode);
    const maxLength = getMaxLengthForCountry(countryCodeObj);
    if (phoneNumber.length > maxLength) {
      setPhoneNumber(phoneNumber.slice(0, maxLength));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      fullName,
      email,
      phoneNumber,
      countryCode,
      address,
      zipCode,
      state,
      password,
      confirmPassword,
      profileImage,
    });
  };

  const handleShowEditProfile = () => {
    setShowProfileEditForm(true);
    setShowContactForm(false);
    setShowPaymentCardForm(false);
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
    setSavedCards([...savedCards, card]);
  };

  const handleAddLocation = (location: LocationData) => {
    setSavedLocations([...savedLocations, location]);
  };

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length < 4) return cardNumber;
    const last4 = cleaned.slice(-4);
    const first4 = cleaned.slice(0, 4);
    return `${first4} – XXXX – XXXX – ${last4}`;
  };

  return (
    <Box className="profile-page">
      <DashboardNavbar />
      <main className="my-orders-content">
        <Container maxWidth="xl">
          <Grid container spacing={2} gap={2}>
            <Grid size={6}>
              <Box className="sidebar-card">
                <Box className="sidebar-item" onClick={handleShowEditProfile}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                      src={profileImage || "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                      <Typography className="item-title">theKStark</Typography>
                      <Typography className="item-sub">ikstark@gmail.com</Typography>
                    </Box>
                  </Box>
                  <ChevronRightIcon />
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
                    <FormControlLabel control={<Switch defaultChecked color="rgba(51, 107, 63, 1)" size="large" />} label={undefined} />
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
                    <FormControlLabel control={<Switch defaultChecked color="rgba(51, 107, 63, 1)" size="large" />} label={undefined} />
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

                <Box className="sidebar-item" onClick={() => openDialog("Logout")}>
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
            <Grid size={6}>
              {showProfileEditForm && (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2, position: "relative" }}>
                    <Box
                      component="label"
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="profile-image-upload"
                      />
                      <Avatar
                        src={profileImage || undefined}
                        sx={{ width: 100, height: 100 }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          backgroundColor: "#336B3F",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #C9F8BA",
                          cursor: "pointer",
                        }}
                        component="label"
                        htmlFor="profile-image-upload"
                      >
                        <CameraAltIcon
                          sx={{
                            color: "#C9F8BA",
                            fontSize: 18,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <TextFieldComponent label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  <TextFieldComponent label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Box sx={{ width: "120px", flexShrink: 0 }}>
                      <Select
                        label="Code"
                        options={countryCodes}
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        fullWidth={true}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <TextFieldComponent
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                      />
                    </Box>
                  </Box>
                  <TextFieldComponent label="Current Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, }}>
                    <TextFieldComponent label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                    <Select label="State" options={indianStates} value={state} onChange={(e) => setState(e.target.value as string)} placeholder="Select State" required />
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
                  <Button type="submit" size="large" style={{ backgroundColor: "#C9F8BA", border: "none", color: "#336B3F", borderRadius: "12px", fontWeight: "bold", }}>
                    Save Changes
                  </Button>
                </Box>
              )}

              {showContactForm && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {supportView === "menu" && (
                    <>
                      <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: "bold", mb: 1 }}>
                        Please choose what types of support do you need and let us know.
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          { title: "Support Chat", subtitle: "24x7 Online Support", color: "#336B3F", icon: <ChatBubbleOutlineIcon sx={{ color: "#C9F8BA", fontSize: 30 }} />, view: "chat" },
                          { title: "Call Center", subtitle: "24x7 Customer Service", color: "#FF6B35", icon: <PhoneIcon sx={{ color: "white", fontSize: 30 }} />, view: "call" },
                          { title: "Email", subtitle: "admin@shifty.com", color: "#9B59B6", icon: <EmailIcon sx={{ color: "white", fontSize: 30 }} />, view: "chat" },
                          { title: "FAQ", subtitle: "+50 Answers", color: "#F1C40F", icon: <HelpOutlineIcon sx={{ color: "#336B3F", fontSize: 30 }} />, view: "faq" },
                        ].map((card) => (
                          <Grid key={card.title} size={6}>
                            <Box
                              onClick={() => setSupportView(card.view as any)}
                              sx={{
                                backgroundColor: "#C9F8BA",
                                borderRadius: "16px",
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.02)" },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  backgroundColor: card.color,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mb: 2,
                                }}
                              >
                                {card.icon}
                              </Box>
                              <Typography variant="h6" sx={{ color: "#336B3F", fontWeight: "bold", mb: 1 }}>
                                {card.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#336B3F", opacity: 0.7 }}>
                                {card.subtitle}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}

                  {supportView === "chat" && (
                    <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: "28px", overflow: "hidden", border:'1px solid #C9F8BA' }}>
                      <Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: "1px solid rgba(201, 248, 186, 0.2)" }}>
                        <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA", mr: 1 }}>
                          <ArrowBackIosNewOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ flexGrow: 1, color: "#C9F8BA", fontWeight: "bold" }}>Assistant</Typography>
                        <Typography sx={{ color: "rgba(201, 248, 186, 0.6)", fontSize: "0.85rem" }}>Online</Typography>
                      </Box>
                      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, minHeight: 450 }}>
                        {chatMessages?.map((message) => (
                          <Box
                            key={message.id}
                            sx={{
                              alignSelf: message.from === "user" ? "flex-end" : "flex-start",
                              backgroundColor: message.from === "user" ? "#C9F8BA" : "rgba(255,255,255,0.08)",
                              color: message.from === "user" ? "#336B3F" : "rgba(201, 248, 186, 0.8)",
                              px: 2.5,
                              py: 1.5,
                              borderRadius: "24px",
                              maxWidth: "60%",
                            }}
                          >
                            <Typography sx={{ fontSize: "0.95rem" }}>{message.text}</Typography>
                            <Typography sx={{ fontSize: "0.7rem", opacity: 0.6, mt: 0.5, textAlign: "right" }}>
                              {message.time}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ backgroundColor: "#C9F8BA", display: "flex", alignItems: "center", gap: 1.5, p: 2 }}>
                        <IconButton sx={{ color: "#336B3F" }}>
                          <ImageOutlinedIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#336B3F" }}>
                          <MicNoneOutlinedIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, backgroundColor: "rgba(51, 107, 63, 0.1)", borderRadius: "24px", display: "flex", alignItems: "center", px: 2 }}>
                          <input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Aa"
                            style={{ flexGrow: 1, border: "none", background: "transparent", outline: "none", color: "#336B3F", fontSize: "1rem" }}
                          />
                          <IconButton sx={{ color: "#336B3F" }}>
                            <EmojiEmotionsOutlinedIcon />
                          </IconButton>
                        </Box>
                        <IconButton
                          onClick={handleSendChatMessage}
                          sx={{ backgroundColor: "#336B3F", color: "#C9F8BA", "&:hover": { backgroundColor: "#285230" } }}
                        >
                          <SendRoundedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}

                  {supportView === "call" && (
                    <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: "28px", p: 4, color: "#C9F8BA" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                        <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA" }}>
                          <ArrowBackIosNewOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Call Center</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Speak directly with our specialists for instant resolution.
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                        <Button size="large" style={{ backgroundColor: "#C9F8BA", color: "#336B3F", borderRadius: "16px", fontWeight: "bold" }}>
                          Call Now
                        </Button>
                        <Button size="large" style={{ backgroundColor: "transparent", border: "1px solid rgba(201,248,186,0.4)", color: "#C9F8BA", borderRadius: "16px" }}>
                          Schedule Callback
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="body2">Hotline: +1 800 223 8899</Typography>
                        <Typography variant="body2">Support PIN: 9835</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Average wait time: less than 2 mins</Typography>
                      </Box>
                    </Box>
                  )}

                  {supportView === "faq" && (
                    <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: "28px", p: 4, color: "#C9F8BA" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                        <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA" }}>
                          <ArrowBackIosNewOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Frequently Asked Questions</Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {[
                          { q: "How do I reschedule my pickup?", a: "Go to Orders > Select order > Reschedule." },
                          { q: "Where can I track my order?", a: "Open Order History and tap on the order status card." },
                          { q: "How do I update my payment method?", a: "Navigate to Profile > Payment Method > Add card." },
                          { q: "Do you offer express service?", a: "Yes, choose Express at checkout for next-day delivery." },
                        ].map((faq) => (
                          <Box key={faq.q} sx={{ backgroundColor: "rgba(201,248,186,0.1)", borderRadius: "20px", p: 3 }}>
                            <Typography sx={{ fontWeight: "bold", mb: 1 }}>{faq.q}</Typography>
                            <Typography sx={{ opacity: 0.8 }}>{faq.a}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
              {showPaymentCardForm && (
                <Box>
                  <Card sx={{ backgroundColor: "rgba(201, 248, 186, 1)", borderRadius: "16px" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#336B3F" }}>My Cards</Typography>
                        <Button
                          onClick={() => handlePaymentMethodDialogOpen()}
                          type="button"
                          size="small"
                          style={{
                            backgroundColor: "#C9F8BA",
                            border: "1px solid #336B3F",
                            color: "#336B3F",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "6px 12px"
                          }}
                        >
                          <AddIcon sx={{ fontSize: 18 }} />
                          Add New
                        </Button>
                      </Box>
                      <Divider sx={{ my: 2, backgroundColor: "rgba(143, 146, 161, 0.1)" }} />
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {savedCards.length === 0 ? (
                          <Typography sx={{ color: "rgba(51, 107, 63, 0.7)", textAlign: "center", py: 4 }}>
                            No cards added yet. Click "Add New" to add a card.
                          </Typography>
                        ) : (
                          savedCards.map((card) => (
                            <Box
                              key={card.id}
                              sx={{
                                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7b4397 100%)",
                                borderRadius: "16px",
                                padding: "24px",
                                color: "white",
                                position: "relative",
                                minHeight: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <Box
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "50%",
                                      backgroundColor: "#EB001B",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#F79E1B",
                                        marginLeft: "-15px",
                                      }}
                                    />
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    width: 40,
                                    height: 30,
                                    backgroundColor: "#FFD700",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "80%",
                                      height: "60%",
                                      backgroundColor: "rgba(0,0,0,0.1)",
                                      borderRadius: "2px",
                                    }}
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ mt: 4 }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontSize: "20px",
                                    letterSpacing: "2px",
                                    fontFamily: "monospace",
                                    mb: 3,
                                  }}
                                >
                                  {maskCardNumber(card.cardNumber)}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                  <Box>
                                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "10px" }}>
                                      CARDHOLDER NAME
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                      {card.cardHolderName}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ textAlign: "right" }}>
                                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "10px" }}>
                                      VALID THRU
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                      {card.expiryDate}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ))
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {showLocationCard && (
                <Box>
                  <Card sx={{ backgroundColor: "rgba(201, 248, 186, 1)", borderRadius: "16px" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#336B3F" }}>My Locations</Typography>
                        <Button
                          onClick={() => setLocationDialogOpen(true)}
                          type="button"
                          size="small"
                          style={{
                            backgroundColor: "#C9F8BA",
                            border: "1px solid #336B3F",
                            color: "#336B3F",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "6px 12px"
                          }}
                        >
                          <AddIcon sx={{ fontSize: 18 }} />
                          Add New
                        </Button>
                      </Box>
                      <Divider sx={{ my: 2, backgroundColor: "rgba(143, 146, 161, 0.1)" }} />
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {savedLocations.length === 0 ? (
                          <Typography sx={{ color: "rgba(51, 107, 63, 0.7)", textAlign: "center", py: 4 }}>
                            No locations added yet. Click "Add New" to add a location.
                          </Typography>
                        ) : (
                          savedLocations.map((location) => {
                            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                              location.address
                            )}&zoom=15&size=400x150&markers=color:blue|label:H|${encodeURIComponent(location.address)}&key=${GOOGLE_MAPS_API_KEY}`;

                            return (
                              <Box
                                key={location.id}
                                sx={{
                                  backgroundColor: "rgba(51, 107, 63, 0.1)",
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  border: "1px solid rgba(51, 107, 63, 0.2)",
                                }}
                              >
                                {/* Map Preview */}
                                <Box
                                  component="img"
                                  src={mapUrl}
                                  alt={location.address}
                                  sx={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "12px",
                                    borderTopRightRadius: "12px",
                                  }}
                                />

                                {/* Address Details */}
                                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2 }}>
                                  <LocationOnIcon sx={{ color: "#336B3F", fontSize: 28, mt: 0.5 }} />
                                  <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ color: "#336B3F", fontWeight: "bold", mb: 1 }}>
                                      {location.address}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                                      <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)" }}>
                                        <strong>Zip Code:</strong> {location.zipCode}
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)" }}>
                                        <strong>State:</strong> {indianStates.find(s => s.value === location.state)?.label || location.state}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            );
                          })
                        )}
                      </Box>

                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>

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
        onClose={() => setLocationDialogOpen(false)}
        onAddLocation={handleAddLocation}
        indianStates={indianStates}
      />

      {/* Generic Dialog for other items */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialogTitle}
          <IconButton onClick={closeDialog} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>This is a dialog for {dialogTitle}.</Typography>
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default EditProfile;
