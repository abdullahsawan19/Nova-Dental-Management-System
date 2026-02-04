const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default Input;
