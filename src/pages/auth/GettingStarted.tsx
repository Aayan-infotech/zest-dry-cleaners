import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import TextFieldComponent from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../utils/auth";

const indianStates = [
  { value: "NY", label: "New York" },
  { value: "CA", label: "California" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
  { value: "IL", label: "Illinois" },
  { value: "PA", label: "Pennsylvania" },
];

const addressTypes = [
  { value: "Home", label: "Home" },
  { value: "Work", label: "Work" },
  { value: "Other", label: "Other" },
];

const GettingStarted: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("us");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("Work");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Extract national number (without country code) from phone number
      let nationalPhoneNumber = phoneNumber;
      try {
        if (phoneNumber) {
          // PhoneInput returns number with country code but without + prefix
          // Add + prefix for parsePhoneNumber to work correctly
          const phoneWithPlus = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
          const parsed = parsePhoneNumber(phoneWithPlus);
          if (parsed) {
            nationalPhoneNumber = parsed.nationalNumber;
          }
        }
      } catch (err) {
        // If parsing fails, the phone number might be invalid
        // Set error and return early
        setError("Please enter a valid phone number");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phoneNumber", nationalPhoneNumber);
      formData.append("password", password);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipCode", zipCode);
      formData.append("houseNumber", houseNumber);
      formData.append("streetName", streetName);
      formData.append("area", area);
      formData.append("landmark", landmark);
      formData.append("addressType", addressType);
      
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await signup(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#336B3F", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 1, sm: 2 }, }}>
      <Container maxWidth="md" sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
        <Paper elevation={0} sx={{ borderRadius: { xs: "20px", sm: "30px" }, p: { xs: 2.5, sm: 4, md: 5 }, backgroundColor: "#C9F8BA", textAlign: "center", }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#336B3F", mb: 1, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" }, }}>
            Getting Started
          </Typography>
          <Typography sx={{ color: "rgba(51,107,63,0.7)", mb: { xs: 3, sm: 4 }, fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" }, fontWeight: 400, }}>
            Seems you are new here, Let's set up your profile.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Account created successfully! Redirecting to login...
              </Alert>
            )}

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Row 1: Full Name | Email Address */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </Grid>

              {/* Row 2: Phone Number */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{textAlign: "start"}}>
                  <PhoneInput
                    country={countryCode}
                    value={phoneNumber}
                    onChange={(value, country) => {
                      setPhoneNumber(value);
                      if (country && 'countryCode' in country) {
                        setCountryCode(country.countryCode.toLowerCase());
                      }
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '56px',
                      borderRadius: '14px',
                      border: '2.5px solid #336B3F',
                      fontSize: '1rem',
                      color: '#336B3F',
                      backgroundColor: 'transparent',
                      paddingLeft: '48px',
                    }}
                    buttonStyle={{
                      border: 'none',
                      background: 'transparent',
                      borderRight: '2.5px solid #336B3F',
                      borderRadius: '14px 0 0 14px',
                    }}
                    dropdownStyle={{
                      borderRadius: '10px',
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {/* Empty space for alignment */}
              </Grid>
            
              {/* Row 3: Address Details Header */}
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: "#336B3F", fontWeight: 600, textAlign: "left" }}>Address Details</Typography>
              </Grid>
            
              {/* Row 4: House Number | Street Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="House Number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
              </Grid>
            
              {/* Row 5: Area | Landmark */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
              </Grid>
            
              {/* Row 6: City | State */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} sx={{textAlign: "start"}}>
                <Select label="State" options={indianStates} value={state} onChange={(e) => setState(e.target.value)} placeholder="Select State" required />
              </Grid>
            
              {/* Row 7: Zip Code | Address Type */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} sx={{textAlign: "start"}}>
                <Select label="Address Type" options={addressTypes} value={addressType} onChange={(e) => setAddressType(e.target.value)} placeholder="Select Address Type" required />
              </Grid>
            
              {/* Row 8: Profile Image (Full Width) */}
              <Grid size={{ xs: 12 }}>
                <Box>
                  <Typography sx={{ color: "#336B3F", mb: 1, fontSize: "0.9rem", textAlign: "left" }}>Profile Image (Optional)</Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfileImage(e.target.files[0]);
                      }
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #336B3F",
                      borderRadius: "4px",
                      color: "#336B3F",
                    }}
                  />
                </Box>
              </Grid>
            
              {/* Row 10: Password | Confirm Password */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword(!showPassword)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextFieldComponent
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                />
              </Grid>
            
              {/* Row 11: Terms Checkbox (Full Width) */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", color: "#336B3F", mt: { xs: 0, sm: 1 }, }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: "#336B3F",
                          "&.Mui-checked": { color: "#336B3F" },
                        }}
                      />
                    }
                    label={<Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" }, textAlign: "left" }}>By creating an account, you agree to our Terms and Conditions</Typography>}
                  />
                </Box>
              </Grid>

              {/* Row 12: Submit Button (Full Width) */}
              <Grid size={{ xs: 12 }}>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="large" 
                  className="w-full" 
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </Box>

        </Paper>
        <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 0 } }}>
          <Typography sx={{ mt: { xs: 1.5, sm: 2 }, color: "#d5cdcd", fontSize: { xs: "0.875rem", sm: "0.95rem" }, }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "rgba(117, 221, 82, 1)", fontWeight: 600, textDecoration: "none", }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GettingStarted;
