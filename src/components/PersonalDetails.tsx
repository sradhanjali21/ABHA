import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPersonalDetails } from "../redux/slices/personalDetailsSlice";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const personalDetails = useSelector(
    (state: RootState) => state.personalDetails
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState(personalDetails);

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    yearOfBirth: false,
    monthOfBirth: false,
    dayOfBirth: false,
    gender: false,
    phone: false,
    email: false,
    address: false,
    pincode: false,
    state: false,
    district: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({
          ...formData,
          phone: value,
        });
        setFormErrors((prev) => ({ ...prev, phone: false }));
      } else {
        setFormErrors((prev) => ({ ...prev, phone: true }));
      }
    } else if (name === "pincode") {
      if (/^\d*$/.test(value) && value.length <= 6) {
        setFormData({
          ...formData,
          pincode: value,
        });
        setFormErrors((prev) => ({ ...prev, pincode: false }));
      } else {
        setFormErrors((prev) => ({ ...prev, pincode: true }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    const trimmedAddress = formData.address.trim();

    const requiredFields = [
      "firstName",
      "lastName",
      "yearOfBirth",
      "monthOfBirth",
      "dayOfBirth",
      "gender",
      "phone",
      "email",
      "address",
      "pincode",
      "state",
      "district",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: true,
        }));
        hasError = true;
      }
    });

    if (!trimmedAddress) {
      setFormErrors((prev) => ({
        ...prev,
        address: true,
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    dispatch(setPersonalDetails(formData));
    navigate("/CreateABHAaddress");
  };

  useEffect(() => {
    console.log("Current Formdata:", formData);
  }, [formData]);

  return (
    <section className="flex flex-col bg-[#F3F6FF] h-auto">
      <div className="flex flex-col">
        <div className="flex flex-col justify-start">
          <ArrowBackIcon
            className="text-black text-2xl font-bold m-3"
            onClick={() => navigate("/RegistrationForm")}
          />
          <ProgressBar currentStep={2} />
        </div>
        <div className="max-w-xl mx-auto mt-0 mb-4">
          <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
            <div className="bg-[#E8EDFF] rounded-lg p-5 md:mx-0 mx-5">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Name:<span className="text-red-500">*</span>
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    error={formErrors.firstName}
                    helperText={
                      formErrors.firstName &&
                      "Only alphabets and spaces are allowed"
                    }
                  />
                  <TextField
                    name="middleName"
                    label="Middle Name"
                    variant="outlined"
                    value={formData.middleName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    error={formErrors.lastName}
                    helperText={
                      formErrors.lastName &&
                      "Only alphabets and spaces are allowed"
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Date of Birth:<span className="text-red-500">*</span>
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <h6 className="text-sm font-semibold mb-2">year:</h6>
                    <Select
                      name="yearOfBirth"
                      variant="outlined"
                      value={formData.yearOfBirth}
                      onChange={handleChange}
                      fullWidth
                      error={formErrors.yearOfBirth}
                    >
                      <MenuItem value="">
                        <em>Year</em>
                      </MenuItem>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <h6 className="text-sm font-semibold mb-2">Month:</h6>
                    <Select
                      name="monthOfBirth"
                      variant="outlined"
                      value={formData.monthOfBirth}
                      onChange={handleChange}
                      fullWidth
                      error={formErrors.monthOfBirth}
                    >
                      <MenuItem value="">
                        <em>Month</em>
                      </MenuItem>
                      {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <h6 className="text-sm font-semibold mb-2">Day:</h6>

                    <Select
                      name="dayOfBirth"
                      variant="outlined"
                      value={formData.dayOfBirth}
                      onChange={handleChange}
                      fullWidth
                      error={formErrors.dayOfBirth}
                    >
                      <MenuItem value="">
                        <em>Day</em>
                      </MenuItem>
                      {Array.from({ length: 31 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <FormControl component="fieldset">
                  <h2 className="text-xl font-semibold mb-2">
                    Gender:<span className="text-red-500">*</span>
                  </h2>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                  {formErrors.gender && (
                    <p className="text-red-500">Please select a gender</p>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="bg-[#E8EDFF] rounded-lg p-5 md:mx-0 mx-5">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Phone:<span className="text-red-500">*</span>
                </h2>
                <TextField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  error={formErrors.phone}
                  helperText={
                    formErrors.phone && "Please enter a valid 10-digit number"
                  }
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Email:<span className="text-red-500">*</span>
                </h2>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  error={formErrors.email}
                  helperText={
                    formErrors.email && "Please enter a valid email address"
                  }
                  type="email"
                />
              </div>
            </div>
            <div className="bg-[#E8EDFF] rounded-lg p-5 md:mx-0 mx-5">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Address:</h2>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={1}
                  error={formErrors.address}
                  helperText={formErrors.address && "Please enter an address"}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Pincode:<span className="text-red-500">*</span>
                </h2>
                <TextField
                  name="pincode"
                  label="Pincode"
                  variant="outlined"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                  error={formErrors.pincode}
                  helperText={
                    formErrors.pincode && "Please enter a valid 6-digit pincode"
                  }
                />
              </div>
              <div className="mb-4">
                <span className="text-xl text-black font-semibold mb-2">
                  State:<span className="text-red-500">*</span>
                </span>
                <Select
                  id="state-select"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={formErrors.state}
                >
                  <MenuItem value="">Select State</MenuItem>
                  <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                  <MenuItem value="Arunachal Pradesh">
                    Arunachal Pradesh
                  </MenuItem>
                  <MenuItem value="Assam">Assam</MenuItem>
                </Select>
                {formErrors.state && (
                  <p className="text-red-700 text-xs ml-3">
                    Please select a state
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-xl text-black font-semibold mb-2">
                  District:<span className="text-red-500">*</span>
                </span>
                <Select
                  id="district-select"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={formErrors.district}
                >
                  <MenuItem value="">Select District</MenuItem>
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </Select>
                {formErrors.district && (
                  <p className="text-red-700 text-xs ml-3">
                    Please select a district
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="md:w-full w-[90%] bg-[#0743A1] rounded-3xl text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetails;
