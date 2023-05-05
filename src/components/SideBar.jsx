import React from "react";
import Logo from "./Logo";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="z-[50] lg:w-[100px] w-full bg-[#1e2139] lg:rounded-r-[10px] fixed lg:h-screen h-[70px] lg:left-[0] top-[0]">
      <div className="h-full mb-[40px] flex lg:flex-col flex-row justify-between">
        <div className="lg:w-full lg:w-[100px] w-[70px]">
          <Logo />
        </div>
        <div className="lg:w-[100%] w-[70%] flex lg:flex-col flex-row items-center lg:justify-end justify-between">
          <div className="lg:w-[100%] w-[70%] flex lg:flex-col flex-row items-center lg:justify-center justify-between">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `lg:mb-[32px] lg:mr-[0] md:mr-[24px] mr-[12px] ${
                  isActive ? "active_navLink" : ""
                }`
              }
            >
              <img
                className="lg:w-[30px] w-[24px] cursor-pointer"
                src="/images/icon-home.svg"
                alt="home"
              />
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `lg:mb-[32px] lg:mr-[0] md:mr-[24px] mr-[12px] ${
                  isActive ? "active_navLink" : ""
                }`
              }
            >
              <img
                className="lg:w-[30px] w-[24px] cursor-pointer"
                src="/images/icon-team.svg"
                alt="users"
              />
            </NavLink>
              <img
                className="lg:w-[20px] w-[18px] lg:h-[20px] h-[18px] cursor-pointer lg:mr-[0] md:mr-[24px] mr-[12px]"
                src={`${theme === 'light' ? "/images/icon-moon.svg" : "/images/icon-sun.svg"}`}
                alt={`${theme === 'light' ? "moon" : "sun"}`}
                onClick={() => dispatch(toggleTheme(theme === "light" ? "dark" : "light"))}
              />
          </div>

          <div className="lg:w-[100%] lg:py-[24px] py-[12px] lg:px-[0] px-[12px] flex items-center justify-center lg:mt-[30px] lg:border-t border-t-0 lg:border-l-0 border-l border-[#ffffff]">
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
