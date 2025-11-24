import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import TextFieldComponent from '../../components/ui/TextField';
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { login } from "../../utils/auth";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password, role);
      
      // Navigate based on role from API response (role is at top level, not in user object)
      if (response.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#336B3F", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 1, sm: 2 }, }}>
      <Container maxWidth="sm" sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
        <Paper elevation={0} sx={{ borderRadius: { xs: "20px", sm: "30px" }, p: { xs: 2.5, sm: 4, md: 5 }, backgroundColor: "#C9F8BA", textAlign: "center", }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#336B3F", mb: 1, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" }, }}>
            Let's Sign You In
          </Typography>
          <Typography sx={{ color: "rgba(51,107,63,0.7)", mb: { xs: 3, sm: 4 }, fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" }, fontWeight: 400, }}>
            Welcome back, you've been missed!
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}

            {/* Role Selection - Styled like Address Radio Buttons */}
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Box
                  onClick={() => setRole("user")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(201, 248, 186, 1)",
                    borderRadius: 2,
                    p: 1.5,
                    cursor: "pointer",
                    border: role === "user" ? "2px solid #336B3F" : "2px solid transparent",
                  }}
                >
                  {/* Radio button indicator */}
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "2px solid #336B3F",
                      backgroundColor: role === "user" ? "#336B3F" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1.5,
                    }}
                  >
                    {role === "user" && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ color: "#336B3F", fontWeight: 500 }}>
                    User
                  </Typography>
                </Box>

                <Box
                  onClick={() => setRole("employee")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(201, 248, 186, 1)",
                    borderRadius: 2,
                    p: 1.5,
                    cursor: "pointer",
                    border: role === "employee" ? "2px solid #336B3F" : "2px solid transparent",
                  }}
                >
                  {/* Radio button indicator */}
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "2px solid #336B3F",
                      backgroundColor: role === "employee" ? "#336B3F" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1.5,
                    }}
                  >
                    {role === "employee" && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ color: "#336B3F", fontWeight: 500 }}>
                    Employee
                  </Typography>
                </Box>
              </Box>
            </Box>


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
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1, sm: 0 },
              color: "#336B3F",
              mt: { xs: 0, sm: 1 },
            }}>
              <FormControlLabel
                control={
                  <Checkbox defaultChecked sx={{ color: "#336B3F", "&.Mui-checked": { color: "#336B3F" }, }} />
                }
                label={<Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>Remember Me</Typography>}
              />
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#336B3F", fontWeight: 500, fontSize: "0.875rem" }}>
                Forgot Password ?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              style={{ 
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={20} color="#fff" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 0 } }}>
          <Divider sx={{ my: { xs: 2, sm: 3 }, color: "white", "&::before, &::after": { borderColor: "rgba(255,255,255,0.3)" } }}>OR</Divider>
          <Button
            variant="light"
            size="large"
            className="w-full"
            style={{ width: "100%" }}
            onClick={() => console.log("Continue with Google")}
          >
            <GoogleIcon style={{ color: "#EA4335", marginRight: "8px" }} />
            Continue with Google
          </Button>
          <Typography sx={{ mt: { xs: 1.5, sm: 2 }, color: "#d5cdcd", fontSize: { xs: "0.875rem", sm: "0.95rem" }, }}>
            Don't have an account?{" "}
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
