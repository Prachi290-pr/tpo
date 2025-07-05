/* eslint-disable no-unused-vars */
// src/components/UnplacedStudents/UnplacedStudents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";

const UnplacedStudents = () => {
  const [unplacedStudents, setUnPlacedStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetchUnplacedStudents();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const filtered = unplacedStudents.filter(
        (student) => student.ac_yr === selectedYear
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(unplacedStudents);
    }
  }, [selectedYear, unplacedStudents]);

  const fetchUnplacedStudents = () => {
    api
      .get("/driveresult/getunplacedstudents")
      .then((res) => {
        setUnPlacedStudents(res.data);
        const years = [...new Set(res.data.map((student) => student.ac_yr))];
        setAcademicYears(years);
      })
      .catch((err) => {
        console.error("Error fetching unplaced students:", err);
      });
  };

  const exportToCSV = () => {
    const headers = [
      "Sr. No.",
      "Student Name",
      "Branch",
      "CLG ID",
      "TPO ID",
      "10th Marks",
      "11th Marks",
      "12th Marks",
      "Degree Percentage",
      "Diploma Percentage",
    ];
    const rows = filteredStudents.map((student,i) => [
      i+1,
      student.full_name,
      student.branch,
      student.clg_id,
      student.tpo_id,
      student.ssc_per,
      student.hsc_per ?? "N/A",
      student.diploma_per ?? "N/A",
      student.degree_per ?? "-",
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Unplaced Students List\n";
    csvContent += headers.join(",") + "\n";
    rows.forEach((rowArray) => {
      let row = rowArray.join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "unplaced_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Unplaced Students List</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Note: Please select the academic year first to filter the unplaced students.
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
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Sr. No.
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Student Name
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">TPO ID</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">CLG ID</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                10th Marks
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                12th Marks
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Diploma Percentage
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Degree Percentage
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Passout Year
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 ">
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white hover:bg-gray-100" : "bg-gray-50 hover:bg-gray-100"}
              >
                <td className="border px-4 py-2">{index+1}</td>
                <td className="border px-4 py-2">{student.full_name || '-'}</td>
                <td className="border px-4 py-2">{student.tpo_id || '-'}</td>
                <td className="border px-4 py-2">{student.clg_id || '-'}</td>
                <td className="border px-4 py-2">{student.branch || '-'}</td>
                <td className="border px-4 py-2">{student.ssc_per || '-'}</td>
                <td className="border px-4 py-2">{student.hsc_per ?? "N/A"}</td>
                <td className="border px-4 py-2">
                  {student.diploma_per ?? "N/A"}
                </td>
                <td className="border px-4 py-2">{student.degree_per ?? "-"}</td>
                <td className="border px-4 py-2">{student.ac_yr ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnplacedStudents;


// below code is before apply ac filter
// /* eslint-disable no-unused-vars */
// // src/components/UnplacedStudents/UnplacedStudents.jsx
// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../../api";

// const UnplacedStudents = () => {
//   const [unplacedStudents, setUnPlacedStudents] = useState([]);

//   useEffect(() => {
//     fetchPlacedStudents();
//   }, []);

//   const fetchPlacedStudents = () => {
//     api
//       .get("/driveresult/getunplacedstudents")
//       .then((res) => {
//         setUnPlacedStudents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching companies:", err);
//       });
//   };

//   const exportToCSV = () => {
//     const headers = [
//       "Student Name",
//       "Branch",
//       "CLG ID",
//       "TPO ID",
//       "10th Marks",
//       "11th Marks",
//       "12th Marks",
//       "Degree Percentage",
//       "Diploma Percentage",
//     ];
//     const rows = unplacedStudents.map((student) => [
//       student.full_name,
//       student.branch,
//       student.clg_id,
//       student.tpo_id,
//       student.ssc_per,
//       student.hsc_per,
//       student.diploma_per ?? "N/A",
//       student.degree_per,
//     ]);

//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Unplaced Students List\n";
//     csvContent += headers.join(",") + "\n";
//     rows.forEach((rowArray) => {
//       let row = rowArray.join(",");
//       csvContent += row + "\n";
//     });

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "unplaced_students.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Unplaced Students List</h1>
//       <button
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         onClick={exportToCSV}
//       >
//         Export to CSV
//       </button>
//       <div className="overflow-x-auto shadow-xl rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 Student Name
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">TPO ID</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">CLG ID</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 10th Marks
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 12th Marks
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 Diploma Percentage
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-white">
//                 Degree Percentage
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 ">
//             {unplacedStudents.map((student, index) => (
//               <tr
//                 key={index}
//                 className={index % 2 === 0 ? " hover:bg-gray-100" : ""}
//               >
//                 <td className="border px-4 py-2">{student.full_name || '-'}</td>
//                 <td className="border px-4 py-2">{student.tpo_id || '-'}</td>
//                 <td className="border px-4 py-2">{student.clg_id || '-'}</td>
//                 <td className="border px-4 py-2">{student.branch || '-'}</td>
//                 <td className="border px-4 py-2">{student.ssc_per || '-'}</td>  
//                 <td className="border px-4 py-2">{student.hsc_per ?? "N/A"}</td>
//                 <td className="border px-4 py-2">
//                   {student.diploma_per ?? "N/A"}
//                 </td>
//                 <td className="border px-4 py-2">{student.degree_per ?? "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UnplacedStudents;
