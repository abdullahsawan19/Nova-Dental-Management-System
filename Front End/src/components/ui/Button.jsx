import { Button as MuiButton } from "@mui/material";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
  sx,
  variant = "contained",
  color = "primary",
  ...props
}) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth
      sx={{
        py: 1.5,
        borderRadius: 2,
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "1rem",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
