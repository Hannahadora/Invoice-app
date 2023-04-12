import React, { useEffect, useState } from "react";
import { Formik, setIn } from "formik";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "../redux/invoices";
import { generateRandomId } from "../utils/RandomIdGenerator";

const CreateInvoice = ({ onCloseModal, invoice }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [invoiceForm, setInvoiceForm] = useState({
    id: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientStreetAddress: "",
    clientCity: "",
    clientCountry: "",
    clientPostCode: "",
    invoiceDate: "",
    paymentTerms: "",
    description: "",
    statusText: "",
    paid: false,
    showMarkBtn: true,
    addItems: [
      {
        itemname: "",
        quantity: 1,
        price: 0,
      },
    ],
    netTotal: 0,
  });

  const calcNetTotal = () => {
    invoiceForm.netTotal = invoiceForm.addItems?.reduce(
      (a, b) => a.quantity * a.price + b.quantity * b.price,
      0
    );
  };

  const validateForm = Yup.object({
    clientEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const deleteItem = (index) => {
    invoiceForm.addItems.splice(index, 1);
  };

  const addItem = () => {
    invoiceForm.addItems.push({
      itemname: "",
      quantity: 1,
      price: 0,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (event, index) => {
    console.log("event", event);
    console.log("index", index);
    const { name, value } = event.target;
    setInvoiceForm((prevState) => ({
      ...prevState,
      addItems: prevState.addItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
    }));
  };

  const createInvoice = (status) => {
    setIsSubmitting(true);
    const updatedInvoiceForm = {
      ...invoiceForm,
      statusText: status,
      id: invoice ? invoice.id : generateRandomId(),
    };
    calcNetTotal();
    invoice
      ? dispatch(updateInvoice(updatedInvoiceForm))
      : dispatch(addInvoice(updatedInvoiceForm));
    setTimeout(() => {
      alert("Successful!!");
      onCloseModal();
    }, 400);
  };

  useEffect(() => {
    invoice && setInvoiceForm({ ...invoice });
  }, [invoice]);

  return (
    <div className="h-full">
      <div className="bg-[#00000060] fixed lg:top-0 top-[95px] w-full right-0 left-0 h-full"></div>
      <div className="lg:ml-[100px] bg-[#ffffff] rounded-r-[10px] py-[50px] px-[20px] h-full fixed left-[0] lg:top-0 top-[95px] lg:w-[40%] w-[80%]">
        <h1 className="text-[30px] mb-[40px]">
          {invoice ? `Edit Invoice - #${invoice?.id}` : "Create Invoice"}
        </h1>
        <form
          className="flex flex-col space-y-[24px] px-[20px] h-full pb-[50px] overflow-y-scroll"
          onSubmit={createInvoice}
        >
          <h4 className="text-blue-900 text-[18px]">Bill From:</h4>
          <CustomInput
            required
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={invoiceForm.streetAddress}
            handleChange={handleInputChange}
          />
          <div className="grid grid-cols-3 space-x-4">
            <CustomInput
              required
              type="text"
              name="city"
              placeholder="City"
              value={invoiceForm.city}
              handleChange={handleInputChange}
            />
            <CustomInput
              required
              type="text"
              name="postCode"
              placeholder="Post code"
              value={invoiceForm.postCode}
              handleChange={handleInputChange}
            />
            <CustomInput
              required
              type="text"
              name="country"
              placeholder="country"
              value={invoiceForm.country}
              handleChange={handleInputChange}
            />
          </div>
          <h4 className="text-blue-900 text-[18px]">Bill To:</h4>
          <CustomInput
            required
            type="text"
            name="clientName"
            placeholder="Name"
            value={invoiceForm.clientName}
            handleChange={handleInputChange}
          />
          <CustomInput
            required
            type="text"
            name="clientEmail"
            placeholder="Email"
            // error={
            //   errors.clientEmail &&
            //   touched.clientEmail &&
            //   errors.clientEmail
            // }
            value={invoiceForm.clientEmail}
            handleChange={handleInputChange}
          />
          <CustomInput
            required
            type="text"
            name="clientStreetAddress"
            placeholder="Street Address"
            value={invoiceForm.clientStreetAddress}
            handleChange={handleInputChange}
          />
          <div className="grid grid-cols-3 space-x-4">
            <CustomInput
              required
              type="text"
              name="clientCity"
              placeholder="City"
              value={invoiceForm.clientCity}
              handleChange={handleInputChange}
            />
            <CustomInput
              required
              type="text"
              name="clientPostCode"
              placeholder="Post code"
              value={invoiceForm.clientPostCode}
              handleChange={handleInputChange}
            />
            <CustomInput
              required
              type="text"
              name="clientCountry"
              placeholder="Country"
              value={invoiceForm.clientCountry}
              handleChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 space-x-4">
            <CustomInput
              required
              type="date"
              name="invoiceDate"
              value={invoiceForm.invoiceDate}
              handleChange={handleInputChange}
            />
            <CustomInput
              required
              type="text"
              name="paymentTerms"
              placeholder="Select Payment Terms"
              value={invoiceForm.paymentTerms}
              handleChange={handleInputChange}
            />
          </div>
          <CustomInput
            required
            type="text"
            name="description"
            placeholder="Eg Crypto vendor service"
            value={invoiceForm.description}
            handleChange={handleInputChange}
          />
          <h4 className="text-blue-900 text-[18px]">Item List</h4>
          {invoiceForm.addItems?.map((item, i) => (
            <div key={i} className="grid grid-cols-9 space-x-4">
              <div className="col-span-2">
                <label>Item name</label>
                <CustomInput
                  required
                  type="text"
                  name={`addItems[${i}].itemname`}
                  value={item.itemname}
                  handleChange={(event) => handleItemChange(event, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Qty</label>
                <CustomInput
                  required
                  type="number"
                  name={`addItems[${i}].quantity`}
                  value={item.quantity}
                  handleChange={(event) => handleItemChange(event, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Price</label>
                <CustomInput
                  required
                  type="number"
                  name={`addItems[${i}].price`}
                  value={item.price}
                  handleChange={(event) => handleItemChange(event, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Total</label>
                <CustomInput
                  disabled
                  required
                  type="number"
                  name={`addItems[${i}].total`}
                  value={item.price * item.quantity}
                />
              </div>
              <div className="flex items-center justify-end">
                <img
                  className="cursor-pointer w-4 h-4"
                  onClick={() => deleteItem(i)}
                  src="/images/icon-delete.svg"
                  alt=""
                />
              </div>
            </div>
          ))}
          <div
            className="mt-6 p-3 cursor-pointer w-full bg-blue-100 text-blue-900 rounded text-center font-bold"
            onClick={() => addItem()}
          >
            Add Item
          </div>
          {}
          <div className="pt-[50px] pb-[20px] flex items-center justify-between space-x-[24px]">
            <button
              type="button"
              onClick={() => onCloseModal()}
              className="btn sec_btn"
            >
              Discard
            </button>

            <div>
              {invoice && invoice ? (
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="btn pry_btn"
                    disabled={isSubmitting}
                    onClick={() => createInvoice(invoice.status)}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-6">
                  <button
                    type="submit"
                    className="btn dark_btn"
                    disabled={isSubmitting}
                    onClick={() => createInvoice("Draft")}
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="btn pry_btn"
                    disabled={isSubmitting}
                    onClick={() => createInvoice("Pending")}
                  >
                    Save & Send
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
