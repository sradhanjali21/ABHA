
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/rootSlice";
import { resetUserState } from "../redux/slices/userSlice";
import { resetPhoneNumber } from "../redux/slices/NumberSlice";

const ABHAdashboard = () => {
  const dispatch = useDispatch();

  const personalDetails = useSelector(
    (state: RootState) => state.personalDetails
  );

  const navigate = useNavigate();

  const handleGoBack = () => {
    dispatch(resetState()); 
    dispatch(resetUserState()); 
    dispatch(resetPhoneNumber()); 
    navigate("/");
  };

  return (
    <div className="text-xl flex flex-col md:justify-center items-center h-screen p-4">
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <h1 className="text-xl">ABHA Dashboard</h1>
        <button
          onClick={handleGoBack}
          className="ml-4 bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Go Back to Homepage
        </button>
      </div>{" "}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 underline">
          Personal Details
        </h2>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <strong>First Name:</strong> {personalDetails.firstName}
          </div>
          <div>
            <strong>Middle Name:</strong> {personalDetails.middleName}
          </div>
          <div>
            <strong>Last Name:</strong> {personalDetails.lastName}
          </div>
          <div>
            <strong>Date of Birth:</strong>{" "}
            {`${personalDetails.yearOfBirth}-${personalDetails.monthOfBirth}-${personalDetails.dayOfBirth}`}
          </div>
          <div>
            <strong>Gender:</strong> {personalDetails.gender}
          </div>
          <div>
            <strong>Phone:</strong> {personalDetails.phone}
          </div>
          <div>
            <strong>Email:</strong> {personalDetails.email}
          </div>
          <div>
            <strong>Address:</strong> {personalDetails.address}
          </div>
          <div>
            <strong>Pincode:</strong> {personalDetails.pincode}
          </div>
          <div>
            <strong>State:</strong> {personalDetails.state}
          </div>
          <div>
            <strong>District:</strong> {personalDetails.district}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABHAdashboard;
