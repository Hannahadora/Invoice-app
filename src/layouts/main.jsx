import React, { useEffect, useLayoutEffect } from "react";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { LsToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const main = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(!LsToken) {
  //     navigate("/auth/")
  //   }
  // }, [LsToken])

  return (
    <div className={`${theme === "dark" ? "body-dark_theme" : "body-light_theme"} h-screen overflow-y-scroll w-full flex lg:flex-row flex-col`}>
      <SideBar />
      <div className="lg:w-[770px] w-[100%] mx-auto lg:px-[0px] px-[16px] lg:py-[50px] py-[100px]">{children}</div>
    </div>
  );
};

export default main;
