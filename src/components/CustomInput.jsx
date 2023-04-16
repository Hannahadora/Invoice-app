import React from "react";
import { useSelector } from "react-redux";

const CustomInput = ({
  type,
  placeholder,
  name,
  handleBlur,
  handleChange,
  error,
  value,
  required,
  disabled,
}) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div>
      <input
        className={`w-full rounded-[5px] px-[12px] py-[10px] ${theme === 'light' ? "bg-transparent border" : "bg-[#1e2139] border-none"}`}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        required={required}
      />
      <div className="text-red-500 text-xs italic">{error}</div>
    </div>
  );
};

export default CustomInput;
