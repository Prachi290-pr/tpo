// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from 'axios';
// import api from '../../api';

// const StudentsForRoundTwo = () => {
//   const [roundTwoStudents, setRoundTwoStudents] = useState([]);
//   const [selectedStudentIds, setSelectedStudentIds] = useState([]);
//   const [roundThreeStudentIds, setRoundThreeStudentIds] = useState([]);
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
//   // Fetch round 2 students and round 3 student IDs
//   useEffect(() => {
//     extractCompanyIdFromUrl();
//     fetchRoundTwoStudents(companyId);
//     fetchRoundThreeStudentIds(companyId);
//     fetchPlacedStudentIds(companyId);
//   }, [companyId]);

//   //fetching round2 students
//   const fetchRoundTwoStudents = (companyId) => {
//     api
//       .get(`drivestatus/getround2students/${companyId}`)
//       .then((res) => {
//         console.log(res.data);
//         setRoundTwoStudents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching round 2 students:", err);
//       });
//   };

//   //fetching round3 ids
//   const fetchRoundThreeStudentIds = (companyId) => {
//     api
//       .get(`drivestatus/getround3ids/${companyId}`)
//       .then((res) => {
//         const roundThreeIds = res.data.map((item) => item.driveid);
//         setRoundThreeStudentIds(roundThreeIds);
//       })
//       .catch((err) => {
//         console.error("Error fetching round 3 student IDs:", err);
//       });
//   };

//   //fetching placed student ids
//   const fetchPlacedStudentIds = (companyId) => {
//     api
//       .get(`drivestatus/getplacedids/${companyId}`)
//       .then((res) => {
//         const ids = res.data.map((item) => item.driveid);
//         setPlacedStudentIds(ids);
//       })
//       .catch((err) => {
//         console.error("Error fetching placed student IDs:", err);
//       });
//   };

//   const handleCheckboxChange = (studentId) => {
//     if (selectedStudentIds.includes(studentId)) {
//       setSelectedStudentIds(
//         selectedStudentIds.filter((id) => id !== studentId)
//       );
//     } else {
//       setSelectedStudentIds([...selectedStudentIds, studentId]);
//     }
//   };

//   //adding selected students to round3
//   const handleAddStudentsToRoundThree = () => {
//     const newRoundThreeStudentIds = [
//       ...roundThreeStudentIds,
//       ...selectedStudentIds,
//     ];
//     setRoundThreeStudentIds(newRoundThreeStudentIds);

//     // Update the backend to move students to round three
//     selectedStudentIds.forEach((studentId) => {
//       api
//         .put(
//           `drivestatus/updatetooneround/${studentId}`,
//           { round: 3 }
//         )
//         .then((res) => {
//           console.log(`Student ${studentId} moved to round three.`);
//           fetchRoundTwoStudents(companyId);
//         })
//         .catch((err) => {
//           console.error(
//             `Error updating student ${studentId} to round three:`,
//             err
//           );
//         });
//     });
//     setSelectedStudentIds([]);
//   };

//   const handleAddStudentsToPlaced = (studentId) => {
//     // Update the backend to move students to round four
//     api
//       .put(`drivestatus/addtoplaced/${studentId}`)
//       .then((res) => {
//         setPlacedStudentIds(
//           placedStudentIds.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} moved to placed.`);
//         fetchRoundTwoStudents(companyId);
//         fetchPlacedStudentIds(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//     setSelectedStudentIds([]);
//   };

//   const handleDeleteFromPlaced = (studentId) => {
//     api
//       .put(`drivestatus/deletefromplaced/${studentId}`)
//       .then((res) => {
//         setPlacedStudentIds(
//           placedStudentIds.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} moved back to round one.`);
//         fetchRoundTwoStudents(companyId);
//         fetchPlacedStudentIds(companyId);
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//   };

