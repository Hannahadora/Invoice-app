import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="z-[50] lg:w-[100px] w-full bg-[#1e2139] rounded-r-[10px] fixed lg:h-screen h-[100px] lg:left-[0] top-[0]">
      <div className="h-full mb-[40px] flex lg:flex-col flex-row justify-between">
        <div className="lg:w-full w-[100px]">
          <Logo />
        </div>
        <div className="lg:w-[100%] w-[70%] flex lg:flex-col flex-row items-center lg:justify-end justify-between">
          <div className="lg:w-[100%] w-[70%] flex lg:flex-col flex-row items-center lg:justify-center justify-between">
            <img
              onClick={() => navigate("/")}
              className="w-[30px] h-[30px] lg:mb-[32px] lg:mr-[0] mr-[24px] cursor-pointer"
              src="/images/icon-home.svg"
              alt=""
            />
            <img
              onClick={() => navigate("/settings")}
              className="w-[30px] h-[30px] lg:mb-[32px] lg:mr-[0] mr-[24px] cursor-pointer"
              src="/images/icon-settings.svg"
              alt=""
            />
            <img
              onClick={() => navigate("/users")}
              className="w-[30px] h-[30px] lg:mb-[32px] lg:mr-[0] mr-[24px] cursor-pointer"
              src="/images/icon-team.svg"
              alt=""
            />
            <img
              onClick={() => navigate("/notifications")}
              className="w-[30px] h-[30px] lg:mb-[32px] lg:mr-[0] mr-[24px] cursor-pointer"
              src="/images/icon-notif.svg"
              alt=""
            />
            <img
              className="w-[30px] h-[30px] cursor-pointer"
              src="/images/icon-moon.svg"
              alt=""
            />
          </div>

          <div className="lg:w-[100%] py-[24px] lg:px-[0] px-[24px] flex items-center justify-center lg:mt-[30px] lg:border-t border-l border-[#ffffff]">
            <img
              src="/images/me-avatar.png"
              className="cursor-pointer w-[50px] h-[50px] rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
