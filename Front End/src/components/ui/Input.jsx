import { TextField } from "@mui/material";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className,
  children,
  ...props
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        {...props}
      >
        {children}
      </TextField>
    </div>
  );
};

export default Input;
