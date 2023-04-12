import React from "react";
import Logo from "../components/Logo";

const auth = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="mx-auto w-[40%] h-screen flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] overflow-hidden rounded-full mb-[24px] flex items-center justify-center">
          <Logo className="w-full" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default auth;
