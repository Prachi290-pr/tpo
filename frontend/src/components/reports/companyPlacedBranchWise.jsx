import React, { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx"; // Importing xlsx for exporting to Excel

function CompanyPlacedBranchWise() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await api.get("/report/companywiseBranchWise");
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
        "Serial No.": String(company.name).trim()=='Total'?'':index + 1 ,
        "Company Name": company.name,
        CS: company.CS,
        IT: company.IT,
        "AI&DS": company.AIDS,
        "Total": company.Total,
        "COMPANY TYPE": company.company_type,
        "ROLES OFFERED": company.roles,
        Package: company.Package,
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
        <div className="overflow-x-auto">
          <button
            onClick={exportToExcel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Export to Excel
          </button>
          <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full">
                <thead className="bg-gray-200 sticky top-0 z-8">
                  <tr>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      Serial No.
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      Company Name
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      CS
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      IT
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      AIDS
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      Total
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      Company Type
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">
                      Roles Offered
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
                        <td className="px-4 py-2 text-center">{String(company.name).trim()=='Total'?'':index + 1}</td>
                        <td className="px-4 py-2 text-center">{company.name}</td>
                        <td className="px-4 py-2 text-center">{company.CS}</td>
                        <td className="px-4 py-2 text-center">{company.IT}</td>
                        <td className="px-4 py-2 text-center">{company.AIDS}</td>
                        <td className="px-4 py-2 text-center">{company.Total}</td>
                        <td className="px-4 py-2 text-center">{company.company_type}</td>
                        <td className="px-4 py-2 text-center">{company.roles}</td>
                        <td className="px-4 py-2 text-center">{company.Package}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-2 text-center">
                        No companies available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default CompanyPlacedBranchWise;
