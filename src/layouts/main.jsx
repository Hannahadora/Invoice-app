import React from "react";
import SideBar from "../components/SideBar";

const main = ({ children }) => {
  return (
    <div className="w-full flex lg:flex-row flex-col">
      <SideBar />
      <div className="w-[770px] mx-auto lg:px-[0px] px-[24px] lg:py-[50px] py-[150px]">{children}</div>
    </div>
  );
};

export default main;
