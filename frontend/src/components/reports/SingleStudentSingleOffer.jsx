import React, { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx"; // Importing xlsx for exporting to Excel

function SingleStudentSingleOffer() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await api.get("/report/singleStudentSingleOffer");
        console.log("Fetched companies:", res.data);
        setCompanies(res.data.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    getTeamData();
  }, []);

  // Function to export table data to Excel
  const exportToExcel = () => {
    // Creating a new worksheet from the companies data
    const ws = XLSX.utils.json_to_sheet(
      companies.map((company, index) => ({
        "Serial No.": index + 1,
        "Student Name": company.stud_name,
        "Branch": company.branch,
        'College ID': company.clg_id,
        "Company Name": company.company_name,
        "Company Type": company.company_type,
        "Role": company.roles,
        Package: company.package,
      }))
    );

    // Creating a new workbook and adding the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Companies");

    // Saving the Excel file
    XLSX.writeFile(wb, "Company_Placed_Branch_Wise.xlsx");
  };

  return (
    <div className="mx-auto p-4 my-5">
      <div className="max-8xl mx-auto my-0 p-4">
        <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
          <button
            onClick={exportToExcel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Export to Excel
          </button>
          <table className="">
            <thead className="sticky top-0 bg-gray-800 z-8 w-full">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Serial No.
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Student Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Branch
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  College ID
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Company Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Company Type
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Role
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Package
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <tr key={company.id} className="bg-white hover:bg-gray-100">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{company.stud_name}</td>
                    <td className="px-4 py-2 text-center">{company.branch}</td>
                    <td className="px-4 py-2 text-center">{company.clg_id}</td>
                    <td className="px-4 py-2 text-center">{company.company_name}</td>
                    <td className="px-4 py-2 text-center">{company.company_type}</td>
                    <td className="px-4 py-2 text-center">{company.roles}</td>
                    <td className="px-4 py-2 text-center">{company.package}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    No companies available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SingleStudentSingleOffer;
