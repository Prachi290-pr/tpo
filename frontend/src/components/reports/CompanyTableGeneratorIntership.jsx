/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import api from "../../api";
import axios from "axios";

const CompanyTableGeneratorIntership = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const fields = [
    "job_description",
    "package_details",
    "roles",
    "criteria_10th",
    "criteria_12th",
    "diploma_criteria",
    "deg_criteria",
    "academic_year",
    "eligible_branches",
  ];

  const fieldToColumnName = {
    job_description: "Job Description",
    package_details: "Package Details",
    roles: "Roles",
    criteria_10th: "10th Criteria",
    criteria_12th: "12th Criteria",
    diploma_criteria: "Diploma Criteria",
    deg_criteria: "Degree Criteria",
    academic_year: "Academic Year",
    eligible_branches: "Eligible Branches",
  };

  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = () => {
    api
      .get(`/companygen/getcompanygenIntership`)
      .then((res) => {
        setCompanyData(res.data);
        const years = [...new Set(res.data.map((company) => company.academic_year))];
        setAcademicYears(years);
      })
      .catch((err) => {
        console.error("Error fetching placed students:", err);
      });
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((item) => item !== field)
        : [...prev, field]
    );
  };

  const handleGenerate = () => {
    const filteredCompanies = companyData.filter(
      (company) => !selectedYear || company.academic_year === selectedYear
    );
    setFilteredCompanies(filteredCompanies);
  };

  const handleExport = () => {
    const exportData = filteredCompanies.map((company, index) => {
      const rowData = {
        "S.No": index + 1,
        company_id: company.company_id,
        company_name: company.company_name,
      };
      selectedFields.forEach((field) => {
        rowData[fieldToColumnName[field]] = company[field];
      });
      return rowData;
    });
    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Companies");
    writeFile(wb, "companies.xlsx");
  };

  const handleClearFilters = () => {
    setSelectedFields([]);
    setSelectedYear("");
    setFilteredCompanies([]);
  };

  const handleSelectAll = () => {
    setSelectedFields([
      "job_description",
      "package_details",
      "roles",
      "criteria_10th",
      "criteria_12th",
      "diploma_criteria",
      "deg_criteria",
      "academic_year",
      "eligible_branches",
    ]);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ml-2">Generate Intership Company Table</h1>
      <button
        onClick={handleExport}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">
          Note: Please clear all filters before selecting other academic year.
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
      <div className="w-full p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Select Fields</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {fields.map((field) => (
            <div key={field} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={field}
                onChange={() => handleCheckboxChange(field)}
                checked={selectedFields.includes(field)}
                className="mr-2"
              />
              <label className="text-sm">{fieldToColumnName[field]}</label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate Table
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Clear Filters
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Select All
          </button>
        </div>
      </div>

      {filteredCompanies.length > 0 && (
       <div className="overflow-x-auto overflow-y-auto max-h-[500px] shadow-xl rounded-lg mt-4">
       <table className="">
         <thead className="w-full bg-white sticky top-0 z-8">
           <tr className="bg-gray-800 text-center">
             <th className="px-4 py-2 text-center text-sm font-medium text-white">Sr.No.</th>
             <th className="px-4 py-2 text-center text-sm font-medium text-white">
               Company Name
             </th>
             {selectedFields.map((field) => (
               <th
                 key={field}
                 className="px-4 py-2 text-center text-sm font-medium text-white"
               >
                 {fieldToColumnName[field]}
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {filteredCompanies.map((company, index) => (
             <tr
               key={company.company_id}
               className="hover:bg-gray-100 text-center"
             >
               <td className="py-2 px-8 border-b text-center">
                 {index + 1}
               </td>
               <td className="py-2 px-8 border-b text-center">
                 {company.company_name}
               </td>
               {selectedFields.map((field) => (
                 <td key={field} className="py-2 px-8 border-b text-center">
                   {company[field]}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
      )}
    </div>
  );
};

export default CompanyTableGeneratorIntership;


//below code is without academic filter code
// // /* eslint-disable no-unused-vars */
// // import React, { useState, useEffect } from "react";
// // import { utils, writeFile } from "xlsx";
// // import api from "../../api";
// // import axios from "axios";

// // const CompanyTableGeneratorIntership = () => {
// //   const [selectedFields, setSelectedFields] = useState([]);
// //   const [companies, setCompanies] = useState([]);

// //   const fields = [
// //     "job_description",
// //     "package_details",
// //     "roles",
// //     "criteria_10th",
// //     "criteria_12th",
// //     "diploma_criteria",
// //     "deg_criteria",
// //     "academic_year",
// //     "eligible_branches",
// //   ];

// //   const fieldToColumnName = {
// //     job_description: "Job Description",
// //     package_details: "Package Details",
// //     roles: "Roles",
// //     criteria_10th: "10th Criteria",
// //     criteria_12th: "12th Criteria",
// //     diploma_criteria: "Diploma Criteria",
// //     deg_criteria: "Degree Criteria",
// //     academic_year: "Academic Year",
// //     eligible_branches: "Eligible Branches",
// //   };

// //   const [companyData, setCompanyData] = useState([]);

// //   useEffect(() => {
// //     fetchCompanyData();
// //   }, []);

// //   const fetchCompanyData = () => {
// //     api
// //       .get(`/companygen/getcompanygen`)
// //       .then((res) => {
// //         setCompanyData(res.data);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching placed students:", err);
// //       });
// //   };

// //   const handleCheckboxChange = (field) => {
// //     setSelectedFields((prev) =>
// //       prev.includes(field)
// //         ? prev.filter((item) => item !== field)
// //         : [...prev, field]
// //     );
// //   };

// //   const handleGenerate = () => {
// //     setCompanies(companyData);
// //   };

// //   const handleExport = () => {
// //     const exportData = companies.map((company, index) => {
// //       const rowData = {
// //         "S.No": index + 1,
// //         company_id: company.company_id,
// //         company_name: company.company_name,
// //       };
// //       selectedFields.forEach((field) => {
// //         rowData[fieldToColumnName[field]] = company[field];
// //       });
// //       return rowData;
// //     });
// //     const ws = utils.json_to_sheet(exportData);
// //     const wb = utils.book_new();
// //     utils.book_append_sheet(wb, ws, "Companies");
// //     writeFile(wb, "companies.xlsx");
// //   };

// //   const handleClearFilters = () => {
// //     setSelectedFields([]);
// //     // setFilteredCompanies([]);
// //   };

// //   const handleSelectAll = () => {
// //     setSelectedFields([
// //       "job_description",
// //       "package_details",
// //       "roles",
// //       "criteria_10th",
// //       "criteria_12th",
// //       "diploma_criteria",
// //       "deg_criteria",
// //       "academic_year",
// //       "eligible_branches",
// //     ]);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4 ml-2">Generate Company Table</h1>
// //       <button
// //         onClick={handleExport}
// //         className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //       >
// //         Export to Excel
// //       </button>
// //       <div className="w-full p-4 bg-gray-100 rounded-lg">
// //         <h2 className="text-xl font-semibold mb-2">Select Fields</h2>
// //         <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
// //           {fields.map((field) => (
// //             <div key={field} className="flex items-center mb-2">
// //               <input
// //                 type="checkbox"
// //                 value={field}
// //                 onChange={() => handleCheckboxChange(field)}
// //                 checked={selectedFields.includes(field)}
// //                 className="mr-2"
// //               />
// //               <label className="text-sm">{fieldToColumnName[field]}</label>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="mt-4 flex space-x-2">
// //           <button
// //             type="button"
// //             onClick={handleGenerate}
// //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //           >
// //             Generate Table
// //           </button>
// //           <button
// //             type="button"
// //             onClick={handleClearFilters}
// //             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
// //           >
// //             Clear Filters
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleSelectAll}
// //             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
// //           >
// //             Select All
// //           </button>
// //         </div>
// //       </div>

// //       {companies.length > 0 && (
// //         <div className="overflow-x-auto shadow-xl rounded-lg">
// //           <table className="min-w-full bg-white">
// //             <thead>
// //               <tr className="bg-gray-100 text-center">
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Sr.No.</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">
// //                   Company Name
// //                 </th>
// //                 {selectedFields.map((field) => (
// //                   <th
// //                     key={field}
// //                     className="px-4 py-2 text-center text-sm font-medium text-white"
// //                   >
// //                     {fieldToColumnName[field]}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {companies.map((company, index) => (
// //                 <tr
// //                   key={company.company_id}
// //                   className="hover:bg-gray-100 text-center"
// //                 >
// //                   <td className="py-2 px-8 border-b text-center">
// //                     {index + 1}
// //                   </td>
// //                   <td className="py-2 px-8 border-b text-center">
// //                     {company.company_name}
// //                   </td>
// //                   {selectedFields.map((field) => (
// //                     <td key={field} className="py-2 px-8 border-b text-center">
// //                       {company[field]}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanyTableGeneratorIntership;
