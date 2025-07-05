/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import api from "../../api";

const TpoTable = () => {
  const columns = [
    "Sr. no",
    "College ID",
    "First Name",
    "Middle Name",
    "Last Name",
    "Branch",
    "Contact Number",
    "College Email",
    "Company",
    "Company Type",
    "Role",
    "Package",
    "Placed Count",
  ];

  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    fetchPlacedStudents();
  }, []);

  const fetchPlacedStudents = () => {
    api
      .get(`/companywiseplaced/getplacedbycompany`)
      .then((res) => {
        setPlacedStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching placed students:", err);
      });
  };

  const exportToExcel = () => {
    // Define the headers matching the table columns
    const headers = [
      "Sr. no",
      "College ID",
      "First Name",
      "Middle Name",
      "Last Name",
      "Branch",
      "Contact Number",
      "College Email",
      "Company",
      "Company Type",
      "Role",
      "Package",
      "Placed Count",
    ];
  
    // Transform the data to match the table's structure
    const data = placedStudents.map((row, index) => ({
      "Sr. no": String(row.clg_id).trim() === "Total" ? "" : index + 1,
      "College ID": row.clg_id,
      "First Name": row.first_name,
      "Middle Name": row.middle_name,
      "Last Name": row.last_name,
      "Branch": row.branch,
      "Contact Number": row.mobile,
      "College Email": row.email_id,
      "Company": row.company_name,
      "Company Type": row.company_type,
      "Role": row.roles,
      "Package": row.package_details + (row.package_details !== "" ? " LPA" : ""),
      "Placed Count": row.placed_count,
    }));
  
    // Prepend headers to the data
    const worksheetData = [headers, ...data.map((row) => headers.map((key) => row[key]))];
  
    // Generate the worksheet and workbook
    const ws = utils.aoa_to_sheet(worksheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "TPO Data");
  
    // Save the workbook
    writeFile(wb, "tpo_data.xlsx");
  };
  

  return (
    <div className="container">
      <h1 className="text-2xl font-bold my-4">Student Offer</h1>
      <div className="action-button flex space-x-4 mb-4">
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-hidden">
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
  <table className="">
    <thead className="sticky top-0 bg-gray-800 z-8">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-4 py-2 text-center text-sm font-medium text-white"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {placedStudents.map((row, i) => (
        <tr
          key={row.tpo_id}
          className="bg-gray-100 hover:bg-gray-200 transition duration-300 place-content-center"
        >
        <td className="px-4 py-2 text-center">{String(row.clg_id).trim()=='Total'?'':i + 1}</td>
          {/* <td className="py-2 px-8 border-b text-center">{i + 1}</td> */}
          <td className="py-2 px-8 border-b text-center">{row.clg_id}</td>
          <td className="py-2 px-8 border-b text-center">{row.first_name}</td>
          <td className="py-2 px-8 border-b text-center">{row.middle_name}</td>
          <td className="py-2 px-8 border-b text-center">{row.last_name}</td>
          <td className="py-2 px-8 border-b text-center">{row.branch}</td>
          <td className="py-2 px-8 border-b text-center">{row.mobile}</td>
          <td className="py-2 px-8 border-b text-center">{row.email_id}</td>
          <td className="py-2 px-8 border-b text-center">{row.company_name}</td>
          <td className="py-2 px-8 border-b text-center">{row.company_type}</td>
          <td className="py-2 px-8 border-b text-center">{row.roles}</td>
          <td className="py-2 px-8 border-b text-center">{row.package_details} {row.package_details!=''?'LPA':''}</td>
          <td className="py-2 px-8 border-b text-center">{row.placed_count}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
    </div>


    </div>
  );
};

export default TpoTable;