import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
    const navigate = useNavigate()

  return (
    <div>
      <div className="mb-8 cursor-pointer flex items-center space-x-6">
        <img src="/images/icon-arrow-left.svg" alt="" />
        <p onClick={() => navigate(-1)}>Go Back</p>
      </div>
    </div>
  );
};

export default GoBack;
