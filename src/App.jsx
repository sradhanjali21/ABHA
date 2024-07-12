import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import OtpPage from "./components/OtpPage";
import PersonalDetails from "./components/PersonalDetails";
import CreateABHAaddress from "./components/CreateABHAaddress";
import CreatePassword from "./components/CreatePassword";
import ABHAdashboard from "./components/ABHAdashboard";
import Start from "./components/Start";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/OtpPage" element={<OtpPage />} />
          <Route path="/PersonalDetails" element={<PersonalDetails />} />
          <Route path="/CreateABHAaddress" element={<CreateABHAaddress />} />
          <Route path="/CreatePassword" element={<CreatePassword />} />
          <Route path="/Dashboard" element={<ABHAdashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