//   const handleDeleteStudent = (studentId) => {
//     api
//       .put(`drivestatus/updatetooneround/${studentId}`, {
//         round: 1,
//       })
//       .then((res) => {
//         setRoundTwoStudents(
//           roundTwoStudents.filter((student) => student.driveid !== studentId)
//         );
//         console.log(`Student ${studentId} moved back to round one.`);
//         // fetchPlacedStudentIds();
//         // fetchRoundTwoStudents();
//         // fetchRoundTwoStudents();
//       })
//       .catch((err) => {
//         console.error(
//           `Error moving student ${studentId} back to round one:`,
//           err
//         );
//       });
//   };

//   const handleViewPlaced = () => {
//     navigate(`/driveStatus/placedStudents?&companyId=${companyId}`);
//   };

//   const handleGoBack = () => {
//     navigate(`/driveStatus/students?&id=${companyId}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4 flex flex-wrap">
//         <h1 className="text-2xl font-bold">Round Two Students</h1>
//         <div>

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

//           <Link
//             to={`/drivestatus/students-for-round-three?companyId=${companyId}`}
//             className="bg-blue-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             View Round Three Students
//           </Link>
//           <button
//             onClick={handleAddStudentsToRoundThree}
//             className="bg-red-400 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
//           >
//             Add Students for Round Three
//           </button>
//           <button
//             onClick={handleGoBack}
//             className="bg-gray-500 text-white py-2 px-4 ml-4 mb-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Go Back to Registered Students
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
//               <th className="py-3 px-6 text-center">Select For Round Three</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {roundTwoStudents.map((student, i) => (
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
//                 <td className="py-3 px-8 text-center whitespace-nowrap">
//                   {roundThreeStudentIds.includes(student.driveid) ? (
//                     <span className="text-green-600 font-semibold">
//                       Added to Round Three
//                     </span>
//                   ) : placedStudentIds.includes(student.driveid) ? (
//                     <span className="text-blue-600 font-semibold">
//                       Added to Placed
//                     </span>
//                   ) : (
//                     <input
//                       type="checkbox"
//                       checked={selectedStudentIds.includes(student.driveid)}
//                       onChange={() => handleCheckboxChange(student.driveid)}
//                     />
//                   )}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {roundThreeStudentIds.includes(student.driveid) ? (
//                     <button
//                       onClick={() => handleDeleteStudent(student.driveid)}
//                       className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     >
//                       Delete
//                     </button>
//                   ) : placedStudentIds.includes(student.driveid) ? (
//                     <React.Fragment>
//                       <button
//                         onClick={() => handleDeleteFromPlaced(student.driveid)}
//                         className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
//                       >
//                         Remove from Placed
//                       </button>
//                       <button
//                         onClick={() => handleViewPlaced(student.driveid)}
//                         className="bg-blue-400 text-white py-1 px-3 ml-1 mb-1 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                       >
//                         View Placed
//                       </button>
//                     </React.Fragment>
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

// export default StudentsForRoundTwo;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api';
import * as XLSX from "xlsx";

