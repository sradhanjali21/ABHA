import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPhoneNumber } from "../redux/slices/NumberSlice";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneNumber = useSelector(
    (state: RootState) => state.number.phoneNumber
  );
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [activeField, setActiveField] = useState("phone");
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  useEffect(() => {
    console.log("Current phoneNumber:", phoneNumber);
  }, [phoneNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions to proceed.");
      return;
    }

    if (validatePhoneNumber(phoneNumber)) {
      setError("");
      navigate("/OtpPage");
    } else {
      setError(
        "Invalid phone number. Must be 10 digits and not contain characters."
      );
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only update state if the input is 10 digits or less
    if (/^\d*$/.test(value) && value.length <= 10) {
      dispatch(setPhoneNumber(value));
    }
  };

  return (
    <section className="flex flex-col bg-[#F3F6FF] h-screen">
      <div className="bg-[#D7E5FF] flex flex-col">
        <div className="flex flex-col justify-start">
          <ArrowBackIcon
            className="text-black text-2xl font-bold"
            onClick={() => navigate("/")}
          />
          <ProgressBar currentStep={1} />
        </div>
        <div className="flex flex-col items-center pb-3">
          <p className="text-2xl text-blue-700 font-bold text-start">
            Welcome !
          </p>
          <p className="text-lg text-black font-normal text-start">
            You are about to create your ABHA Number.
          </p>
        </div>
      </div>
      <div className="w-full flex center justify-center py-4">
        <div className="md:w-[40%] w-[95%] bg-white px-6 py-6 rounded-lg shadow-lg border border-[#D7E5FF]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex justify-center gap-10 my-2 pb-6">
                <div className="flex flex-col justify-center items-center">
                  <label
                    htmlFor="aadhaar"
                    className={`font-medium ${
                      activeField === "aadhaar"
                        ? "text-blue-900"
                        : " text-gray-400"
                    }`}
                    onClick={() => setActiveField("aadhaar")}
                  >
                    Aadhaar
                  </label>
                  <span
                    className={`h-[2px] rounded-lg w-16 ${
                      activeField === "aadhaar"
                        ? "bg-blue-900"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <label
                    htmlFor="phone"
                    className={`font-medium ${
                      activeField === "phone"
                        ? "text-blue-900"
                        : " text-gray-400"
                    }`}
                    onClick={() => setActiveField("phone")}
                  >
                    Phone
                  </label>
                  <span
                    className={`h-[2px] rounded-lg w-14 ${
                      activeField === "phone" ? "bg-blue-900" : "bg-transparent"
                    }`}
                  ></span>
                </div>
              </div>
              <div className="relative">
                {activeField === "phone" && (
                  <>
                    <span className="absolute inset-y-0 justify-center font-semibold  left-0 flex items-center px-3 bg-[#D7E5FF] rounded-l-lg text-blue-800">
                      +91
                    </span>
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="pl-14 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="98xxxxxxxx"
                    />
                  </>
                )}
                {activeField === "aadhaar" && (
                  <input
                    type="text"
                    id="aadhaar"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="pl-3 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter Aadhaar Number"
                  />
                )}
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <p className="text-sm text-red-700 font-semibold center items-center gap-1 mb-4 flex">
              <InfoIcon />
              You'll have to complete KYC verification later to get ABHA number
            </p>
            <button
              type="submit"
              className="w-full bg-[#0743A1] rounded-3xl text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
      <div className="w-full justify-center flex center gap-3">
        <p className="font-semibold">Already have ABHA Number?</p>
        <p className="text-[#0743A1] font-semibold">Click here </p>
      </div>
      <div className="flex  justify-center">
        <div className="mt-4 text-base text-gray-500 flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            className="mr-2"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
          />
          <label htmlFor="acceptTerms">
            Accept Terms & Conditions and Privacy Policy
          </label>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
