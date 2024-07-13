import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAbhaAddress } from "../redux/slices/userSlice";
import { RootState } from '../redux/store'; 

const CreateABHAaddress = () => {
  const dispatch = useDispatch();
  const abhaAddress = useSelector((state: RootState) => state.user.abhaAddress);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Dgra3414",
    "Dgraa3414",
    "dgrra2323",
  ]);


  useEffect(() => {
    console.log('Current ABHA Address:', abhaAddress);
  }, [abhaAddress]);

  const navigate = useNavigate();

  const checkAvailability = (value: string) => {
    setTimeout(() => {
      setIsAvailable(true);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setAbhaAddress(value));
    if (value.trim() !== "") {
      checkAvailability(value);
      setShowError(false); 
    } else {
      setIsAvailable(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setAbhaAddress(suggestion));
    setIsAvailable(true);
    setShowError(false); 
  };

  const handleSubmit = () => {
    if (abhaAddress.trim() === "") {
      setShowError(true); 
      setIsSubmitted(false); 
    } else {
      setIsSubmitted(true);
      setShowError(false);
    }
  };

  const handleGeneratePassword = () => {
    navigate("/CreatePassword");
  };

  return (
    <section className="flex flex-col bg-[#F3F6FF] h-screen">
      <div className="bg-[#D7E5FF] flex flex-col">
        <div className="flex flex-col justify-start">
          <ArrowBackIcon
            className="text-black text-2xl font-bold m-3"
            onClick={() => navigate("/PersonalDetails")}
          />
          <ProgressBar currentStep={3} />
        </div>
      </div>

      <>
        {isSubmitted && !showError && (
          <div className=" bg-[#D7E5FF] flex flex-col items-center pb-3">
            <p className="text-2xl text-blue-700 font-bold text-start">
              Congratulations!
            </p>
            <p className="text-lg text-black font-normal text-start">
              You have successfully created your ABHA Address.
            </p>
          </div>
        )}
        <div className="w-full flex justify-center py-4">
          <div className="md:w-[40%] p-2 bg-white px-6 py-6 rounded-lg shadow-lg border border-[#D7E5FF]">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="abhaAddress"
            >
              Create your ABHA address
            </label>
            <div className="relative mb-2">
              <input
                id="abhaAddress"
                type="text"
                value={abhaAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your ABHA address"
              />
              <span className="absolute right-3 top-2.5 text-gray-500">
                @abdm
              </span>
            </div>
            {abhaAddress.trim() !== "" && isAvailable && (
              <p className="text-green-500 text-sm">
                This ABHA address is available
              </p>
            )}
            {showError && (
              <p className="text-red-500 text-sm">
                Please enter an ABHA address.
              </p>
            )}
            <div className="mt-2">
              <p className="text-gray-700 text-sm mb-2">Suggestions</p>
              <div className="flex space-x-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded-md ${
                      suggestion === abhaAddress
                        ? "bg-blue-100 text-blue-900 font-semibold"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-[40%] bg-[#0743A1] rounded-3xl text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleGeneratePassword}
              className="w-[40%] bg-[#0743A1] rounded-3xl text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Generate Password
            </button>
          )}
        </div>
      </>
    </section>
  );
};

export default CreateABHAaddress;
