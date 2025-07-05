import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOutAlt, faEdit, faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '/logo-main.webp';

const Navbar = ({ handleLogout, uName }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const email = localStorage.getItem("email");

    // Extract username by removing everything after and including '@'
  const userName = email ? email.split('@')[0] : "User";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);
  const [isTestDrop, setisTestDrop] = useState(false);
  const [isReportDropdown, setIsReportDropDown] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setDropdownOpen(false);

  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setIsReportDropDown(false);
  };

  const toggleReportDropdown = () => {
    setIsReportDropDown(!isReportDropdown);
  }

  const toggleMasterDropdown = () => {
    setIsMasterDropdownOpen(!isMasterDropdownOpen);
  };

  const toggleTestDropdown = () => {
    setisTestDrop(!isTestDrop);
  };

  const handleNotificationClick = () => {
    navigate("/StudentNotification");
    setDropdownOpen(false);

  };

  const handleNotificationInterClick = () => {
    navigate("/StudentNotificationintership");
    setDropdownOpen(false);

  };

  const handleRegisteredCompaniesClick = () => {
    navigate("/registeredcompanies");
    setDropdownOpen(false);

  };

  const handleAptitudeTestClick = () => {
    navigate("/aptitude-test");
    setDropdownOpen(false);

  };

  const handleMachineTest = () => {
    navigate("/machineTestList");
    setDropdownOpen(false);

  };

  const handleMachineTestHistory = () => {
    navigate("/mysubmissions");
    setDropdownOpen(false);
  };

  
  const handleAptitudeTestHistoryClick = () => {
    navigate("/history");
    setDropdownOpen(false);

  };

  const handleMockInterviewClick = () => {
    navigate("/mock-interview");
    setDropdownOpen(false);

  };

  const handleMockInterviewHistoryClick = () => {
    navigate("/mock-interview-history");
    setDropdownOpen(false);

  };

  const handleHomeClick = () => {
    navigate("/");
    setDropdownOpen(false);

  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileUpdateClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
    
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    handleLogout();
    setDropdownOpen(false);

  };

  const renderLinks = () => {
    return (
      <>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleHomeClick}>
            Home
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleRegisteredCompaniesClick}>
            Registered Companies
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleNotificationClick}>
            Job Notification
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleNotificationInterClick}>
            Internship Notification
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleAptitudeTestClick}>
            Aptitude Test
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleAptitudeTestHistoryClick}>
            Aptitude Test History
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleMachineTest}>
            Machine Test
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleMachineTestHistory}>
            Machine Test History
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleMockInterviewClick}>
            Mock Interview
          </button>
          <button className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full" onClick={handleMockInterviewHistoryClick}>
            Mock Interview History
          </button>
          <div className="relative w-full sm:w-full">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 rounded bg-inherit hover:bg-gray-700 focus:outline-none focus:bg-gray-700 flex items-center justify-center w-full sm:w-full"
            > 
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {userName}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white z-20">
                <div
                  className="block px-4 py-2 text-gray-800  hover:bg-gray-200 w-full text-left flex items-center"
                >
                  {email}
                </div>
                <button
                  className="block px-4 py-2 text-gray-800 bg-inherit hover:bg-gray-200 w-full text-left flex items-center"
                  onClick={handleProfileUpdateClick}
                >
                  Edit Profile
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 bg-inherit hover:bg-gray-200 w-full text-left flex items-center"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
      </>
    );
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-shrink-0">
          {/* <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          /> */}
         {/* <div className="text-lg font-bold">Student Dashboard</div>
          */}
               <img
              className="h-32 w-auto filter invert  brightness-0"
              src={logo}
              alt="TPO Dashboard"
            />

        </div>
        <div className="hidden sm:flex sm:items-center">
          <div className="flex space-x-4">{renderLinks()}</div>
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-700 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <svg
              className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {isMobileMenuOpen && (
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">{renderLinks()}</div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;
