import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CreateInvoice from "../components/CreateInvoice";
import InvoiceList from "../components/InvoiceList";
import { useSelector, useDispatch } from "react-redux";
import { hideOnClickOutside } from "../utils/ClickOutside";
import { gsap } from "gsap";

const home = () => {
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const [showFIlters, setShowFilters] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filterRef = useRef(null);
  const listRef = useRef(null);

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
    gsap.from(listRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
    });
    // document.addEventListener("click", (event) =>
    //   hideOnClickOutside(event, filterRef, setShowFilters(false))
    // );

    // return () => {
    //   document.removeEventListener("click", (event) =>
    //     hideOnClickOutside(event, filterRef, setShowFilters(false))
    //   );
    // };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-[40px]">
        <div>
          <h1 className="text-[35px]">Invoices</h1>
          <p>There are {filteredData?.length} total invoice(s)</p>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative mr-10" ref={filterRef}>
            <div
              className="cursor-pointer flex items-center"
              onClick={(e) => { e.stop, toggleFilter()}}
            >
              <p className="mr-6">Filter by status:</p>{" "}
              <span>
                <img
                  className=""
                  src={`${
                    showFIlters
                      ? "/images/icon-arrow-down.svg"
                      : "/images/icon-arrow-right.svg"
                  }`}
                  alt=""
                />
              </span>
            </div>
            <div>
            {showFIlters && showFIlters && (
              <div className="bg-[#ffffff] w-[150px] absolute shadow p-3 rounded mt-4">
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
            onClick={() => setAddInvoiceModal(true)}
            className="flex items-center icon_btn pry_btn rounded-[24px]"
          >
            <img
              className="mr-3 p-2 bg-[#ffffff] rounded-full"
              src="/images/icon-plus.svg"
              alt=""
            />{" "}
            New Invoice
          </button>
        </div>
      </div>

      <div>
        {filteredData &&
          filteredData?.map((invoice, i) => (
            <div ref={listRef} key={i}>
              <InvoiceList invoice={invoice} />
            </div>
          ))}
      </div>

      <>
        {addInvoiceModal && addInvoiceModal ? (
          <CreateInvoice
            onCloseModal={() => {
              setAddInvoiceModal(false);
              setFilteredData(invoices);
            }}
          />
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default home;
