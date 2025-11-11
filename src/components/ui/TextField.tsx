import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  fullWidth?: boolean;
  required?: boolean;
}

const TextFieldComponent: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  showPassword,
  toggleShowPassword,
  fullWidth = true,
  required = false,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      label={label}
      variant="outlined"
      type={type === "password" && showPassword ? "text" : type}
      value={value}
      onChange={onChange}
      InputLabelProps={{ style: { color: "#336B3F" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: "#C9F8BA",
          "& fieldset": { borderColor: "#336B3F" },
          "&:hover fieldset": { borderColor: "#336B3F" },
          "&.Mui-focused fieldset": { borderColor: "#336B3F" },
        },
        input: { color: "#336B3F" },
      }}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleShowPassword}
                    edge="end"
                    sx={{ color: "#336B3F" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default TextFieldComponent;
