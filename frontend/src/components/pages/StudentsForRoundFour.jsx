// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import api from '../../api';

// const StudentsForRoundFour = () => {
//   const [roundFourStudents, setRoundFourStudents] = useState([]);
//   const [placedStudentIds, setPlacedStudentIds] = useState([]);
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
//     fetchRoundFourStudents(companyId);
//     fetchPlacedStudentIds(companyId);
//   }, [companyId]);

//   const fetchRoundFourStudents = (companyId) => {
//     api
//       .get(`driveStatus/getround4students/${companyId}`)
//       .then((res) => {
//         setRoundFourStudents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching students:", err);
//       });
//   };

//   console.log(roundFourStudents);

//   const fetchPlacedStudentIds = (companyId) => {
//     api
//       .get(`driveStatus/getplacedids/${companyId}`)
//       .then((res) => {
//         const placedIds = res.data.map((item) => item.driveid);
//         setPlacedStudentIds(placedIds);
//         console.log(placedIds);
//       })
//       .catch((err) => {
//         console.error("Error fetching placed student IDs:", err);
//       });
//   };

//   const handleAddStudentsToPlaced = (studentId) => {
//     // Update the backend to move students to round four
//     api
//       .put(`driveStatus/addtoplaced/${studentId}`)
//       .then((res) => {
//         console.log(`Student ${studentId} moved to placed.`);
//         fetchRoundFourStudents(companyId);
//         fetchPlacedStudentIds(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//   };

//   const handleGoBack = () => {
//     navigate(`/driveStatus/students-for-round-three?companyId=${companyId}`);
//   };

//   const handleDeleteStudent = (studentId) => {
//     api
//       .put(`driveStatus/updatetooneround/${studentId}`, {
//         round: 3,
//       })
//       .then((res) => {
//         setRoundFourStudents(
//           roundFourStudents.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} reverted to round three.`);
//         fetchRoundFourStudents(companyId);
//         fetchPlacedStudentIds(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error updating student ${studentId} to round three:`,
//           err
//         );
//       });
//   };

