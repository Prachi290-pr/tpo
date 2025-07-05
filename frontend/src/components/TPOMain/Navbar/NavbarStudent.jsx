import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOutAlt, faEdit, faHome } from '@fortawesome/free-solid-svg-icons';

const NavbarStudent = ({ handleLogout, userName }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const email = localStorage.getItem("email");

  const handleNotificationClick = () => {
    navigate("/StudentNotification");
  };

  const handleHomeClick = () => {
    navigate("/");
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
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Student Dashboard</div>
        <div className="flex items-center space-x-4">
          <button className="text-white px-3 py-2 rounded hover:bg-gray-700" onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHome}  className="mr-2"/>
            Home
          </button>
          <button className="text-white px-3 py-2 rounded hover:bg-gray-700" onClick={handleNotificationClick}>
            <FontAwesomeIcon icon={faBell}  className="mr-2"/>
            Notification
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 flex items-center"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {userName}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white z-20">
                <div
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center"
                >
                  {email}
                </div>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center"
                  onClick={handleProfileUpdateClick}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit Profile
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center"
                  onClick={handleLogoutClick}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarStudent;
