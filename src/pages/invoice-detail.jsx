import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateInvoice from "../components/CreateInvoice";
import StatusTab from "../components/shared/StatusTab";
import {
  deleteInvoice,
  markInvoiceAsPaid,
  selectInvoice,
} from "../redux/invoices";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { zoomOut } from "../utils/GsapAnimations";
import GoBack from "../components/shared/GoBack";

const InvoiceDetails = () => {
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalBtnRef = useRef();
  const cardRef = useRef();
  const theme = useSelector((state) => state.theme.theme);

  const invoice = useSelector((state) => state.invoices.selectedInvoice);

  const removeInvoice = () => {
    dispatch(deleteInvoice({ id: id }));
    navigate("/");
  };

  const markAsPaid = () => {
    dispatch(markInvoiceAsPaid({ id: id, status: "Paid" }));
  };

  useEffect(() => {
    dispatch(
      selectInvoice({
        id: id,
      })
    );
  }, [id?.toString()]);

  useEffect(() => {
    zoomOut(cardRef);
  }, []);

  return (
    <div>
      {invoice && (
        <>
          <div className="details-page" ref={cardRef}>
            <GoBack />
            <div className="relative">
            <div
              className={`flex items-center justify-between ${
                theme === "light" ? "bg-[#ffffff]" : "bg-[#1e2139] text-[#fff]"
              } rounded lg:p-4 p-3`}
            >
              <div className="lg:w-auto w-full flex items-center justify-between space-x-6">
                <p>Status</p>
                <StatusTab invoice={invoice} />
              </div>
              <div className="lg:w-auto w-full lg:px-0 px-[20px] flex lg:relative absolute lg:py-0 py-[24px] left-0 bottom-[0px] items-center justify-between space-x-6">
                <button
                  ref={modalBtnRef}
                  onClick={() => setAddInvoiceModal(true)}
                  className="btn sec_btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeInvoice()}
                  className="btn danger_btn"
                >
                  Delete
                </button>
                {invoice.showMarkBtn && (
                  <button onClick={() => markAsPaid()} className="btn pry_btn">
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>

            <div
              className={`lg:mt-8 mt-4 rounded ${
                theme === "light" ? "bg-[#ffffff]" : "bg-[#1e2139]"
              }  lg:p-6 p-4`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[20px]">{invoice.id}</h2>
                  <p className="text-gray-500">{invoice.description}</p>
                </div>
                <div className="text-right text-gray-500">
                  <p>{invoice.streetAddress}</p>
                  <p>{invoice.city}</p>
                  <p>{invoice.postCode}</p>
                  <p>{invoice.country}</p>
                </div>
              </div>

              <div className="mt-[40px] grid lg:grid-cols-3 grid-cols-2 items-start justify-between lg:space-x-6 space-x-0">
                <div>
                  <div>
                    <p className="lg:text-[20px] text-[14px]">Invoice Date</p>
                    <h2 className="lg:text-[20px] text-[16px]">{invoice.invoiceDate}</h2>
                  </div>
                  <div className="mt-8">
                    <p className="lg:text-[20px] text-[14px]">Payment Due</p>
                    <h2 className="lg:text-[20px] text-[16px]">{invoice.paymentTerms}</h2>
                  </div>
                </div>
                <div>
                  <p className="lg:text-[20px] text-[14px]">Bill To:</p>
                  <h2 className="lg:text-[20px] text-[16px]">{invoice.clientName}</h2>
                  <p className="text-gray-500">{invoice.clientStreetAddress}</p>
                  <p className="text-gray-500">{invoice.clientCity}</p>
                  <p className="text-gray-500">{invoice.clientPostCode}</p>
                  <p className="text-gray-500">{invoice.clientCountry}</p>
                </div>
                <div>
                  <p className="lg:text-[20px] text-[14px]">Sent To:</p>
                  <h2 className="lg:text-[20px] text-[16px]">{invoice.clientEmail}</h2>
                </div>
              </div>

              <div className="mt-[40px]">
                <div
                  className={`p-4 w-full ${
                    theme === "light" ? "bg-gray-100" : "bg-[#252945]"
                  } rounded-t-[10px]"`}
                >
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="lg:text-[18px] text-[14px] font-bold py-3">
                          Item Name
                        </th>
                        <th className="lg:text-[18px] text-[14px] font-bold py-3">Qty</th>
                        <th className="lg:text-[18px] text-[14px] font-bold py-3">Price</th>
                        <th className="lg:text-[18px] text-[14px] font-bold py-3 text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.addItems?.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3">{item.itemname}</td>
                          <td className="py-3">{item.quantity}</td>
                          <td className="py-3">{item.price}</td>
                          <td className="py-3 text-right">
                            {item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`${
                    theme === "light" ? "bg-[#1e2139]" : "bg-[#010311]"
                  } rounded-b-[10px] px-4 py-8 flex items-center justify-between mb-[70px]`}
                >
                  <h1 className="lg:text-[30px] text-[16px] text-[#ffffff]">Amount Due</h1>
                  <h1 className="lg:text-[30px] text-[20px] font-spartan text-[#ffffff]">
                    £{invoice.netTotal?.toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          </div>

          <>
            {addInvoiceModal && (
              <CreateInvoice
                invoice={invoice}
                setAddInvoiceModal={() => setAddInvoiceModal(false)}
                btnRef={modalBtnRef}
                isOpen={addInvoiceModal}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};

export default InvoiceDetails;
