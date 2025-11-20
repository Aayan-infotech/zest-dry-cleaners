import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data, tokens, etc.
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    
    // Navigate to home or sign in page
    navigate('/signin');
    
    // Close dialog
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
          borderRadius: { xs: "20px", sm: "24px", md: "28px" },
          margin: { xs: 1, sm: 2 },
        }
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" }, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5, md: 3 } }}>
        Logout
        <IconButton onClick={onClose} sx={{ position: "absolute", right: { xs: 4, sm: 8 }, top: { xs: 4, sm: 8 }, color: "#336B3F", }}>
          <CloseIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              width: { xs: 60, sm: 70, md: 80 },
              height: { xs: 60, sm: 70, md: 80 },
              borderRadius: "50%",
              backgroundColor: "rgba(51, 107, 63, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <LogoutIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: "#336B3F" }} />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#336B3F", 
              fontWeight: 600,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              textAlign: "center",
              mb: 1
            }}
          >
            Are you sure you want to logout?
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "rgba(51, 107, 63, 0.7)", 
              fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" },
              textAlign: "center",
              px: { xs: 1, sm: 0 }
            }}
          >
            You will need to sign in again to access your account.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, gap: { xs: 1.5, sm: 2 }, flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ width: { xs: "100%", sm: "auto" }, flex: { xs: 1, sm: 0 } }}>
          <Button
            onClick={onClose}
            variant="outline"
            size="large"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #336B3F",
              color: "#336B3F",
              borderRadius: "12px",
              fontWeight: "bold",
              width: "100%"
            }}
          >
            Cancel
          </Button>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "auto" }, flex: { xs: 1, sm: 0 } }}>
          <Button
            onClick={handleLogout}
            variant="primary"
            size="large"
            style={{
              backgroundColor: "#336B3F",
              color: "white",
              borderRadius: "12px",
              fontWeight: "bold",
              width: "100%"
            }}
          >
            Logout
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;

