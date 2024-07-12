import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets/images";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Start = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/RegistrationForm");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={logo} alt="Logo" className="h-20 w-auto mb-4" />
      <div className="flex gap-3 ">
        <span className="bg-[#F3F6FF] justify-center  flex flex-col items-center h-20 w-20 rounded-lg"
                onClick={handleStart}
        >
          <SaveAsIcon className="text-blue-700 text-xl" />
          <p className="text-sm font-semibold text-center">
            Create <br /> ABHA
          </p>
        </span>
        <span className="bg-[#F3F6FF] justify-center  flex flex-col items-center h-20 w-20 rounded-lg"
        onClick={()=>{
          navigate("/Dashboard");
        }}
        >
          <AccountBoxIcon className="text-blue-700 text-xl" />
          <p className="text-sm font-semibold text-center">
          Go to<br />
          Profile 
          </p>
        </span>
      </div>
    </div>
  );
};

export default Start;
