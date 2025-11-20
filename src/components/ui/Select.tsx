import React from "react";
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@mui/material";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  fullWidth?: boolean;
  variant?: 'light' | 'dark' | 'dialog';
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  name,
  required = false,
  fullWidth = true,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  
  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={Boolean(error)}
      sx={{
        "& .MuiInputLabel-root": {
          color: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
          "&.Mui-focused": {
            color: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
          },
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: "transparent !important",
          background: "none !important",
          "& fieldset": { 
            borderColor: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
            borderWidth: "2px",
          },
          "&:hover fieldset": { 
            borderColor: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
            borderWidth: "2px",
          },
          "&.Mui-focused fieldset": { 
            borderColor: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
            borderWidth: "2px",
          },
        },
        "& .MuiSelect-select": {
          color: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
          backgroundColor: "transparent !important",
        },
        "& .MuiSvgIcon-root": {
          color: isDark ? "rgba(250, 199, 199, 1)" : variant === 'dialog' ? "#336B3F" : "#C9F8BA",
        },
      }}
    >
      {label && <InputLabel>{label}</InputLabel>}

      <MuiSelect
        label={label}
        value={value || ""}
        name={name}
        onChange={onChange as any}
        disabled={disabled}
      >
        {placeholder && (
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>

      {error && (
        <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </FormControl>
  );
};

export default Select;
