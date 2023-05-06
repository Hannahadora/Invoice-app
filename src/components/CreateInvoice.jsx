import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomInput from "./CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, updateInvoice } from "../redux/invoices";
import { generateRandomId } from "../utils/RandomIdGenerator";
import { modalEaseInAndOut } from "../utils/gsapAnimations";
import CustomModal from "./shared/CustomModal";
import CustomSelect from "./CustomSelect";
import moment from "moment";
import { validateInvoiceForm } from "../utils/validateInvoiceForm";

const CreateInvoice = ({ isOpen, invoice, setAddInvoiceModal, btnRef }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

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

  const [items, setItems] = useState([{ itemname: "", quantity: 0, price: 0 }]);

  const handleAddItem = () => {
    setItems([...items, { itemname: "", quantity: 0, price: 0 }]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name.split("-")[0]] = value;
    setItems(newItems);
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateNetTotal = (items) => {
    return items.reduce((total, item) => {
      const itemTotal = parseInt(item.quantity) * parseInt(item.price);
      return total + itemTotal;
    }, 0);
  };

  const handleSelected = (val) => {
    const currentDate = new Date(invoiceForm.invoiceDate); // Get the current date
    const invoiceDate = new Date(currentDate); // Create a new date object with the same value as the current date
    const oneDay = invoiceDate.setDate(currentDate.getDate() + 1); // Add one day to the new date object
    const sevenDays = invoiceDate.setDate(currentDate.getDate() + 7);
    const twentyOneDays = invoiceDate.setDate(currentDate.getDate() + 21);
    const thirtyDays = invoiceDate.setDate(currentDate.getDate() + 30);
    var pt;

    if (val === "1day") {
      pt = moment(oneDay).format("YYYY-MM-DD");
    } else if (val === "7days") {
      pt = moment(sevenDays).format("YYYY-MM-DD");
    } else if (val === "21days") {
      pt = moment(twentyOneDays).format("YYYY-MM-DD");
    } else if (val === "30days") {
      pt = moment(thirtyDays).format("YYYY-MM-DD");
    }

    setInvoiceForm((prevState) => ({
      ...prevState,
      paymentTerms: pt,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateInvoice = (status) => {
    console.log("status", status);
    // validateInvoiceForm(invoiceForm)
    setIsSubmitting(true);
    const updatedInvoiceForm = {
      ...invoiceForm,
      statusText: status,
      id: invoice ? invoice.id : generateRandomId(),
      addItems: [...items],
      netTotal: calculateNetTotal(items),
    };
    invoice
      ? dispatch(updateInvoice(updatedInvoiceForm))
      : dispatch(addInvoice(updatedInvoiceForm));
    setTimeout(() => {
      // alert("Successful!!");
      setAddInvoiceModal();
    }, 400);
  };

  useEffect(() => {
    invoice && setInvoiceForm({ ...invoice });
    invoice && setItems([...invoice.addItems])
  }, [invoice]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        btnRef={btnRef}
        setModalVisibility={() => setAddInvoiceModal(false)}
      >
        <h1 className="lg:text-[28px] text-[24px] mb-[40px] lg:pl-[20px] pl-[10px]">
          {invoice ? `Edit Invoice - #${invoice?.id}` : "Create Invoice"}
        </h1>
        <form
          className="flex flex-col space-y-[24px] lg:px-[20px] px-[10px] h-full pb-[50px] overflow-y-scroll"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateInvoice(invoice && invoice ? invoice?.status : "Pending");
          }}
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

            <CustomSelect
              required
              name="paymentTerms"
              placeholder="Select Payment Terms"
              handleSelected={handleSelected}
              options={[
                { name: "Net 1 Day", value: "1day" },
                { name: "Net 7 Days", value: "7days" },
                { name: "Net 21 Days", value: "21days" },
                { name: "Net 30 Days", value: "30days" },
              ]}
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
          {items?.map((item, i) => (
            <div key={i} className="grid grid-cols-9 space-x-4">
              <div className="col-span-2">
                <label>Item name</label>
                <CustomInput
                  required
                  type="text"
                  name={`itemname-${i}`}
                  value={item.itemname}
                  handleChange={(e) => handleItemChange(e, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Qty</label>
                <CustomInput
                  required
                  type="number"
                  name={`quantity-${i}`}
                  value={item.quantity}
                  handleChange={(e) => handleItemChange(e, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Price</label>
                <CustomInput
                  required
                  type="number"
                  name={`price-${i}`}
                  value={item.price}
                  handleChange={(e) => handleItemChange(e, i)}
                />
              </div>
              <div className="col-span-2">
                <label>Total</label>
                <CustomInput
                  disabled
                  required
                  type="number"
                  name={`total-${i}`}
                  value={calculateTotal(item.price, item.quantity)}
                />
              </div>
              <div className="flex items-center justify-end">
                <img
                  className="cursor-pointer w-4 h-4"
                  onClick={() => handleDeleteItem(i)}
                  src="/images/icon-delete.svg"
                  alt=""
                />
              </div>
            </div>
          ))}
          <div
            className="mt-6 ai_mb p-3 cursor-pointer w-full bg-blue-100 text-blue-900 rounded-3xl text-center font-bold "
            onClick={() => handleAddItem()}
          >
            Add Item
          </div>
          {}
          <div className="lg:px-[30px] px-[16px] pt-[40px] bg-[#fff] shadow lg:pb-[20px] pb-[100px] flex items-center justify-between space-x-[24px] fixed w-full bottom-0 left-0">
            <button
              type="button"
              onClick={() => setAddInvoiceModal()}
              className="btn sec_btn"
            >
              Discard
            </button>

            <div>
              <div className="flex items-center justify-end space-x-6">
                {invoice && invoice ? (
                  ""
                ) : (
                  <button
                    type="submit"
                    className="btn dark_btn"
                    disabled={isSubmitting}
                    onClick={() => handleCreateInvoice("Draft")}
                  >
                    Save as Draft
                  </button>
                )}
                <button
                  type="submit"
                  className="btn pry_btn"
                  disabled={isSubmitting}
                >
                  {invoice && invoice ? "Save Changes" : "Save & Send"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default CreateInvoice;
