// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import * as XLSX from "xlsx";
// import api from '../../api';

// const PlacedStudents = () => {
//   const [placedStudents, setPlacedStudents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const extractCompanyIdFromUrl = () => {
//     // Get current URL
//     const currentUrl = window.location.href;

//     // Parse URL and get search params
//     const searchParams = new URLSearchParams(new URL(currentUrl).search);

//     // Get the value of the 'id' parameter
//     const companyId = searchParams.get("companyId");

//     return companyId;
//   };
//   const companyId = extractCompanyIdFromUrl();
//   useEffect(() => {
//     extractCompanyIdFromUrl();
//     fetchPlacedStudents(companyId);
//   }, [companyId]);

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(placedStudents);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Placed Students");
//     XLSX.writeFile(workbook, "PlacedStudents.xlsx");
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const confirmDownload = () => {
//     handleDownloadExcel();
//     closeModal();
//   };

//   const fetchPlacedStudents = (companyId) => {
//     api
//       .get(`driveStatus/getplacedstudents/${companyId}`)
//       .then((res) => {
//         setPlacedStudents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching students:", err);
//       });
//   };

//   const handleDeleteStudent = (studentId) => {
//     api
//       .put(`driveStatus/deletefromplaced/${studentId}`)
//       .then((res) => {
//         setPlacedStudents(
//           placedStudents.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} delelted from placed.`);
//         fetchPlacedStudents(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//   };

//   const handleGoBackToRoundFour = () => {
//     navigate(`/driveStatus/students-for-round-four?companyId=${companyId}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4  flex-wrap">
//         <h1 className="text-2xl font-bold">Placed Students</h1>

//         <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             type="button"
//             aria-expanded={isDropdownOpen ? "true" : "false"}
//           >
//              Rounds Dropdown 
//             <svg
//               className="w-2.5 h-2.5 ms-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
//               <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                 <li>
//                   <Link
//                     to={`/drivestatus/students?&id=${companyId}`}
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     Round 1
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={`/drivestatus/students-for-round-two?companyId=${companyId}`}
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     Round 2
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={`/drivestatus/students-for-round-three?companyId=${companyId}`}
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     Round 3
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={`/drivestatus/students-for-round-four?companyId=${companyId}`}
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     Round 4
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={`/drivestatus/placedStudents?companyId=${companyId}`}
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   >
//                     Placed Students
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         <div>
//           <Link
//             to={`/drivestatus/students?id=${companyId}`}
//             className="bg-blue-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             View Registered Students
//           </Link>
//           <button
//             onClick={handleGoBackToRoundFour}
//             className="bg-gray-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             View Round Four Students
//           </button>
//           <button
//             onClick={openModal}
//             className="bg-green-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             Download Excel
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Sr. No.</th>
//               <th className="py-3 px-6 text-left">TPO ID</th>
//               <th className="py-3 px-6 text-left">Student Name</th>
//               <th className="py-3 px-6 text-left">College ID</th>
//               <th className="py-3 px-6 text-left">Branch</th>
//               <th className="py-3 px-6 text-left">Mobile</th>
//               <th className="py-3 px-6 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {placedStudents.map((student, i) => (
//               <tr key={student.driveid}>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {i + 1}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {student.tpo_id}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {student.full_name}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {student.clg_id}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {student.branch}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {student.mobile}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   <button
//                     onClick={() => handleDeleteStudent(student.driveid)}
//                     className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-black bg-opacity-50 absolute inset-0"></div>
//           <div className="bg-white p-6 rounded-lg z-10">
//             <h2 className="text-lg font-bold mb-4">Confirm Download</h2>
//             <p className="mb-4">
//               Are you sure you want to download the Excel file?
//             </p>
//             <div className="flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-500 text-white py-2 px-4 mr-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDownload}
//                 className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlacedStudents;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import api from '../../api';

const PlacedStudents = () => {
  const [placedStudents, setPlacedStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const extractCompanyIdFromUrl = () => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(new URL(currentUrl).search);
    const companyId = searchParams.get("companyId");
    return companyId;
  };

  const companyId = extractCompanyIdFromUrl();

  useEffect(() => {
    fetchPlacedStudents(companyId);
  }, [companyId]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(placedStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Placed Students");
    XLSX.writeFile(workbook, "PlacedStudents.xlsx");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDownload = () => {
    handleDownloadExcel();
    closeModal();
  };

  const fetchPlacedStudents = (companyId) => {
    api
      .get(`driveStatus/getplacedstudents/${companyId}`)
      .then((res) => {
        setPlacedStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const handleDeleteStudent = (studentId) => {
    api
      .put(`driveStatus/deletefromplaced/${studentId}`)
      .then((res) => {
        setPlacedStudents(
          placedStudents.filter((student) => student.driveid !== studentId)
        );
        console.log(`Student ${studentId} deleted from placed.`);
        fetchPlacedStudents(companyId);
      })
      .catch((err) => {
        console.error(
          `Error moving student ${studentId} back to round one:`,
          err
        );
      });
  };

  const handleGoBackToRoundFour = () => {
    navigate(`/driveStatus/students-for-round-four?companyId=${companyId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h1 className="text-2xl font-bold mr-auto">Placed Students</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              aria-expanded={isDropdownOpen ? "true" : "false"}
            >
              Rounds Dropdown
              <svg
                className="w-2.5 h-2.5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      to={`/drivestatus/students?id=${companyId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Round 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/drivestatus/students-for-round-two?companyId=${companyId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Round 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/drivestatus/students-for-round-three?companyId=${companyId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Round 3
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/drivestatus/students-for-round-four?companyId=${companyId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Round 4
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/drivestatus/placedStudents?companyId=${companyId}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Placed Students
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            to={`/drivestatus/students?id=${companyId}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Registered Students
          </Link>
          <button
            onClick={handleGoBackToRoundFour}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            View Round Four Students
          </button>
          <button
            onClick={openModal}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Sr. No.</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200 ">TPO ID</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200 sticky left-0">Student Name</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200 sticky left-0">College ID</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Branch</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Mobile</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {placedStudents.map((student, i) => (
              <tr key={student.driveid} className="hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {i + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.tpo_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.full_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.clg_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.branch}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.mobile}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteStudent(student.driveid)}
                    className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <h2 className="text-xl mb-4">Download Placed Students Data</h2>
            <p>Are you sure you want to download the Excel file?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacedStudents;

