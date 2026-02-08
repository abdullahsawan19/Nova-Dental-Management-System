import { TextField } from "@mui/material";
const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className,
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
      />
    </div>
  );
};

export default Input;
