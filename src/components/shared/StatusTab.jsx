import React from "react";

const StatusTab = ({ invoice }) => {
  return (
    <div>
      <div
        className={`flex items-center justify-center text-center px-[8px] py-[5px] rounded font-sans ${
          invoice.statusText === "Paid" && "text-green-500 bg-green-100"
        } ${invoice.statusText === "Pending" && "text-red-500 bg-red-100"} ${
          invoice.statusText === "Draft" && "text-black bg-gray-100"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-[10px] ${
            invoice.statusText === "Paid" && "bg-green-500"
          } ${invoice.statusText === "Pending" && "bg-red-500"} ${
            invoice.statusText === "Draft" && "bg-black"
          }`}
        ></span>
        <p>{invoice.statusText}</p>
      </div>
    </div>
  );
};

export default StatusTab;
