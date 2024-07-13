import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "./ProgressBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../redux/slices/userSlice";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = useSelector((state: any) => state.user.password);
  const [isNumberPresent, setIsNumberPresent] = useState(false);
  const [isUpperCasePresent, setIsUpperCasePresent] = useState(false);
  const [isLowerCasePresent, setIsLowerCasePresent] = useState(false);
  const [isSpecialCharPresent, setIsSpecialCharPresent] = useState(false);
  const [isPasswordSubmitted, setIsPasswordSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(3);

  useEffect(() => {
    console.log("Current ABHA password:", password);
  }, [password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setPassword(value));
    setShowError(false);
    setValidationErrors([]);

    setIsNumberPresent(/\d/.test(value));
    setIsUpperCasePresent(/[A-Z]/.test(value));
    setIsLowerCasePresent(/[a-z]/.test(value));
    setIsSpecialCharPresent(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  const handleSubmit = () => {
    const errors: string[] = [];
    if (password.trim() === "") {
      setShowError(true);
    } else {
      if (!/\d/.test(password))
        errors.push("Password must contain at least 1 number.");
      if (!/[A-Z]/.test(password))
        errors.push("Password must contain at least 1 uppercase letter.");
      if (!/[a-z]/.test(password))
        errors.push("Password must contain at least 1 lowercase letter.");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        errors.push("Password must contain at least 1 special symbol.");

      if (errors.length > 0) {
        setValidationErrors(errors);
      } else {
        setIsPasswordSubmitted(true);
        dispatch(setPassword(""));
        setCurrentStep(4);
      }
    }
  };

  return (
    <div className="flex flex-col bg-[#F3F6FF] h-screen">
      <div className="bg-[#D7E5FF] flex flex-col">
        <div className="flex flex-col justify-start">
          <ArrowBackIcon
            className="text-black text-2xl font-bold m-3"
            onClick={() => navigate("/CreateABHAaddress")}
          />
          <ProgressBar currentStep={currentStep} />
        </div>
      </div>

      <div className="flex flex-col items-center  my-4 h-screen bg-[#F3F6FF]">
        <div className="w-[90%] md:w-[40%] bg-white p-6 rounded-lg shadow-lg border border-[#D7E5FF]">
          {isPasswordSubmitted ? (
            <>
              <p className="text-2xl text-blue-700 font-bold text-center">
                Congratulations!
              </p>
              <p className="text-lg text-black font-normal text-center">
                You have successfully created your ABHA Password.
              </p>
              <button
                className="w-full bg-[#0743A1] text-white rounded-full py-3 mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => {
                  navigate("/Dashboard");
                }}
              >
                Go to Profile
              </button>
            </>
          ) : (
            <>
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Create password
              </label>
              <div className="relative mb-4">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full bg-white px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              {showError && (
                <p className="text-red-500 text-sm mb-4">
                  Please enter a password.
                </p>
              )}
              {validationErrors.length > 0 && (
                <div className="mb-4 border border-red-500 p-2 rounded-md">
                  {validationErrors.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <div className="mb-4 border border-[#D7E5FF] p-2 rounded-md">
                <p
                  className={`text-sm ${
                    isNumberPresent
                      ? "text-green-500 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  1 Number
                </p>
                <p
                  className={`text-sm ${
                    isUpperCasePresent
                      ? "text-green-500 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  1 Upper case
                </p>
                <p
                  className={`text-sm ${
                    isLowerCasePresent
                      ? "text-green-500 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  1 Lower case
                </p>
                <p
                  className={`text-sm ${
                    isSpecialCharPresent
                      ? "text-green-500 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  1 special symbol
                </p>
              </div>
              <button
                className="w-full bg-[#0743A1] text-white rounded-full py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={handleSubmit}
              >
                Continue
              </button>
              <button
                className="w-full bg-transparent text-[#0743A1] rounded-full py-3 mt-4 border border-[#0743A1] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => {
                  navigate("/Dashboard");
                }}
              >
                Skip for now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
