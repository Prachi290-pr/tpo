/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import CompanyNameDropdown from "./CompanyNameDropdown";
// import YearDropdown from "./YearDropdown";
// import TimesVisitedDropdown from "./TimesVisitedDropdown";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import api from '../../api';

// const CompanyList = () => {
//   const navigate = useNavigate();
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedTimesVisited, setSelectedTimesVisited] = useState("");
//   const [filteredCompanies, setFilteredCompanies] = useState([]);

//   useEffect(() => {
//     fetchFilter();
//   }, []);

//   const fetchFilter = () => {
//     api
//       .get("drivestatus/getselectedcomp")
//       .then((res) => {
//         setCompanies(res.data);
//         setFilteredCompanies(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching companies:", err);
//       });
//   };

//   const handleCompanyChange = (event) => {
//     setSelectedCompany(event.target.value);
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handleTimesVisitedChange = (event) => {
//     setSelectedTimesVisited(event.target.value);
//   };

//   const handleClearFilters = () => {
//     setSelectedCompany("");
//     setSelectedYear("");
//     setSelectedTimesVisited("");
//     setFilteredCompanies(companies); // Reset filteredCompanies to all companies
//   };

//   const handleSearch = () => {
//     const filtered = companies.filter((company) => {
//       const matchesCompany =
//         !selectedCompany || company.name === selectedCompany;
//       const matchesYear =
//         !selectedYear || company.academic_year.toString() === selectedYear;
//       const matchesVisited =
//         !selectedTimesVisited ||
//         company.visited.toString() === selectedTimesVisited;

//       return matchesCompany && matchesYear && matchesVisited;
//     });

//     setFilteredCompanies(filtered);
//   };

//   const handleShowStudents = (company) => {
//     navigate(
//       `/driveStatus/students?id=${encodeURIComponent(
//         company.id
//       )}&company=${encodeURIComponent(company.name)}&year=${
//         company.academic_year
//       }&timesVisited=${company.visited}`,
//       { state: { id: company.id } }
//     );
//   };

//   return (
//     // <div className="">
//     //   <div className="flex flex-wrap w-full md:gap-10 sm:gap-6">
//     //     <CompanyNameDropdown
//     //       selectedCompany={selectedCompany}
//     //       handleCompanyChange={handleCompanyChange}
//     //     />
//     //     <YearDropdown
//     //       selectedYear={selectedYear}
//     //       handleYearChange={handleYearChange}
//     //     />
//     //     <TimesVisitedDropdown
//     //       selectedTimesVisited={selectedTimesVisited}
//     //       handleTimesVisitedChange={handleTimesVisitedChange}
//     //     />
//     //     <button
//     //       onClick={handleSearch}
//     //       className="ml-4 mt-6 h-12 p-2 align-center justify-center bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
//     //     >
//     //       Search
//     //     </button>
//     //     <button
//     //       onClick={handleClearFilters}
//     //       className="mt-6 h-12 p-2 align-center justify-center bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
//     //     >
//     //       Clear Filters
//     //     </button>
//     //   </div>

//     //   <div className="overflow-x-auto">
//     //     <table className="min-w-full bg-white">
//     //       <thead>
//     //         <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//     //           <th className="py-3 px-6 text-left">Company Name</th>
//     //           <th className="py-3 px-6 text-left">Year</th>
//     //           <th className="py-3 px-6 text-left">Times Visited</th>
//     //           <th className="py-3 px-6 text-left">Actions</th>
//     //         </tr>
//     //       </thead>
//     //       <tbody className="text-gray-600 text-sm font-light">
//     //         {filteredCompanies.map((company) => (
//     //           <tr key={company.id}>
//     //             <td className="py-3 px-6 text-left whitespace-nowrap">
//     //               {company.name}
//     //             </td>
//     //             <td className="py-3 px-6 text-left whitespace-nowrap">
//     //               {company.academic_year}
//     //             </td>
//     //             <td className="py-3 px-6 text-left whitespace-nowrap">
//     //               {company.visited}
//     //             </td>
//     //             <td className="py-3 px-6 text-left whitespace-nowrap">
//     //               <button
//     //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//     //                 onClick={() => handleShowStudents(company)}
//     //               >
//     //                 Show Registered Students
//     //               </button>
//     //             </td>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   </div>
//     // </div>
//     <div className="w-full px-4 py-6 space-y-4">
//       <div className="flex flex-col space-y-4">
//         <CompanyNameDropdown
//           selectedCompany={selectedCompany}
//           handleCompanyChange={handleCompanyChange}
//         />
//         <YearDropdown
//           selectedYear={selectedYear}
//           handleYearChange={handleYearChange}
//         />
//         <TimesVisitedDropdown
//           selectedTimesVisited={selectedTimesVisited}
//           handleTimesVisitedChange={handleTimesVisitedChange}
//         />
//         <div className="flex space-x-4">
//           <button
//             onClick={handleSearch}
//             className="h-12 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
//           >
//             Search
//           </button>
//           <button
//             onClick={handleClearFilters}
//             className="h-12 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Company Name</th>
//               <th className="py-3 px-6 text-left">Year</th>
//               <th className="py-3 px-6 text-left">Times Visited</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {filteredCompanies.map((company) => (
//               <tr key={company.id}>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {company.name}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {company.academic_year}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   {company.visited}
//                 </td>
//                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleShowStudents(company)}
//                   >
//                     Show Registered Students
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CompanyList;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CompanyNameDropdown from "./CompanyNameDropdown";
import YearDropdown from "./YearDropdown";
import TimesVisitedDropdown from "./TimesVisitedDropdown";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTimesVisited, setSelectedTimesVisited] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    fetchFilter();
  }, []);

  const fetchFilter = () => {
    api
      .get("drivestatus/getselectedcomp")
      .then((res) => {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleTimesVisitedChange = (event) => {
    setSelectedTimesVisited(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setSelectedYear("");
    setSelectedTimesVisited("");
    setFilteredCompanies(companies); // Reset filteredCompanies to all companies
  };

  const handleSearch = () => {
    const filtered = companies.filter((company) => {
      const matchesCompany =
        !selectedCompany || company.name === selectedCompany;
      const matchesYear =
        !selectedYear || company.academic_year.toString() === selectedYear;
      const matchesVisited =
        !selectedTimesVisited ||
        company.visited.toString() === selectedTimesVisited;

      return matchesCompany && matchesYear && matchesVisited;
    });

    setFilteredCompanies(filtered);
  };

  const handleShowStudents = (company) => {
    navigate(
      `/driveStatus/students?id=${encodeURIComponent(
        company.id
      )}&company=${encodeURIComponent(company.name)}&year=${
        company.academic_year
      }&timesVisited=${company.visited}`,
      { state: { id: company.id } }
    );
  };

  const handleCloseStatus = (company) => {
    api
      .put( `drivestatus/updateStatus/${company.id}`)
      .then((res) => {
        if(res.status==200){
          alert("Updates!");
        }
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  };

  return (
    <div className="mx-auto p-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-2 sm:space-x-2 gap-3">
        <CompanyNameDropdown
          selectedCompany={selectedCompany}
          handleCompanyChange={handleCompanyChange}
          className="flex-1 p-3 border rounded shadow-lg"
        />
        <YearDropdown
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
          className="flex-1 p-3 border rounded shadow-lg"
        />
        <TimesVisitedDropdown
          selectedTimesVisited={selectedTimesVisited}
          handleTimesVisitedChange={handleTimesVisitedChange}
          className="flex-1 p-3 border rounded shadow-lg"
        />
      </div>

      {/* <div className="flex flex-wrap w-full mb-4">
        <CompanyNameDropdown
          selectedCompany={selectedCompany}
          handleCompanyChange={handleCompanyChange}
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
        />
        <YearDropdown
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
        />
        <TimesVisitedDropdown
          selectedTimesVisited={selectedTimesVisited}
          handleTimesVisitedChange={handleTimesVisitedChange}
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
        />
      </div> */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-lg"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-lg"
        >
          Clear Filters
        </button>
      </div>
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr className="text-black text-center">
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Sr. No.
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Company Name
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Academic Year
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Times Visited
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company,index) => (
              <tr key={company.id} className="text-center hover:bg-gray-100">
                <td className="px-6 py-4">{index+1}</td>
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{company.academic_year}</td>
                <td className="px-6 py-4">{company.visited}</td>
                <td className="px-6 py-4 flex justify-around">
                  <button
                    onClick={() => handleShowStudents(company)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Show Students
                  </button>
                  <button
                    onClick={() => handleCloseStatus(company)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Mark Drive As Close
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

export default CompanyList;