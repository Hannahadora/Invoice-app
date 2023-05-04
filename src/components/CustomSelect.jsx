import React from "react";
import { useSelector } from "react-redux";

const CustomSelect = ({
  type,
  placeholder,
  handleChange,
  error,
  value,
  required,
  disabled,
  options
}) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div>
      <select
        className={`w-full rounded-[5px] px-[12px] py-[10px] ${
          theme === "light"
            ? "bg-transparent border"
            : "bg-[#1e2139] border-none"
        }`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
      >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.name}
        </option>
      ))}
      </select>
      <div className="text-red-500 text-xs italic">{error}</div>
    </div>
  );
};

export default CustomSelect;
