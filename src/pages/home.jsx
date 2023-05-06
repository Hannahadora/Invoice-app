import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CreateInvoice from "../components/CreateInvoice";
import InvoiceList from "../components/InvoiceList";
import { useSelector, useDispatch } from "react-redux";
import { hideOnClickOutside } from "../utils/ClickOutside";
import { easeIn, slideDown } from "../utils/gsapAnimations";
import gsap from "gsap";

const home = () => {
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const [showFIlters, setShowFilters] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const theme = useSelector((state) => state.theme.theme)

  const filterRef = useRef();
  const listRef = useRef();
  const filterDropdownRef = useRef();
  const introRef = useRef();
  const modalBtnRef = useRef(null);

  const invoices = useSelector((state) => state.invoices.invoices);
  const filterOptions = ["Paid", "Pending", "Draft"];

  const toggleFilter = () => {
    setShowFilters((showFilters) => !showFilters);
  };

  const handleOptionChange = (option) => {
    let updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions);
  };

  const filterData = (selectedOptions) => {
    const filtered = invoices?.filter((item) =>
      selectedOptions.includes(item.statusText)
    );
    filtered?.length > 0
      ? setFilteredData(filtered)
      : setFilteredData(invoices);
  };

  useLayoutEffect(() => {
    filterData(selectedOptions);
  }, [selectedOptions, invoices]);

  useLayoutEffect(() => {
    easeIn(listRef);
    slideDown(introRef);
  }, []);

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (event) => handleClickOutside(event));
    return () => {
      document.removeEventListener("click", (event) =>
        handleClickOutside(event)
      );
    };
  }, []);

  return (
    <div className="page">
      <div
        ref={introRef}
        className="flex items-center justify-between mb-[40px]"
      >
        <div>
          <h1 className="lg:text-[35px] text-[24px]">Invoices</h1>
          <p>There are {filteredData?.length} total invoice(s)</p>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative mr-10" ref={filterRef}>
            <div
              className="cursor-pointer flex items-center"
              onClick={(e) => {
                e.stop, toggleFilter();
              }}
            >
              <span className="text-medium mr-1">Filter</span><span className="md:block hidden mr-1"> by status :</span>{""}
              <span>
                <img
                  className="ml-3"
                  src={`${
                    showFIlters
                      ? "/images/icon-arrow-down.svg"
                      : "/images/icon-arrow-right.svg"
                  }`}
                  alt=""
                />
              </span>
            </div>
            <div ref={filterDropdownRef}>
              {showFIlters && showFIlters && (
                <div className={`${theme === 'light' ? "bg-[#ffffff]" : "bg-[#0a0e2e]"} w-[150px] z-[20] absolute shadow p-3 rounded mt-4`}>
                  <div className="flex flex-col">
                    {filterOptions?.map((option) => (
                      <label key={option} className="mb-4">
                        <input
                          className="mr-3"
                          type="checkbox"
                          value={option}
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleOptionChange(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            ref={modalBtnRef}
            onClick={(e) => {
              e.stop;
              setAddInvoiceModal(!addInvoiceModal);
            }}
            className="flex items-center icon_btn pry_btn rounded-[24px]"
          >
            <img
              className="mr-3 p-2 bg-[#ffffff] rounded-full"
              src="/images/icon-plus.svg"
              alt=""
            />{" "}
            <span className="mr-1">New</span> <span className="md:block hidden mr-3">Invoice</span>
          </button>
        </div>
      </div>

      <div>
        {filteredData &&
          filteredData?.map((invoice, i) => (
            <div className="list_item mb-[20px]" ref={listRef} key={i}>
              <InvoiceList invoice={invoice} />
            </div>
          ))}
      </div>

      <div>
        {addInvoiceModal && (
          <CreateInvoice
            isOpen={addInvoiceModal}
            setAddInvoiceModal={() => {
              setAddInvoiceModal(false);
            }}
            btnRef={modalBtnRef}
          />
        )}
      </div>
    </div>
  );
};

export default home;
