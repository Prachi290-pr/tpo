// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [token, setToken] = useState("");
//   const [user_id, setUID] = useState(0);
//   const [usertype, setUserType] = useState(0);
//   const [isRegister, setIsRegister] = useState(-1);
//   const [email, setEmail] = useState("");
//   const [isTruncated, setIsTruncated] = useState(true); 

//   const toggleTruncate = () => {
//     setIsTruncated(!isTruncated);
//   };
//   // useEffect(() => {
//   //   const storedToken = window.localStorage.getItem("token");

//   //   if (storedToken) {
//   //     setToken(storedToken);

//   //     const uid = window.localStorage.getItem("uid");
//   //     const user_type = window.localStorage.getItem("user_type");
//   //     const isRegister = window.localStorage.getItem("isregister");
//   //     if (storedToken && uid && user_type && isRegister) {
//   //       setUID(parseInt(uid));
//   //       setUserType(parseInt(user_type));
//   //       setIsRegister(parseInt(isRegister));

//   //       const studentdetail = async () => {
//   //         try {
//   //           const response = await axios
//   //             .post(`http://localhost:8081/api/register/getemail/${uid}`)
//   //             .then((response) => {
//   //               console.log("Successfully received:", response.data);
//   //               setEmail(response.data);
//   //             });
//   //         } catch (err) {
//   //           console.log(err);
//   //           console.log(err.message);
//   //         }
//   //       };
//   //       studentdetail();
//   //     }
//   //   }
//   // }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const handleSignOut = () => {
//     localStorage.clear();
//     window.location.reload();
//     navigate("/");
//   };

//   const renderNavLinks = () => {
//     if (usertype === 1) {
//       return (
//         <NavLink
//           to="/"
//           exact
//           className={`${
//             location.pathname === "/"
//               ? "bg-gray-900 text-white"
//               : "text-gray-300 hover:bg-gray-700 hover:text-white"
//           } px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-gray-900"
//         >
//           Dashboard
//         </NavLink>
//       );
//     } else if (usertype === 2) {
//       return (
//         <>
//           <NavLink
//             to="/"
//             exact
//             className={`${
//               location.pathname === "/"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Dashboard
//           </NavLink>
//           <NavLink
//             to="/jobposting"
//             className={`${
//               location.pathname === "/jobposting"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Job Postings
//           </NavLink>
//           <NavLink
//             to="/addcompanies"
//             className={`${
//               location.pathname === "/addcompanies"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Add Companies
//           </NavLink>
//           <NavLink
//             to="/confirmcompanies"
//             className={`${
//               location.pathname === "/confirmcompanies"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Confirm Companies
//           </NavLink>
//           <NavLink
//             to="/drivestatus"
//             className={`${
//               location.pathname === "/drivestatus"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Drive Status
//           </NavLink>
//           <NavLink
//             to="/announcement"
//             className={`${
//               location.pathname === "/announcement"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Notification
//           </NavLink>
//           <NavLink
//             to="/forum"
//             className={`${
//               location.pathname === "/forum"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Forums
//           </NavLink>
//           <NavLink
//             to="/hrcontact"
//             className={`${
//               location.pathname === "/hrcontact"
//                 ? "bg-gray-900 text-white"
//                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
//             } px-3 py-2 rounded-md text-sm font-medium`}
//             activeClassName="bg-gray-900"
//           >
//             Hr Contact
//           </NavLink>
//         </>
//       );
//     } else {
//       return (
//         <NavLink
//           to="/"
//           exact
//           className={`${
//             location.pathname === "/"
//               ? "bg-gray-900 text-white"
//               : "text-gray-300 hover:bg-gray-700 hover:text-white"
//           } px-3 py-2 rounded-md text-sm font-medium`}
//           activeClassName="bg-gray-900"
//         >
//           Dashboard
//         </NavLink>
//       );
//     }
//   };

//   return (
//     <nav className="bg-gray-800 sticky top-0 z-50">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               type="button"
//               onClick={toggleMobileMenu}
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded={isMobileMenuOpen ? "true" : "false"}
//             >
//               <span className="absolute -inset-0.5"></span>
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="block h-6 w-6"
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
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <div className="ml-3 relative">
//               {token == "" || user_id == 0 ? (
//                 <>
//                   <NavLink
//                     to="/"
//                     className={`${
//                       location.pathname === "/login"
//                         ? "bg-gray-900 text-white"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     } px-3 py-2 rounded-md text-sm font-medium`}
//                     activeClassName="bg-gray-900"
//                   >
//                     Login
//                   </NavLink>
//                   <NavLink
//                     to="/register"
//                     className={`${
//                       location.pathname === "/register"
//                         ? "bg-gray-900 text-white"
//                         : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                     } px-3 py-2 rounded-md text-sm font-medium`}
//                     activeClassName="bg-gray-900"
//                   >
//                     Register
//                   </NavLink>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     onClick={toggleProfileMenu}
//                     className="bg-gray-800 flex text-sm  rounded-full focus:outline-none focus:ring-2 focus:ring-white"
//                     id="user-menu-button"
//                     aria-expanded={isProfileMenuOpen ? "true" : "false"}
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="h-8 w-8 rounded-full"
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       alt=""
//                     />
//                   </button>
//                   {isProfileMenuOpen && (
//                     <div
//                       className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
//                       role="menu"
//                       aria-orientation="vertical"
//                       aria-labelledby="user-menu-button"
//                       tabIndex="-1"
//                     >
//                       <NavLink
//                   to="#"
//                   className="block px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100 truncate"
//                   title={email[0].email_id} // Show full email on hover
//                   role="menuitem"
//                 >
//                   {isTruncated ? `${email[0].email_id.slice(0, 20)}...` : email[0].email_id}
//                 </NavLink>
//                       <NavLink
//                         to="/profile1"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         Your Profile
//                       </NavLink>
//                       <NavLink
//                         onClick={handleSignOut}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         Sign out
//                       </NavLink>
//                     </div>
//                   )}
//                 </>
//               )}
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

// export default Navbar;
