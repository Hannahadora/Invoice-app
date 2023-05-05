import React, { useState } from "react";
import { useSelector } from "react-redux";

const CustomSelect = ({
  placeholder,
  error,
  handleSelected,
  required,
  disabled,
  options,
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const [selectedValue, setSelectedValue] = useState(""); // Add state for selected value

  function handleChange(event) {
    setSelectedValue(event.target.value); // Update state with new selected value
    handleSelected(event.target.value);
  }

  return (
    <div>
      <select
        className={`w-full rounded-[5px] px-[12px] py-[12px] ${
          theme === "light"
            ? "bg-transparent border"
            : "bg-[#1e2139] border-none"
        }`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={selectedValue} // Set the value to the selectedValue state
        required={required}
      >
        <option value={""}>
          -- Select --
        </option>
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
