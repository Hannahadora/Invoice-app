import React from "react";
import { useSelector } from "react-redux";

const StatusTab = ({ invoice }) => {
  const theme = useSelector((state) => state.theme.theme)
  return (
    <div>
      <div
        className={`flex items-center justify-center text-center px-[8px] py-[5px] rounded font-sans ${
          invoice.statusText === "Paid" && "text-[#08d62a] bg-[#0adb2d13]"
        } ${invoice.statusText === "Pending" && "text-[#ff5e00] bg-[#fabc6021]"} ${
          invoice.statusText === "Draft" && `${theme === 'light' ? "text-black bg-gray-200" : "text-[#fff] bg-[#fabc6021]"}`
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-[10px] ${
            invoice.statusText === "Paid" && "bg-[#08d62a]"
          } ${invoice.statusText === "Pending" && "bg-[#ff5e00]"} ${
            invoice.statusText === "Draft" && `${theme === 'light' ? "bg-black" : "bg-[#fff]"}`
          }`}
        ></span>
        <p>{invoice.statusText}</p>
      </div>
    </div>
  );
};

export default StatusTab;
