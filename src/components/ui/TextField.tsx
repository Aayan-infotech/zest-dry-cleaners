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
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
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
  borderColor = "#336B3F",
  labelColor = "#336B3F",
  textColor = "#336B3F",
  error,
  inputRef,
  disabled = false,
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
      error={!!error}
      helperText={error}
      inputRef={inputRef}
      disabled={disabled}
      InputLabelProps={{ style: { color: labelColor } }}
      sx={{
        "& .MuiInputLabel-root": {
          color: `${labelColor} !important`,
          fontSize: { xs: "0.875rem", sm: "1rem" },
          "&.Mui-focused": {
            color: `${labelColor} !important`,
          },
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: "transparent !important",
          background: "none !important",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          "& fieldset": { 
            borderColor: error ? `#d32f2f !important` : `${borderColor} !important`, 
            borderWidth: "2.5px !important",
            borderStyle: "solid !important",
          },
          "&:hover fieldset": { 
            borderColor: error ? `#d32f2f !important` : `${borderColor} !important`, 
            borderWidth: "2.5px !important",
            borderStyle: "solid !important",
          },
          "&.Mui-focused fieldset": { 
            borderColor: error ? `#d32f2f !important` : `${borderColor} !important`, 
            borderWidth: "3px !important",
            borderStyle: "solid !important",
          },
          "&.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
          },
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
          padding: { xs: "12px 14px", sm: "14px 16px" },
        },
        input: { 
          color: textColor,
          backgroundColor: "transparent !important",
          background: "none !important",
        },
        "& .MuiFormHelperText-root": {
          color: "#d32f2f",
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          marginLeft: 0,
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
