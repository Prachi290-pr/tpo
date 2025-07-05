import React, { useEffect, useState } from "react";
// import axios from 'axios';
import api from "../../api";

const TableComponent = () => {
  const [confirmCompanies, setConfirmCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchConfirmCompanies();
  }, []);

  const fetchConfirmCompanies = () => {
    api
      .get("remarks/confirmed")
      .then((res) => {
        setConfirmCompanies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleClearFilter = () => {
    setSelectedCompany("");
  };

  const filteredCompanies = confirmCompanies.filter((item) => {
    return selectedCompany === "" || item.companyName === selectedCompany;
  });

  return (
    <div className="p-4 min-h-screen">
      <div className="mb-4 flex justify-between">
        <div className="w-2/3">
          <label className="block mb-2">
            {/* <span className="text-gray-700 mr-4">Filter by Company:</span> */}
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}
              className=" w-2/3 mt-2 p-2 border border rounded-md shadow-lg"
            >
              <option value="">All</option>
              {Array.from(
                new Set(confirmCompanies.map((item) => item.companyName))
              ).map((companyName, index) => (
                <option key={index} value={companyName}>
                  {companyName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={handleClearFilter}
          className="mt-2  bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Clear Filter
        </button>
      </div>
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Company Name
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Location
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Mode Of Communication
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Academic Year
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Visited
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Drive Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((item, index) => (
              <tr key={item.companyId} className="bg-white hover:bg-gray-100">
                <td className="py-2 px-8 border-b sticky left-0 bg-white">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.companyName}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.location}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.mode_of_communication}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.academic_year}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.visited}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.drive_date || 'NA'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
