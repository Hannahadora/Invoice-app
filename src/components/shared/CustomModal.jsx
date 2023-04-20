import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { modalEaseInAndOut } from "../../utils/gsapAnimations";

const CustomModal = ({ children, isOpen, btnRef }) => {
  const modalRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme);
  
  useLayoutEffect(() => {
    modalEaseInAndOut(modalRef, isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(btnRef.current.contains(event.target)) {
        return
      }
      else if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddInvoiceModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="h-full">
      <div className="bg-[#00000060] fixed lg:top-0 top-[95px] w-full right-0 left-0 h-full">
        <div
          ref={modalRef}
          className={`${
            isOpen
              ? `modal-scrollbar lg:ml-[100px] ${
                  theme === "light" ? "bg-[#ffffff]" : "bg-[#141625]"
                } rounded-r-[10px] py-[50px] px-[20px] h-full fixed left-[0] lg:top-0 top-[95px] lg:w-[50%] w-[100%]`
              : ``
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
