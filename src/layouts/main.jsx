import React, { useLayoutEffect } from "react";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";

const main = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  
  // useLayoutEffect(() => {
  //   theme === "dark"
  //     ? document.body.classList.remove("body_light-theme") &&
  //       document.body.classList.add("body_dark-theme")
  //     : document.body.classList.remove("body_dark-theme") &&
  //       document.body.classList.add("body_light-theme");
  //   document.body.classList.add(`body_${theme}-theme`);
  // }, [theme]);

  return (
    <div className={`${theme === "dark" ? "body-dark_theme" : "body-light_theme"} h-screen overflow-y-scroll w-full flex lg:flex-row flex-col`}>
      <SideBar />
      <div className="lg:w-[770px] w-[100%] mx-auto lg:px-[0px] px-[16px] lg:py-[50px] py-[100px]">{children}</div>
    </div>
  );
};

export default main;
