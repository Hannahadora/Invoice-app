import React, { useEffect, useRef } from "react";
import Logo from "../Logo";
import { spinCircle } from "../../utils/GsapAnimations";
import { useSelector } from "react-redux";

const AppLoading = () => {
  const circleRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    spinCircle(circleRef, 2);
  }, []);
  
  return (
    <div className={`${theme === "dark" ? "body-dark_theme" : "body-light_theme"} h-screen w-full"`}>
      <div className="centered flex flex-col items-center justify-center">
        <div
          ref={circleRef}
          className="w-[100px] h-[100px] overflow-hidden rounded-full mb-[24px] flex items-center justify-center"
        >
          <Logo className="w-full" />
        </div>
        <p className="italic font-serif mt-[32px] text-[20px]">Fetching...</p>
      </div>
    </div>
  );
};

export default AppLoading;
