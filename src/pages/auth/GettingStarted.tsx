import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Alert,
} from "@mui/material";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [longitude, setLongitude] = useState("-74.0060");
  const [latitude, setLatitude] = useState("40.7128");
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
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipCode", zipCode);
      formData.append("houseNumber", houseNumber);
      formData.append("streetName", streetName);
      formData.append("area", area);
      formData.append("landmark", landmark);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
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
      <Container maxWidth="sm" sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
        <Paper elevation={0} sx={{ borderRadius: { xs: "20px", sm: "30px" }, p: { xs: 2.5, sm: 4, md: 5 }, backgroundColor: "#C9F8BA", textAlign: "center", }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#336B3F", mb: 1, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" }, }}>
            Getting Started
          </Typography>

          <Typography sx={{ color: "rgba(51,107,63,0.7)", mb: { xs: 3, sm: 4 }, fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" }, fontWeight: 400, }}>
            Seems you are new here, Let's set up your profile.
          </Typography>

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 1 }}>
                Account created successfully! Redirecting to login...
              </Alert>
            )}

            <TextFieldComponent label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <TextFieldComponent label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            <TextFieldComponent label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" required />
            
            <Typography sx={{ color: "#336B3F", fontWeight: 600, mt: 1 }}>Address Details</Typography>
            
            <TextFieldComponent label="House Number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
            <TextFieldComponent label="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
            <TextFieldComponent label="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
            <TextFieldComponent label="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
            }}>
              <TextFieldComponent label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              <Select label="State" options={indianStates} value={state} onChange={(e) => setState(e.target.value)} placeholder="Select State" required />
              <TextFieldComponent label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
            </Box>
            
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
            }}>
              <TextFieldComponent label="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} type="number" />
              <TextFieldComponent label="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} type="number" />
            </Box>
            
            <Select label="Address Type" options={addressTypes} value={addressType} onChange={(e) => setAddressType(e.target.value)} placeholder="Select Address Type" required />
            
            <Box>
              <Typography sx={{ color: "#336B3F", mb: 1, fontSize: "0.9rem" }}>Profile Image (Optional)</Typography>
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
            <TextFieldComponent
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              required
            />

            <TextFieldComponent
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              showPassword={showConfirmPassword}
              toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />
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
