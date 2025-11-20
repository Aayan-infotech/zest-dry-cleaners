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
  Checkbox,
  FormGroup,
  Switch,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
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
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

import DashboardNavbar from "../components/DashboardNavbar";
import TextFieldComponent from "../components/ui/TextField";
import { Button, Select } from "../components/ui";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import PaymentMethodDialog from "../components/dialogs/PaymentMethodDialog";
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
        // Get the national number length from example
        const exampleLength = parsed.nationalNumber.length;
        // Add some buffer (usually phone numbers can be 1-2 digits longer)
        return exampleLength + 2;
      }
    }
  } catch (error) {
    // If we can't determine, return a default based on common patterns
    console.warn(`Could not determine max length for ${countryCode}, using default`);
  }
  // Default max length (most countries are between 7-15 digits)
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
  // Contact form state variables
  const [contactSubject, setContactSubject] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
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
  };

  const handleShowPaymentCard = () => {
    setShowPaymentCardForm(true);
    setShowProfileEditForm(false);
    setShowContactForm(false);
  };

  const handlePaymentMethodDialogOpen = () => {
    setPaymentMethodDialogOpen(true);
    setShowProfileEditForm(false);
    setShowContactForm(false);
    setShowPaymentCardForm(false);
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
                <Box className="sidebar-item" onClick={() => openDialog("Locations")}>
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
                <Box component="form" onSubmit={(e) => {
                  e.preventDefault();
                  console.log({ contactSubject, contactEmail, contactMessage });
                }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Typography variant="h5" sx={{ color: "#C9F8BA", fontWeight: "bold", mb: 2 }}>
                    Contact Us
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(201, 248, 186, 0.7)", mb: 3 }}>
                    Get help with your account or report an issue
                  </Typography>
                  <TextFieldComponent
                    label="Subject"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    required
                  />
                  <TextFieldComponent
                    label="Email Address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <TextFieldComponent
                    label="Message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    fullWidth
                  />
                  <Button
                    type="submit"
                    size="large"
                    style={{
                      backgroundColor: "#C9F8BA",
                      border: "none",
                      color: "#336B3F",
                      borderRadius: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              )}
              {showPaymentCardForm && (
                <Box>
                  <Card sx={{ backgroundColor: "rgba(201, 248, 186, 1)" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2">My Card</Typography>
                        <Button
                          onClick={() => handlePaymentMethodDialogOpen()}
                          type="submit"
                          size="small"
                          style={{
                            backgroundColor: "rgba(143, 146, 161, 0.1)",
                            border: "none",
                            color: "#336B3F",
                            borderRadius: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          Add Card
                        </Button>
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
