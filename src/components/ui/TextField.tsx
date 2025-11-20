import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "tel";
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  borderColor?: string;
  labelColor?: string;
  textColor?: string;
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
  placeholder,
  borderColor = "#C9F8BA",
  labelColor = "#C9F8BA",
  textColor = "#C9F8BA",
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
      placeholder={placeholder}
      InputLabelProps={{ style: { color: labelColor } }}
      sx={{
        "& .MuiInputLabel-root": {
          color: `${labelColor} !important`,
          "&.Mui-focused": {
            color: `${labelColor} !important`,
          },
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: "transparent !important",
          background: "none !important",
          "& fieldset": { borderColor: borderColor, borderWidth: "2px" },
          "&:hover fieldset": { borderColor: borderColor, borderWidth: "2px" },
          "&.Mui-focused fieldset": { borderColor: borderColor, borderWidth: "2px" },
          "&:hover": {
            backgroundColor: "transparent !important",
            background: "none !important",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent !important",
            background: "none !important",
          },
        },
        "& .MuiOutlinedInput-input": {
          backgroundColor: "transparent !important",
          background: "none !important",
        },
        input: { 
          color: textColor,
          backgroundColor: "transparent !important",
          background: "none !important",
        },
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
