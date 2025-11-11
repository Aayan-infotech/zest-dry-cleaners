import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  // Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import TextFieldComponent from '../../components/ui/TextField';
import Button from "../../components/ui/Button";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("hannah.turin@email.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#336B3F", display: "flex", alignItems: "center", justifyContent: "center", p: 2, }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: "30px", p: { xs: 3, sm: 5 }, backgroundColor: "#C9F8BA", textAlign: "center", }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#336B3F", mb: 1, fontSize: { xs: "1.8rem", sm: "2.4rem" }, }}>
            Let’s Sign You In
          </Typography>
          <Typography sx={{ color: "rgba(51,107,63,0.7)", mb: 4, fontSize: "1.1rem", fontWeight: 400, }}>
            Welcome back, you’ve been missed!
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextFieldComponent label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            <TextFieldComponent
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#336B3F", mt: 1, }}>
              <FormControlLabel
                control={
                  <Checkbox defaultChecked sx={{ color: "#336B3F", "&.Mui-checked": { color: "#336B3F" }, }} />
                }
                label="Remember Me"
              />
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#336B3F", fontWeight: 500, }}>
                Forgot Password ?
              </Link>
            </Box>

            <Button type="submit" variant="primary" size="large" className="w-full">
              Login
            </Button>
          </Box>
        </Paper>

        <Box sx={{textAlign:'center'}}>
          <Divider sx={{ my: 3, color: "white" }}>OR</Divider>
          <Button
            variant="light"
            size="large"
            className="custom-button.full-width"
            onClick={() => console.log("Continue with Google")}
          >
            <GoogleIcon style={{ color: "#EA4335", marginRight: "8px" }} />
            Continue with Google
          </Button>

          <Typography sx={{ mt: 3, color: "rgba(223, 213, 213, 0.5))", fontSize: "0.95rem", }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "rgba(117, 221, 82, 1)", fontWeight: 600, textDecoration: "none", }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
