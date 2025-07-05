// import { React, useEffect, useState } from "react";
// // import "./HRList.css";
// import api from '../../api';

// const HRList = ({ companies, editCompany, deleteCompany }) => {
//   // const [hrdata,setHRData]=useState([]);

//   // useEffect(() => {
//   //     const getTeamData = async () => {
//   //       try {
//   //         const res = await axios.get("companies/getAll");
//   //         console.log("Fetched companies:", res.data);
//   //         setCompanies(res.data);
//   //       } catch (error) {
//   //         console.error("Error fetching team data:", error);
//   //       }
//   //     };

//   //     getTeamData();
//   //   }, [])
//   return(
// <>
//     <table className="table-auto mx-auto my-auto">
//       <thead>
//         <tr>
//           <th colSpan="6" className="px-4 py-3 text-center text-3xl">
//             {companies.length > 0 ? "HR List" : "No Data Available"}
//           </th>
//         </tr>
//         {companies.length > 0 && (
//           <tr>
//             <th className="px-4 py-2">Company ID</th>
//             <th className="px-4 py-2">HR Name</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Contact</th>
//             <th className="px-4 py-2">Position</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         )}
//       </thead>
//       <tbody className="tbody-hr">
//         {companies ? (
//           companies.map((company, index) => (
//             console.log(company),
//             <tr key={index} className="bg-white">
//               <td className="border px-4 py-2">{index + 1}</td>
//               <td className="border px-4 py-2">{company.name}</td>
//               <td className="border px-4 py-2">{company.email}</td>
//               <td className="border px-4 py-2">{company.contact}</td>
//               <td className="border px-4 py-2">{company.post}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
//                   onClick={() => editCompany(index)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
//                   onClick={() => {
//                     console.log(company);
//                     console.log(company.id);
//                     deleteCompany(company.id)}}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className="px-4 py-2 text-center">
//               No companies available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </>
//   );

// };

// export default HRList;

import React from "react";
import api from "../../api";

const HRList = ({ companies, editCompany, deleteCompany }) => {
  return (
    // <div className="max-w-8xl mx-auto my-4 p-4">

    //     <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
    //       <thead>
    //         <tr>
    //           <th colSpan="6" className="px-2 py-3 text-left text-lg bg-gray-100 text-black" >
    //             {companies.length > 0 ? "HR List" : "No Data Available"}
    //           </th>
    //         </tr>
    //         {companies.length > 0 && (
    //           <tr className="bg-gray-100">
    //             <th className="px-4 py-2  bg-white text-black text-center">Company ID</th>
    //             <th className="px-4 py-2  bg-white text-black text-center">HR Name</th>
    //             <th className="px-4 py-2  bg-white text-black text-center">Email</th>
    //             <th className="px-4 py-2  bg-white text-black text-center">Contact</th>
    //             <th className="px-4 py-2  bg-white text-black text-center">Actions</th>
    //             <th className="px-4 py-2  bg-white text-black text-center">Position</th>
    //           </tr>
    //         )}
    //       </thead>
    //       <tbody>
    //         {companies ? (
    //           companies.map((company, index) => (
    //             <tr key={index} className="bg-white">
    //               <td className="px-4 py-2">{index + 1}</td>
    //               <td className="px-4 py-2">{company.name}</td>
    //               <td className="px-4 py-2">{company.email}</td>
    //               <td className="px-4 py-2">{company.contact}</td>
    //               <td className="px-4 py-2">{company.post}</td>
    //               <td className="px-4 py-2">
    //                 <button
    //                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 m-2"
    //                   onClick={() => editCompany(index)}
    //                 >
    //                   Edit
    //                 </button>
    //                 <button
    //                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 m-2"
    //                   onClick={() => deleteCompany(company.id)}
    //                 >
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan="6" className="px-4 py-2 text-center">
    //               No companies available
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    <div className="max-w-8xl mx-auto my-4 p-0">
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
      <table className="">
  <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
    
    {companies.length > 0 && (
      <tr className="bg-blue-500 text-white">
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Company ID
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          HR Name
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Email
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Contact
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Alternate Contact
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Actions
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Position
        </th>
      </tr>
    )}
  </thead>
  <tbody>
    {companies ? (
      companies.map((company, index) => (
        <tr key={index} className="bg-white hover:bg-gray-100">
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{company.name}</td>
          <td className="px-4 py-2">{company.email}</td>
          <td className="px-4 py-2">{company.contact}</td>
          <td className="px-4 py-2">{company.alternate_contact}</td>
          <td className="px-4 py-2">{company.post}</td>
          <td className="px-4 py-2 flex justify-around">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 m-2"
              onClick={() => editCompany(index)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 m-2"
              onClick={() => deleteCompany(company.id)}
            >
              Delete
            </button>
          </td>
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
  );
};

export default HRList;
