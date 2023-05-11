import React, { useEffect, useRef } from "react";
import StatusTab from "./shared/StatusTab";
import { useNavigate } from "react-router-dom";
import { easeIn } from "../utils/GsapAnimations";
import { useSelector } from "react-redux";

const InvoiceList = ({ invoice }) => {
  const navigate = useNavigate();
  const listRef = useRef();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    easeIn(listRef);
  }, []);

  return (
    <div
      ref={listRef}
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      className={`cursor-pointer mb-[16px] ${
        theme === "light"
          ? "text-[#666EA0]  bg-[#ffffff]"
          : "text-[#eff1ff] bg-[#1e2139]"
      } grid lg:grid-cols-11 grid-cols-2 items-center justify-between lg:space-x-4 space-x-0 lg:space-y-0 space-y-4 p-[18px] shadow rounded-[10px]`}
    >
      <h3 className="lg:col-span-2">#{invoice.id}</h3>
      <p className="lg:col-span-2 lg:text-center text-right">Due {invoice.invoiceDate}</p>
      <p className="lg:col-span-2">{invoice.clientName}</p>
      <h3 className="lg:order-4 order-5 lg:col-span-2 text-[18px] font-spartan">
        £{invoice.netTotal}
      </h3>
      <div className="lg:order-5 order-4 lg:col-span-2 lg:block flex items-center justify-end">
        <StatusTab invoice={invoice} />
      </div>
      <div className="lg:order-6 lg:flex hidden items-center justify-end">
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
