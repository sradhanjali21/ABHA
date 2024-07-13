import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressBar from "./ProgressBar";
import { otpimage } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const OtpPage = () => {
  const navigate = useNavigate();
  const phoneNumber = useSelector((state: RootState) => state.number.phoneNumber);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const correctOtp = "123456";

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const previousInput = e.currentTarget
          .previousElementSibling as HTMLInputElement;
        previousInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setError("Please fill the OTP.");
      return;
    }

    const enteredOtp = otp.join("");
    if (enteredOtp !== correctOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setError("");
    navigate("/PersonalDetails");
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatPhoneNumber = (number: string) => {
    if (number.length === 10) {
      return `${number.slice(0, 2)}XXXXXX${number.slice(-2)}`;
    }
    return number;
  };

  return (
    <section className="flex flex-col bg-[#F3F6FF] h-screen">
      <div className="bg-[#D7E5FF] flex flex-col">
        <div className="flex flex-col justify-start">
          <ArrowBackIcon
            className="text-black text-2xl font-bold m-3"
            onClick={() => navigate("/RegistrationForm")}
          />
        </div>
        <div className="flex flex-col items-center pb-3">
          <p className="text-lg text-black font-normal text-start">
            We have sent a 6 digit OTP to {formatPhoneNumber(phoneNumber)}
          </p>
          <div className="flex justify-center mb-4">
            <img src={otpimage} alt="" className="w-44 h-44" />
          </div>
        </div>
      </div>
      <div className="w-full flex center justify-center py-4">
        <div className="md:w-[30%] bg-white px-6 py-6 rounded-lg shadow-lg border border-[#D7E5FF]">
          <p className="py-2 text-gray-600 font-bold">Enter OTP</p>
          <form
            className="flex justify-between md:gap-0 gap-2 mb-2"
            onSubmit={handleSubmit}
          >
            {otp.map((data, index) => (
              <input
                className="w-12 h-12 text-center  text-lg border rounded bg-white"
                type="text"
                name="otp"
                maxLength={1}
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </form>
          {error && <p className="text-red-500 text-center py-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#0743A1] rounded-3xl text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={handleSubmit}
          >
            Verify and continue
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 text-sm text-gray-600">
        <p>Didn’t receive OTP?</p>
        <p>
          <span className="text-[#0743A1] font-bold mx-3">Resend OTP</span>{" "}
          {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : ""}
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
