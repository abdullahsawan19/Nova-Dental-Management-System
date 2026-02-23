import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  sx,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <TextField
      fullWidth
      label={label}
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                sx={{ color: "text.secondary" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: "background.default",
          borderRadius: 2,
        },
        "& .MuiInputLabel-root": {
          color: "text.secondary",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default Input;
