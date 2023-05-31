import React, { useEffect } from "react";
import Logo from "../components/Logo";
import { useSelector } from "react-redux";
import { LsToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const auth = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(LsToken) {
  //     navigate("/")
  //   }
  // }, [LsToken])

  return (
    <div className={`${theme === "dark" ? "body-dark_theme" : "body-light_theme"} h-screen"`}>
      <div className="mx-auto xl:w-[40%] lg:w-[70%] w-[100%] h-screen flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] overflow-hidden rounded-full mb-[24px] flex items-center justify-center">
          <Logo className="w-full" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default auth;
