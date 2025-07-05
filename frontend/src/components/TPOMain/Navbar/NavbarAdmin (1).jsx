import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarAdmin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMasterDropdown = () => {
    setIsMasterDropdownOpen(!isMasterDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Function clicked!!!");
    window.localStorage.clear();
    window.location.href = "/"; // Navigate to the root URL in the current tab/window
  };

  const renderLinks = () => {
    return (
      <>
        <Link
          to="/"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Dashboard
        </Link>
        <div className="relative">
          <button
            onClick={toggleMasterDropdown}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-200 hover:text-black"
          >
            Master
          </button>
          {isMasterDropdownOpen && (
            <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
              <Link
                to="/hrcontact"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/hrcontact"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2  text-sm font-medium bg-gray-800`}
              >
                Hr Contact
              </Link>
              <Link
                to="/jobposting"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/jobposting"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2  text-sm font-medium bg-gray-800`}
              >
                Job Postings
              </Link>
              <Link
                to="/driveStatus"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/driveStatus"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Drive Status
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/companyremark"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/companyremark"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Company Remark
        </Link>
        <Link
          to="/recontact"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/recontact"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Recontact
        </Link>
        <Link
          to="/companyconfirm"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/companyconfirm"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Confirm Companies
        </Link>
        <Link
          to="/report"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/report"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Reports
        </Link>
        <Link
          to="/forums"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/forums"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Forums
        </Link>
        <Link
          to="/announcements"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/announcements"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Announcements
        </Link>
        <Link
          to="/admin-aptitude"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/admin-aptitude"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Admin Aptitude Test
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white block px-3 py-2 rounded-md text-sm font-medium"
        >
          Log out
        </button>
      </>
    );
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
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

export default NavbarAdmin;

// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// const NavbarAdmin = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const renderNavLinks = () => {
//     return (
//       <>
//         <NavLink
//           to="/"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/hrcontact"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/hrcontact"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Hr Contact
//         </NavLink>
//         <NavLink
//           to="/companyremark"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/companyremark"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Company Remark
//         </NavLink>
//         <NavLink
//           to="/recontact"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/recontact"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Recontact
//         </NavLink>
//         <NavLink
//           to="/companyconfirm"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/companyconfirm"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Confirm Companies
//         </NavLink>
//         <NavLink
//           to="/jobposting"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/jobposting"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Job Postings
//         </NavLink>
//         <NavLink
//           to="/forums"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/forums"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Forums
//         </NavLink>
//         <NavLink
//           to="/announcements"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/announcements"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Announcements
//         </NavLink>
//         <NavLink
//           to="/driveStatus"
//           onClick={closeMobileMenu}
//           className={`${
//             location.pathname === "/driveStatus"
//               ? "bg-blue-600 text-white"
//               : "text-white hover:bg-gray-200"
//           } block px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-indigo-600"
//         >
//           Drive Status
//         </NavLink>
//       </>
//     );
//   };

//   return (
//     <nav className="bg-white sticky top-0 z-50 shadow-lg">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               type="button"
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded={isMobileMenuOpen ? "true" : "false"}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//               <svg
//                 className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex-shrink-0">
//               <img
//                 className="block h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                 alt="Your Company"
//               />
//             </div>
//             <div className="hidden sm:block sm:ml-6">
//               <div className="flex space-x-4">{renderNavLinks()}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isMobileMenuOpen && (
//         <div className="sm:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1">{renderNavLinks()}</div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavbarAdmin;
