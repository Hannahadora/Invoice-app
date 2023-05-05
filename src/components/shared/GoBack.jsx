import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
      navigate(-1);
    };

  return (
    <div>
      <div className="mb-8 cursor-pointer flex items-center space-x-6" onClick={handleGoBack}>
        <img src="/images/icon-arrow-left.svg" alt="" />
        <p>Go Back</p>
      </div>
    </div>
  );
};

export default GoBack;
