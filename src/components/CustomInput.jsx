import React from "react";

const CustomInput = ({
  type,
  placeholder,
  name,
  handleBlur,
  handleChange,
  error,
  value,
  required,
  disabled
}) => {
  return (
    <div>
      <input
        className="w-full border rounded-[5px] px-[12px] py-[10px] bg-transparent"
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
