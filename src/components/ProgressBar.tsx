import React from "react";
import CheckIcon from "@mui/icons-material/Check";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="flex flex-col justify-center py-5 items-center gap-1 mb-2">
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <div
            className={`w-8 h-8 rounded-full justify-center items-center flex ${
              currentStep > 1 ? "bg-green-600" : currentStep === 1 ? "bg-blue-800" : "bg-gray-400"
            }`}
          >
            {currentStep > 1 && <CheckIcon className="text-white" />}
          </div>
          <div
            className={`w-20 border-t-2 ${
              currentStep > 1 ? "border-green-600" : currentStep === 2 ? "border-blue-800" : "border-gray-400"
            }`}
          ></div>
        </div>
        <div className="flex gap-1 items-center">
          <div
            className={`w-8 h-8 rounded-full justify-center items-center flex ${
              currentStep > 2 ? "bg-green-600" : currentStep === 2 ? "bg-blue-800" : "bg-gray-400"
            }`}
          >
            {currentStep > 2 && <CheckIcon className="text-white" />}
          </div>
          <div
            className={`w-20 border-t-2 ${
              currentStep > 2 ? "border-green-600" : currentStep === 3 ? "border-blue-800" : "border-gray-400"
            }`}
          ></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full justify-center items-center flex ${
              currentStep > 3 ? "bg-green-600" : currentStep === 3 ? "bg-blue-800" : "bg-gray-400"
            }`}
          >
            {currentStep > 3 && <CheckIcon className="text-white" />}
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <span
          className={`mt-2 text-sm ${
            currentStep > 1 ? "text-green-600" : currentStep === 1 ? "text-blue-800" : "text-gray-400"
          }`}
        >
          Phone number
        </span>
        <span
          className={`mt-2 text-sm ${
            currentStep > 2 ? "text-green-600" : currentStep === 2 ? "text-blue-800" : "text-gray-400"
          }`}
        >
          Personal Details
        </span>
        <span
          className={`mt-2 text-sm ${
            currentStep > 3 ? "text-green-600" : currentStep === 3 ? "text-blue-800" : "text-gray-400"
          }`}
        >
          ABHA Profile
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
