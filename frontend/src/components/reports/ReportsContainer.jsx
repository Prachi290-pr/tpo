import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const ReportsContainer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleItemClick = () => {
    setDropdownOpen(false);
  };
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Reports
            </button>
            {dropdownOpen && (
              <div className="absolute  z-20 mt-2 w-64 rounded-lg shadow-lg bg-white ">
                <Link
                  to="/report/placed-students"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Placed Students List
                </Link>
                <Link
                  to="/report/unplaced-students"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Unplaced Students List
                </Link>
                <Link
                  to="/report/company-data-generator"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Company Wise Data
                </Link>
                <Link
                  to="/report/gender-wise-data"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Gender Wise Data
                </Link>

                <Link
                  to="/report/student-data-generator"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Student Generator
                </Link>
                <Link
                  to="/report/erp-report"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  ERP Report
                </Link>
                <Link
                  to="/report/indierp-report"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Student Individual ERP
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportsContainer;