//   const handleDeleteFromPlaced = (studentId) => {
//     api
//       .put(`drivestatus/deletefromplaced/${studentId}`)
//       .then((res) => {
//         setPlacedStudentIds(
//           placedStudentIds.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} moved back to round one.`);
//         fetchRoundFourStudents(companyId);
//         fetchPlacedStudentIds(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4 flex flex-wrap">
//         <h1 className="text-2xl font-bold">Round Four Students</h1>

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
//             to={`/drivestatus/placedStudents?companyId=${companyId}`}
//             className="bg-blue-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 inline-block"
//           >
//             View Placed Students
//           </Link>
//           <button
//             onClick={handleGoBack}
//             className="bg-gray-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Back To Round Three
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
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {roundFourStudents.map((student, i) => (
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
//                   {placedStudentIds.includes(student.driveid) ? (
//                     <button
//                       onClick={() => handleDeleteFromPlaced(student.driveid)}
//                       className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     >
//                       Remove from Placed
//                     </button>
//                   ) : (
//                     <React.Fragment>
//                       <button
//                         onClick={() =>
//                           handleAddStudentsToPlaced(student.driveid)
//                         }
//                         className="bg-green-400 text-white py-1 px-2 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
//                       >
//                         Add to Placed
//                       </button>
//                       <button
//                         onClick={() => handleDeleteStudent(student.driveid)}
//                         className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
//                       >
//                         Delete
//                       </button>
//                     </React.Fragment>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentsForRoundFour;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api';
import * as XLSX from "xlsx";


const StudentsForRoundFour = () => {
  const [roundFourStudents, setRoundFourStudents] = useState([]);
  const [placedStudentIds, setPlacedStudentIds] = useState([]);
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
    fetchRoundFourStudents(companyId);
    fetchPlacedStudentIds(companyId);
  }, [companyId]);

  const fetchRoundFourStudents = (companyId) => {
    api
      .get(`driveStatus/getround4students/${companyId}`)
      .then((res) => {
        setRoundFourStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const fetchPlacedStudentIds = (companyId) => {
    api
      .get(`driveStatus/getplacedids/${companyId}`)
      .then((res) => {
        const placedIds = res.data.map((item) => item.driveid);
        setPlacedStudentIds(placedIds);
      })
      .catch((err) => {
        console.error("Error fetching placed student IDs:", err);
      });
  };

  const handleAddStudentsToPlaced = (studentId) => {
    api
      .put(`driveStatus/addtoplaced/${studentId}`)
      .then((res) => {
        fetchRoundFourStudents(companyId);
        fetchPlacedStudentIds(companyId);
      })
      .catch((err) => {
        console.error(`Error moving student ${studentId} to placed:`, err);
      });
  };

  const handleGoBack = () => {
    navigate(`/driveStatus/students-for-round-three?companyId=${companyId}`);
  };

  const handleDeleteStudent = (studentId) => {
    api
      .put(`driveStatus/updatetooneround/${studentId}`, {
        round: 3,
      })
      .then((res) => {
        setRoundFourStudents(
          roundFourStudents.filter((student) => student.driveid !== studentId)
        );
        fetchRoundFourStudents(companyId);
        fetchPlacedStudentIds(companyId);
      })
      .catch((err) => {
        console.error(`Error updating student ${studentId} to round three:`, err);
      });
  };

  const handleDeleteFromPlaced = (studentId) => {
    api
      .put(`driveStatus/deletefromplaced/${studentId}`)
      .then((res) => {
        setPlacedStudentIds(
          placedStudentIds.filter((student) => student.driveid !== studentId)
        );
        fetchRoundFourStudents(companyId);
        fetchPlacedStudentIds(companyId);
      })
      .catch((err) => {
        console.error(`Error moving student ${studentId} back to round one:`, err);
      });
  };


  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      roundFourStudents.map((student, index) => ({
        "Sr. No.": index + 1,
        "TPO ID": student.tpo_id,
        "Student Name": student.full_name,
        "College ID": student.clg_id,
        Branch: student.branch,
        Mobile: student.mobile       
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students List");

    // Convert workbook to binary and trigger download
    XLSX.writeFile(workbook, "Students_List.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h1 className="text-2xl font-bold">Round Four Students</h1>

        <div className="relative flex items-center space-x-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            Rounds Dropdown
            <svg
              className="w-2.5 h-2.5 ms-3"
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
            <div className="absolute mt-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to={`/drivestatus/students?&id=${companyId}`}
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

          <button
            onClick={downloadExcel}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Download Excel
          </button>

          <Link
            to={`/drivestatus/placedStudents?companyId=${companyId}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 inline-block"
          >
            View Placed Students
          </Link>

          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back To Round Three
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Sr. No.</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">TPO ID</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200 sticky left-0">Student Name</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200 sticky left-0">College ID</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Branch</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Mobile</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {roundFourStudents.map((student, index) => (
              <tr key={student.driveid}>
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{student.tpo_id}</td>
                <td className="py-3 px-6 text-left">{student.full_name}</td>
                <td className="py-3 px-6 text-left">{student.clg_id}</td>
                <td className="py-3 px-6 text-left">{student.branch}</td>
                <td className="py-3 px-6 text-left">{student.mobile}</td>
                <td className="py-3 px-6 text-left">
                  {placedStudentIds.includes(student.driveid) ? (
                    <button
                      onClick={() => handleDeleteFromPlaced(student.driveid)}
                      className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Remove from Placed
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleAddStudentsToPlaced(student.driveid)}
                        className="bg-green-400 text-white py-1 px-2 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Add to Placed
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.driveid)}
                        className="bg-red-400 text-white py-1 px-2 rounded ml-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsForRoundFour;
