import { TextField, Box } from "@mui/material";

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
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
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
