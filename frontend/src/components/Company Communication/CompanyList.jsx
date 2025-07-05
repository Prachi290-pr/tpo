import React from "react";

const CompanyList = ({ companies, editCompany, deleteCompany }) => (
  <div className="max-8xl mx-auto my-0 p-4">
    <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
    <table className="">
  <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
    <tr>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Serial No.
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Company Name
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Company Location
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Mode of Communication
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Academic Year
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Company Turnover
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Campus Type
      </th>
      <th className="px-4 py-2 text-center text-sm font-medium text-white">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    {companies.length > 0 ? (
      companies.map((company, index) => (
        <tr key={company.id} className="bg-white hover:bg-gray-100">
          <td className="px-4 py-2 text-center">{index + 1}</td>
          <td className="px-4 py-2 text-center">{company.name}</td>
          <td className="px-4 py-2 text-center">{company.location}</td>
          <td className="px-4 py-2 text-center">{company.mode_of_communication}</td>
          <td className="px-4 py-2 text-center">{company.academic_year}</td>
          <td className="px-4 py-2 text-center">{company.turnover}</td>
          <td className="px-4 py-2 text-center">{String(company.onoff).toUpperCase()}</td>
          <td className="px-4 py-2 flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => editCompany(index)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" className="px-4 py-2 text-center">
          No companies available
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  </div>
);

export default CompanyList;
// import React from "react";

// const CompanyList = ({ companies, editCompany, deleteCompany }) => (
//   <table className="table-auto mx-auto my-auto">
//     <thead>
//       <tr>
//         <th colSpan="5" className="px-4 py-3 text-center text-3xl">
//           {companies.length > 0 ? "Company Details" : "No Data Available"}
//         </th>
//       </tr>
//       {companies.length > 0 && (
//         <tr>
//           <th className="px-4 py-2">Serial No.</th>
//           <th className="px-4 py-2">Company Name</th>
//           <th className="px-4 py-2">Mode of Communication</th>
//           <th className="px-4 py-2">Academic Year</th>
//           <th className="px-4 py-2">Actions</th>
//         </tr>
//       )}
//     </thead>
//     <tbody>
//       {companies.length > 0 ? (
//         companies.map((company, index) => (
//           <tr key={index} className="bg-white">
//             <td className="border px-4 py-2">{index + 1}</td>
//             <td className="border px-4 py-2">{company.companyName}</td>
//             <td className="border px-4 py-2">{company.communicationMode}</td>
//             <td className="border px-4 py-2">{company.academicYear}</td>
//             <td className="border px-4 py-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
//                 onClick={() => editCompany(index)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
//                 onClick={() => deleteCompany(index)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="5" className="px-4 py-2 text-center">
//             No companies available
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// );

// export default CompanyList;
