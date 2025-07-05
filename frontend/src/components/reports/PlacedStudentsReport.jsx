/* eslint-disable no-unused-vars */
// src/components/PlacedStudents/PlacedStudents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";
import * as XLSX from "xlsx";

const PlacedStudentsReport = () => {
  const [placedStudents, setPlacedStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetch placed students data when component mounts
  useEffect(() => {
    fetchPlacedStudents();
  }, []);

  // Filter placed students based on the selected academic year
  useEffect(() => {
    if (selectedYear) {
      const filtered = placedStudents.filter(
        (student) => student.batch_date === selectedYear
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(placedStudents);
    }
  }, [selectedYear, placedStudents]);

  // Function to fetch placed students data from the API
  const fetchPlacedStudents = () => {
    api
      .get("/driveresult/getplacedstudents")
      .then((res) => {
        setPlacedStudents(res.data);
        const years = [...new Set(res.data.map((student) => student.batch_date))];
        setAcademicYears(years);
      })
      .catch((err) => {
        console.error("Error fetching placed students:", err);
      });
  };

  // Function to export filtered students data to CSV
  const exportToCSV = () => {
    const headers = [
      "Sr. No.",
      "Student Name",
      "Company Name",
      "Role",
      "Salary",
      "Branch",
      "CLG ID",
      "Company Type",
      "Date of Placement",
      "Passout Year",
    ];
  
    const rows = filteredStudents.map((student, i) => [
      i + 1,
      student.full_name,
      student.company_name,
      student.roles,
      student.package_details + " LPA",
      student.branch,
      student.clg_id,
      student.company_type,
      student.placedDate,
      student.ac_yr,
    ]);
  
    // Combine headers and rows
    const worksheetData = [headers, ...rows];
  
    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Placed Students");
  
    // Export to Excel
    XLSX.writeFile(workbook, "placed_students.xlsx");
  };

  // Handle academic year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Placed Students List</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Note: Please select the academic year first to filter the placed students.
        </p>
        <label className="block text-sm font-medium text-gray-700">
          Select Academic Year
        </label>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Years</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={exportToCSV}
      >
        Export to CSV
      </button>
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-full">
            <tr>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Sr No
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Student Name
              </th>
              {/* <th className="px-4 py-2 text-center text-sm font-medium text-white">TPO ID</th> */}
              <th className="px-4 py-2 text-center text-sm font-medium text-white">Clg ID</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Company Name
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">company Type</th>

              <th className="px-4 py-2 text-center text-sm font-medium text-white">Salary</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">Placement Date</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">Passout Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="py-2 px-8 border-b text-center">
                  {index+1}
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.full_name}
                </td>
                {/* <td className="py-2 px-8 border-b text-center">
                  {student.tpo_id}
                </td> */}
                <td className="py-2 px-8 border-b text-center">
                  {student.clg_id}
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.branch}
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.company_name} ({student.batch_date} | {student.roles})
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.company_type}
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.package_details} LPA
                </td>
                <td className="py-2 px-8 border-b text-center">
                  {student.placedDate}
                </td>
               
                <td className="py-2 px-8 border-b text-center">
                  {student.ac_yr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacedStudentsReport;


//below code is before applying academic year filter
// /* eslint-disable no-unused-vars */
// // src/components/PlacedStudents/PlacedStudents.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../../api";

// const PlacedStudentsReport = () => {
//   const [placedStudents, setPlacedStudents] = useState([]);

//   useEffect(() => {
//     fetchPlacedStudents();
//   }, []);

//   const fetchPlacedStudents = () => {
//     api
//       .get("/driveresult/getplacedstudents")
//       .then((res) => {
//         setPlacedStudents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching placed students:", err);
//       });
//   };

//   const exportToCSV = () => {
//     const headers = [
//       "Student Name",
//       "Company Name",
//       "Salary",
//       "TPO ID",
//       "Branch",
//       "CLG ID",
//     ];
//     const rows = placedStudents.map((student) => [
//       student.full_name,
//       student.company_name,
//       student.package_details,
//       student.branch,
//       student.clg_id,
//       student.tpo_id,
//     ]);

//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Placed Students List\n";
//     csvContent += headers.join(",") + "\n";
//     rows.forEach((rowArray) => {
//       let row = rowArray.join(",");
//       csvContent += row + "\n";
//     });

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "placed_students.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Placed Students List</h1>
//       <button
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         onClick={exportToCSV}
//       >
//         Export to CSV
//       </button>
//       <div className="overflow-x-auto shadow-xl rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="">
//             <tr>
//               <th className="py-2 px-8 border-b bg-gray-200 sticky left-0 z-10 w-16">
//                 Student Name
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">TPO ID</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">Clg ID</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 Company Name
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">Salary</th>
//             </tr>
//           </thead>
//           <tbody>
//             {placedStudents.map((student, index) => (
//               <tr
//                 key={index}
//                 className={`${
//                   index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-100`}
//               >
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.full_name}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.tpo_id}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.clg_id}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.branch}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.company_name}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.package_details} LPA
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           {/* <tbody className="px-4 py-2 text-center text-sm font-medium text-white">
//             {placedStudents.map((student, index) => (
//               <tr
//                 key={index}
//                 className={`${
//                   index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-200`}
//                 // className={index % 2 === 0 ? "bg-white hover:bg-gray-100" : ""}
//               >
//                 <td className="py-2 px-8 border-b sticky left-0 bg-white text-center">
//                   {student.full_name}
//                 </td>
//                 <td className="py-2 px-8 border-b bg-white text-center">
//                   {student.tpo_id}
//                 </td>
//                 <td className="py-2 px-8 border-b bg-white text-center">
//                   {student.clg_id}
//                 </td>
//                 <td className="py-2 px-8 border-b bg-white text-center">
//                   {student.branch}
//                 </td>
//                 <td className="py-2 px-8 border-b bg-white text-center">
//                   {student.company_name}
//                 </td>
//                 <td className="py-2 px-8 border-b bg-white text-center">
//                   {student.package_details} LPA
//                 </td>
//               </tr>
//             ))}
//           </tbody> */}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PlacedStudentsReport;
