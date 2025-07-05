/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { writeFile, utils } from "xlsx";
import axios from "axios";
import api from "../../api";


const DataTable = () => {
  const [placedStudents, setPlacedStudents] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlacedStudents();
  }, []);

  const fetchPlacedStudents = async () => {
    try {
      const res = await api.get("/genderwiseplaced/getplacedbygender");
      console.log("Fetched placed students:", res.data);
      setPlacedStudents(res.data);
      if (res.data.length === 0) {
        console.warn("API returned an empty array");
      }
    } catch (err) {
      console.error("Error fetching placed students:", err);
      setError("Failed to fetch placed students. Please try again later.");
    }
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    console.log("Selected Gender:", e.target.value);
  };

  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(filteredStudents);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, "PlacedStudents.xlsx");
  };

  const filteredStudents = placedStudents.filter((item) => {
    return selectedGender === "" || String(item.gender).toLowerCase() === selectedGender;
  });

  console.log("Filtered Students:", filteredStudents);
  console.log("Placed Students:", placedStudents);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gender-wise List</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mb-4  flex">
        <label
          htmlFor="gender"
          className="text-gray-700 text-sm font-bold my-auto  mr-5"
        >
          Select Gender:
        </label>
        <select
          id="gender"
          className="block appearance-none w-4/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          value={selectedGender}
          onChange={handleGenderChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* <option value="other">Other</option> */}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={downloadExcel}
      >
        Download Excel
      </button>

      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
  <table className="">
    <thead className="sticky top-0 bg-gray-800 z-8">
      <tr>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Sr. No.
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          College Id
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          First Name
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Middle Name
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Last Name
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Branch
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Placed Company
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Company Type
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Role Provided
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">Package</th>
      </tr>
    </thead>
    <tbody>
      {filteredStudents.length > 0 ? (
        filteredStudents.map((row, i) => (
          <tr key={i} className="hover:bg-gray-100">
            <td className="py-2 px-8 border-b text-center">{i + 1}</td>
            <td className="py-2 px-8 border-b text-center">{row.clg_id}</td>
            <td className="py-2 px-8 border-b text-center">{row.first_name}</td>
            <td className="py-2 px-8 border-b text-center">{row.middle_name}</td>
            <td className="py-2 px-8 border-b text-center">{row.last_name}</td>
            <td className="py-2 px-8 border-b text-center">{row.branch}</td>
            <td className="py-2 px-8 border-b text-center">{row.gender}</td>
            <td className="py-2 px-8 border-b text-center">{row.company_name}</td>
            <td className="py-2 px-8 border-b text-center">{row.company_type}</td>
            <td className="py-2 px-8 border-b text-center">{row.roles}</td>
            <td className="py-2 px-8 border-b text-center">{row.package_details} LPA</td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="8"
            className="text-center py-2 px-4 border-b border-gray-300"
          >
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default DataTable;
