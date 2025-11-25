import React, { useEffect, useState } from "react";
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
import { ArrowBack } from "@mui/icons-material";

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

interface FormDataState {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  city: string;
  state: string;
  zipCode: string;
  houseNumber: string;
  streetName: string;
  area: string;
  landmark: string;
  addressType: string;
  profileImage: File | null;
  latitude: string;
  longitude: string;
}

const GettingStarted: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "us",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    zipCode: "",
    houseNumber: "",
    streetName: "",
    area: "",
    landmark: "",
    addressType: "Work",
    profileImage: null,
    latitude: "",
    longitude: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [signupStep, setSignupStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (err) => {
          console.warn("Geolocation not available:", err);
        }
      );
    }
  }, []);

  const handleChange = (field: keyof FormDataState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profileImage: e.target.files![0] }));
      if (error) setError("");
    }
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
      countryCode: country?.countryCode?.toLowerCase() || "us",
    }));
    if (error) setError("");
  };

  const handleSelectChange = (field: keyof FormDataState) => (e: { target: { value: string } }) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = (): string | null => {
    const { fullName, email, phoneNumber, password, confirmPassword, addressType } = formData;

    if (!fullName.trim()) return "Full Name is required";
    if (!email.trim()) return "Email Address is required";
    if (!validateEmail(email)) return "Please enter a valid email address";
    if (!phoneNumber.trim()) return "Phone Number is required";
    if (!addressType.trim()) return "Address Type is required";
    if (!password.trim()) return "Password is required";
    if (!confirmPassword.trim()) return "Confirm Password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    if (password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  const validateStep2 = (): string | null => {
    const { houseNumber, streetName, area, city, state, zipCode } = formData;

    if (!houseNumber.trim()) return "House Number is required";
    if (!streetName.trim()) return "Street Name is required";
    if (!area.trim()) return "Area is required";
    if (!city.trim()) return "City is required";
    if (!state.trim()) return "State is required";
    if (!zipCode.trim()) return "Zip Code is required";

    return null;
  };

  const handleNextStep = () => {
    setError("");
    const stepError = validateStep1();
    if (stepError) {
      setError(stepError);
      return;
    }
    setSignupStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const step2Error = validateStep2();
    if (step2Error) { setError(step2Error); return; }
    const step1Error = validateStep1();
    if (step1Error) { setError(step1Error); return; }
    setLoading(true);
    try {
      let nationalPhoneNumber = formData.phoneNumber;
      try {
        if (formData.phoneNumber) {
          const phoneWithPlus = formData.phoneNumber.startsWith("+") ? formData.phoneNumber : `+${formData.phoneNumber}`;
          const parsed = parsePhoneNumber(phoneWithPlus);
          if (parsed) {
            nationalPhoneNumber = parsed.nationalNumber;
          }
        }
      } catch (err) {
        setError("Please enter a valid phone number");
        setLoading(false);
        return;
      }
      // const submitFormData = new FormData();
      // submitFormData.append("fullName", formData.fullName);
      // submitFormData.append("email", formData.email);
      // submitFormData.append("phoneNumber", nationalPhoneNumber);
      // submitFormData.append("password", formData.password);
      // submitFormData.append("city", formData.city);
      // submitFormData.append("state", formData.state);
      // submitFormData.append("zipCode", formData.zipCode);
      // submitFormData.append("houseNumber", formData.houseNumber);
      // submitFormData.append("streetName", formData.streetName);
      // submitFormData.append("area", formData.area);
      // submitFormData.append("landmark", formData.landmark);
      // submitFormData.append("addressType", formData.addressType);
      // if (formData.profileImage) {
      //   submitFormData.append("profileImage", formData.profileImage);
      // }
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     const { latitude, longitude } = position.coords;
      //     submitFormData.append("latitude", latitude.toString());
      //     submitFormData.append("longitude", longitude.toString());
      //   },
      //   (err) => console.error(err)
      // );
      const submitFormData = new FormData();
      Object.entries({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: nationalPhoneNumber,
        password: formData.password,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        houseNumber: formData.houseNumber,
        streetName: formData.streetName,
        area: formData.area,
        landmark: formData.landmark,
        addressType: formData.addressType,
        latitude: formData.latitude,
        longitude: formData.longitude,
      }).forEach(([key, value]) => submitFormData.append(key, value as string));

      if (formData.profileImage) submitFormData.append("profileImage", formData.profileImage);
      await signup(submitFormData);
      setSuccess(true);
      // Redirect to OTP verification with phone number
      setTimeout(() => {
        navigate("/otp-verification", {
          state: {
            phoneNumber: nationalPhoneNumber,
            fromSignup: true,
          },
        });
      }, 1500);
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

            {signupStep === 1 && (
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent label="Full Name" value={formData.fullName} onChange={handleChange("fullName")} required />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange("email")}
                    type="email"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ textAlign: "start" }}>
                    <PhoneInput
                      country={formData.countryCode}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: "100%",
                        height: "56px",
                        borderRadius: "14px",
                        border: "2.5px solid #336B3F",
                        fontSize: "1rem",
                        color: "#336B3F",
                        backgroundColor: "transparent",
                        paddingLeft: "48px",
                      }}
                      buttonStyle={{
                        border: "none",
                        background: "transparent",
                        borderRight: "2.5px solid #336B3F",
                        borderRadius: "14px 0 0 14px",
                      }}
                      dropdownStyle={{
                        borderRadius: "10px",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "start" }}>
                  <Select
                    label="Address Type"
                    options={addressTypes}
                    value={formData.addressType}
                    onChange={handleSelectChange("addressType")}
                    placeholder="Select Address Type"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    type="password"
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    type="password"
                    showPassword={showConfirmPassword}
                    toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button onClick={handleNextStep} type="button" variant="primary" size="large" className="w-full" style={{ width: "100%" }}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            )}
            {signupStep === 2 && (
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", cursor: "pointer", alignItems: "center", color: "#336B3F", fontWeight: 600 }} onClick={() => setSignupStep(1)}>
                    <ArrowBack sx={{ mr: 0.5 }} />
                    <Typography>Back</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography sx={{ color: "#336B3F", fontWeight: 600, textAlign: "left" }}>Address Details</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="House Number"
                    value={formData.houseNumber}
                    onChange={handleChange("houseNumber")}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Street Name"
                    value={formData.streetName}
                    onChange={handleChange("streetName")}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Area"
                    value={formData.area}
                    onChange={handleChange("area")}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Landmark"
                    value={formData.landmark}
                    onChange={handleChange("landmark")}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="City"
                    value={formData.city}
                    onChange={handleChange("city")}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "start" }}>
                  <Select
                    label="State"
                    options={indianStates}
                    value={formData.state}
                    onChange={handleSelectChange("state")}
                    placeholder="Select State"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldComponent
                    label="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange("zipCode")}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "2px solid #29753aff",
                        borderRadius: "10px",
                        color: "#336B3F",
                      }}
                    />
                  </Box>
                </Grid>
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
            )}

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
