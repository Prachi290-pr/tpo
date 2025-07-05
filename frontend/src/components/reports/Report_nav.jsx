import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ReportSidebar = ({ children }) => {
 

  return (
    <div className="bg-gray-100 flex">
      {/* Sidebar Below Navbar */}
      <div className="bg-gray-800 text-white w-64 p-4 sticky top-0 left-0 z-10 h-screen">
       
          <div className="mt-2">
            <Link
              to="/report/gender-wise-data"
              className={`${
                location.pathname === "/report/gender-wise-data"
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-gray-200 hover:text-black"
              } block px-3 py-2 text-sm font-medium bg-gray-800`}
            >
              Gender Wise Placed Data
              </Link>

          
            <Link
              to="/report/unplaced-students"
              className={`${
                location.pathname === "/report/unplaced-students"
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-gray-200 hover:text-black"
              } block px-3 py-2 text-sm font-medium bg-gray-800`}
            >
              Unplaced Students List
            </Link>
            <Link
              to="/report/company-wise-data"
              className={`${
                location.pathname === "/report/company-wise-data"
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-gray-200 hover:text-black"
              } block px-3 py-2 text-sm font-medium bg-gray-800`}
            >
              Single Student Multiple Offer
            </Link>

            <Link
              to="/report/singleStudnetSingleOffer"
              className={`${
                location.pathname === "/report/singleStudnetSingleOffer"
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-gray-200 hover:text-black"
              } block px-3 py-2 text-sm font-medium bg-gray-800`}
            >
              Single Student Single Offer
            </Link>

            <Link
              to="/report/companyPlacedBranch"
              className={`${
                location.pathname === "/report/companyPlacedBranch"
                  ? "bg-blue-600 text-white"
                  : "text-white hover:bg-gray-200 hover:text-black"
              } block px-3 py-2 text-sm font-medium bg-gray-800`}
            >
              Company Wise Sheet
            </Link>
          </div>
        
      </div>

      {/* Main Content Area */}
      <div className="p-8 pt-16 flex-1 overflow-hidden">
       {children}
      </div>
    </div>
  );
};

export default ReportSidebar;
