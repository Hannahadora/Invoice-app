import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateInvoice from "../components/CreateInvoice";
import StatusTab from "../components/shared/StatusTab";
import { deleteInvoice, selectInvoice } from "../redux/invoices";
import { useNavigate } from "react-router-dom";

const InvoiceDetails = () => {
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const invoice = useSelector((state) => state.invoices.selectedInvoice);

  const removeInvoice = () => {
    dispatch(deleteInvoice({ id: id }));
    navigate("/");
  };

  useEffect(() => {
    dispatch(
      selectInvoice({
        id: id,
      })
    );
  }, [id?.toString()]);

  return (
    <div>
      {invoice && (
        <>
          <div className="mb-8 flex items-center space-x-6">
            <img src="/images/icon-arrow-left.svg" alt="" />
            <p>Go Back</p>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] rounded p-4">
            <div className="flex items-center justify-between space-x-6">
              <p>Status</p>
              <StatusTab invoice={invoice} />
            </div>
            <div className="flex items-center justify-between space-x-6">
              <button
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
                <button className="btn pry_btn">Mark as Paid</button>
              )}
            </div>
          </div>

          <div className="mt-8 rounded bg-[#ffffff] p-6">
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

            <div className="mt-[40px] flex items-start justify-between space-x-6">
              <div>
                <div>
                  <p className="text-[20px]">Invoice Date</p>
                  <h2 className="text-[20px]">{invoice.invoiceDate}</h2>
                </div>
                <div className="mt-8">
                  <p className="text-[20px]">Payment Due</p>
                  <h2 className="text-[20px]">{invoice.paymentTerms}</h2>
                </div>
              </div>
              <div>
                <p className="text-[20px]">Bill To:</p>
                <h2 className="text-[20px]">{invoice.clientName}</h2>
                <p className="text-gray-500">{invoice.clientStreetAddress}</p>
                <p className="text-gray-500">{invoice.clientCity}</p>
                <p className="text-gray-500">{invoice.clientPostCode}</p>
                <p className="text-gray-500">{invoice.clientCountry}</p>
              </div>
              <div>
                <p className="text-[20px]">Sent To:</p>
                <h2 className="text-[20px]">{invoice.clientEmail}</h2>
              </div>
            </div>

            <div className="mt-[40px]">
              <div className="p-4 w-full bg-gray-100 rounded-t-[10px]">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="text-[18px] font-bold py-3">Item Name</th>
                      <th className="text-[18px] font-bold py-3">Qty</th>
                      <th className="text-[18px] font-bold py-3">Price</th>
                      <th className="text-[18px] font-bold py-3 text-right">
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
              <div className="bg-[#1e2139] rounded-b-[10px] px-4 py-8 flex items-center justify-between">
                <h1 className="text-[30px] text-[#ffffff]">Amount Due</h1>
                <h1 className="text-[30px] font-spartan text-[#ffffff]">
                  £{invoice.netTotal?.toFixed(2)}
                </h1>
              </div>
            </div>
          </div>

          <>
            {addInvoiceModal && addInvoiceModal ? (
              <CreateInvoice
                invoice={invoice}
                onCloseModal={() => setAddInvoiceModal(false)}
              />
            ) : (
              ""
            )}
          </>
        </>
      )}
    </div>
  );
};

export default InvoiceDetails;
