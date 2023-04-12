import React from "react";
import StatusTab from "./shared/StatusTab";
import { useNavigate } from "react-router-dom";

const InvoiceList = ({ invoice }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      className="cursor-pointer mb-[20px] text-[#666EA0] grid grid-cols-11 items-center space-x-4 bg-[#ffffff] p-[20px] shadow rounded-[10px]"
    >
      <h3 className="col-span-2">#{invoice.id}</h3>
      <p className="col-span-2">{invoice.invoiceDate}</p>
      <p className="col-span-2">{invoice.clientName}</p>
      <h3 className="col-span-2 text-[18px] font-spartan">
        £{invoice.netTotal}
      </h3>
      <div className="col-span-2">
        <StatusTab invoice={invoice} />
      </div>
      <div className="flex items-center justify-end">
        <img
          src="/images/icon-arrow-right.svg"
          alt=""
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default InvoiceList;