const StudentsForRoundTwo = () => {
  const [roundTwoStudents, setRoundTwoStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [roundThreeStudentIds, setRoundThreeStudentIds] = useState([]);
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
    fetchRoundTwoStudents(companyId);
    fetchRoundThreeStudentIds(companyId);
    fetchPlacedStudentIds(companyId);
  }, [companyId]);

  const fetchRoundTwoStudents = (companyId) => {
    api
      .get(`drivestatus/getround2students/${companyId}`)
      .then((res) => {
        setRoundTwoStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching round 2 students:", err);
      });
  };

  const fetchRoundThreeStudentIds = (companyId) => {
    api
      .get(`drivestatus/getround3ids/${companyId}`)
      .then((res) => {
        const roundThreeIds = res.data.map((item) => item.driveid);
        setRoundThreeStudentIds(roundThreeIds);
      })
      .catch((err) => {
        console.error("Error fetching round 3 student IDs:", err);
      });
  };

  const fetchPlacedStudentIds = (companyId) => {
    api
      .get(`drivestatus/getplacedids/${companyId}`)
      .then((res) => {
        const ids = res.data.map((item) => item.driveid);
        setPlacedStudentIds(ids);
      })
      .catch((err) => {
        console.error("Error fetching placed student IDs:", err);
      });
  };

  const handleCheckboxChange = (studentId) => {
    if (selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => id !== studentId)
      );
    } else {
      setSelectedStudentIds([...selectedStudentIds, studentId]);
    }
  };

  const handleAddStudentsToRoundThree = () => {
    const newRoundThreeStudentIds = [
      ...roundThreeStudentIds,
      ...selectedStudentIds,
    ];
    setRoundThreeStudentIds(newRoundThreeStudentIds);

    selectedStudentIds.forEach((studentId) => {
      api
        .put(`drivestatus/updatetooneround/${studentId}`, { round: 3 })
        .then((res) => {
          fetchRoundTwoStudents(companyId);
        })
        .catch((err) => {
          console.error(`Error updating student ${studentId} to round three:`, err);
        });
    });

    setSelectedStudentIds([]);
  };

  const handleAddStudentsToPlaced = (studentId) => {
    api
      .put(`drivestatus/addtoplaced/${studentId}`)
      .then((res) => {
        fetchRoundTwoStudents(companyId);
        fetchPlacedStudentIds(companyId);
      })
      .catch((err) => {
        console.error(`Error moving student ${studentId} to placed:`, err);
      });
  };

  const handleDeleteFromPlaced = (studentId) => {
    api
      .put(`drivestatus/deletefromplaced/${studentId}`)
      .then((res) => {
        fetchRoundTwoStudents(companyId);
        fetchPlacedStudentIds(companyId);
      })
      .catch((err) => {
        console.error(`Error moving student ${studentId} back to round one:`, err);
      });
  };

  const handleDeleteStudent = (studentId) => {
    api
      .put(`drivestatus/updatetooneround/${studentId}`, { round: 1 })
      .then((res) => {
        setRoundTwoStudents(roundTwoStudents.filter((student) => student.driveid !== studentId));
      })
      .catch((err) => {
        console.error(`Error moving student ${studentId} back to round one:`, err);
      });
  };

  const handleViewPlaced = () => {
    navigate(`/driveStatus/placedStudents?&companyId=${companyId}`);
  };

  const handleGoBack = () => {
    navigate(`/driveStatus/students?&id=${companyId}`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      roundTwoStudents.map((student, index) => ({
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Round Two Students</h1>
        <div className="flex space-x-4">
          <div className="relative">
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
              <div className="absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md z-10">
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
          </div>

          <Link
            to={`/drivestatus/students-for-round-three?companyId=${companyId}`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Round Three Students
          </Link>
          <button
            onClick={handleAddStudentsToRoundThree}
            className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Add Students for Round Three
          </button>
          <button
            onClick={downloadExcel}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Download Excel
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Go Back to Registered Students
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
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Select For Round Three</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Select For Placed</th>
              <th className="py-3 px-6 text-left border-b text-black bg-gray-200">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {roundTwoStudents.map((student, index) => (
              <tr
                key={student.driveid}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{index + 1}</span>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{student.tpo_id}</span>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{student.full_name}</span>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{student.clg_id}</span>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{student.branch}</span>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{student.mobile}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-400"
                    checked={selectedStudentIds.includes(student.driveid)}
                    onChange={() => handleCheckboxChange(student.driveid)}
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  {placedStudentIds.includes(student.driveid) ? (
                    <button
                      onClick={() => handleDeleteFromPlaced(student.driveid)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Remove from Placed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddStudentsToPlaced(student.driveid)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Move to Placed
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDeleteStudent(student.driveid)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsForRoundTwo;
