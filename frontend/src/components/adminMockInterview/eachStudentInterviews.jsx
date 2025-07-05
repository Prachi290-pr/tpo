// // import React, { useState, useEffect } from 'react';
// // import { Link } from "react-router-dom";
// // import api from '../api';
// // import axios from 'axios';

// // const HistoryComponent = ({}) => {
// //   const [previousInterviews, setPreviousInterviews] = useState([]);
// //   const userId = 1;

// //   useEffect(() => {
// //     const fetchInterviews = async () => {
// //       try {
// //         const response = await api.get(`interviews/${userId}`);
// //         setPreviousInterviews(response.data);
// //       } catch (error) {
// //         console.error('Error fetching interviews:', error);
// //       }
// //     };

// //     fetchInterviews();
// //   }, [userId]);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
// //     return date.toLocaleDateString('en-GB', options);
// //   };

// //   return (
// //     // <div className="bg-gray-200 min-h-screen p-8">
// //     //   <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full transform transition duration-500 hover:scale-105">
// //     //     <div className="flex justify-between items-center mb-4">
// //     //       <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>History</h2>
// //     //       <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
// //     //         <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //     //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
// //     //         </svg>
// //     //         Back
// //     //       </button>
// //     //     </div>
// //     //     <div className="overflow-x-auto">
// //     //       <table className="min-w-full bg-white border border-gray-200">
// //     //         <thead className="bg-blue-500 text-white">
// //     //           <tr>
// //     //             <th className="py-3 px-6 text-left">Role</th>
// //     //             <th className="py-3 px-6 text-left">Date</th>
// //     //             <th className="py-3 px-6 text-left">Score</th>
// //     //             <th className="py-3 px-6 text-left">Difficulty</th>
// //     //             <th className="py-3 px-6 text-left">Languages</th>
// //     //             <th className="py-3 px-6 text-left">Performance</th>
// //     //           </tr>
// //     //         </thead>
// //     //         <tbody className="divide-y divide-gray-200">
// //     //           {previousInterviews.map(interview => (
// //     //             <tr key={interview.id} className="hover:bg-gray-100">
// //     //               <td className="py-4 px-6">{interview.role}</td>
// //     //               <td className="py-4 px-6">{formatDate(interview.createdAt)}</td>
// //     //               <td className="py-4 px-6">
// //     //                 <span className="inline-flex items-center">
// //     //                   <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //     //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L19 7"></path>
// //     //                   </svg>
// //     //                   {interview.score !== null ? interview.score : 'N/A'}
// //     //                 </span>
// //     //               </td>
// //     //               <td className="py-4 px-6">{interview.complexity}</td>
// //     //               <td className="py-4 px-6">{interview.language}</td>
// //     //               <td className="py-4 px-6">{interview.performance !== null ? interview.performance : 'N/A'}</td>
// //     //             </tr>
// //     //           ))}
// //     //         </tbody>
// //     //       </table>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="bg-gray-200 min-h-screen p-8">
// //       <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2
// //             className="text-2xl font-bold text-gray-800"
// //             style={{
// //               fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
// //             }}
// //           >
// //             History
// //           </h2>
// //           <button
// //             onClick={() => window.history.back()}
// //             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-md"
// //           >
// //             <svg
// //               className="w-6 h-6 inline-block mr-1"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M15 19l-7-7 7-7"
// //               ></path>
// //             </svg>
// //             Back
// //           </button>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white rounded-lg shadow-lg">
// //             <thead className="bg-blue-500 text-white">
// //               <tr>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">ID</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Role</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Date</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {previousInterviews.map((interview) => (
// //                 <tr key={interview.id} className="hover:bg-gray-100">
// //                   <td className="py-4 px-6 text-center">{interview.id}</td>
// //                   <td className="py-4 px-6 text-center">{interview.role}</td>
// //                   <td className="py-4 px-6 text-center">{formatDate(interview.createdAt)}</td>
// //                   <td className="py-4 px-6 text-center">
// //                     <Link
// //                       to={`/interview-details/${interview.id}`}
// //                       className="bg-blue-500 justify hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-xl inline-block"
// //                     >
// //                       View Score
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HistoryComponent;

// // import React, { useState, useEffect } from 'react';
// // import { Link } from "react-router-dom";
// // import api from '../api';
// // import axios from 'axios';

// // const HistoryComponent = ({}) => {
// //   const [previousInterviews, setPreviousInterviews] = useState([]);
// //   const userId = 1;

// //   useEffect(() => {
// //     const fetchInterviews = async () => {
// //       try {
// //         const response = await api.get(`interviews/${userId}`);
// //         setPreviousInterviews(response.data);
// //       } catch (error) {
// //         console.error('Error fetching interviews:', error);
// //       }
// //     };

// //     fetchInterviews();
// //   }, [userId]);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
// //     return date.toLocaleDateString('en-GB', options);
// //   };

// //   return (
// //     // <div className="bg-gray-200 min-h-screen p-8">
// //     //   <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full transform transition duration-500 hover:scale-105">
// //     //     <div className="flex justify-between items-center mb-4">
// //     //       <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>History</h2>
// //     //       <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
// //     //         <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //     //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
// //     //         </svg>
// //     //         Back
// //     //       </button>
// //     //     </div>
// //     //     <div className="overflow-x-auto">
// //     //       <table className="min-w-full bg-white border border-gray-200">
// //     //         <thead className="bg-blue-500 text-white">
// //     //           <tr>
// //     //             <th className="py-3 px-6 text-left">Role</th>
// //     //             <th className="py-3 px-6 text-left">Date</th>
// //     //             <th className="py-3 px-6 text-left">Score</th>
// //     //             <th className="py-3 px-6 text-left">Difficulty</th>
// //     //             <th className="py-3 px-6 text-left">Languages</th>
// //     //             <th className="py-3 px-6 text-left">Performance</th>
// //     //           </tr>
// //     //         </thead>
// //     //         <tbody className="divide-y divide-gray-200">
// //     //           {previousInterviews.map(interview => (
// //     //             <tr key={interview.id} className="hover:bg-gray-100">
// //     //               <td className="py-4 px-6">{interview.role}</td>
// //     //               <td className="py-4 px-6">{formatDate(interview.createdAt)}</td>
// //     //               <td className="py-4 px-6">
// //     //                 <span className="inline-flex items-center">
// //     //                   <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //     //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L19 7"></path>
// //     //                   </svg>
// //     //                   {interview.score !== null ? interview.score : 'N/A'}
// //     //                 </span>
// //     //               </td>
// //     //               <td className="py-4 px-6">{interview.complexity}</td>
// //     //               <td className="py-4 px-6">{interview.language}</td>
// //     //               <td className="py-4 px-6">{interview.performance !== null ? interview.performance : 'N/A'}</td>
// //     //             </tr>
// //     //           ))}
// //     //         </tbody>
// //     //       </table>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="bg-gray-200 min-h-screen p-8">
// //       <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2
// //             className="text-2xl font-bold text-gray-800"
// //             style={{
// //               fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
// //             }}
// //           >
// //             History
// //           </h2>
// //           <button
// //             onClick={() => window.history.back()}
// //             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-md"
// //           >
// //             <svg
// //               className="w-6 h-6 inline-block mr-1"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M15 19l-7-7 7-7"
// //               ></path>
// //             </svg>
// //             Back
// //           </button>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white rounded-lg shadow-lg">
// //             <thead className="bg-blue-500 text-white">
// //               <tr>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">ID</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Role</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Date</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {previousInterviews.map((interview) => (
// //                 <tr key={interview.id} className="hover:bg-gray-100">
// //                   <td className="py-4 px-6 text-center">{interview.id}</td>
// //                   <td className="py-4 px-6 text-center">{interview.role}</td>
// //                   <td className="py-4 px-6 text-center">{formatDate(interview.createdAt)}</td>
// //                   <td className="py-4 px-6 text-center">
// //                     <Link
// //                       to={`/interview-details/${interview.id}`}
// //                       className="bg-blue-500 justify hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-xl inline-block"
// //                     >
// //                       View Score
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HistoryComponent;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api';

// const HistoryComponent = () => {
//   const [previousInterviews, setPreviousInterviews] = useState([]);
//   const userId = 1;

//   useEffect(() => {
//     const fetchInterviews = async () => {
//       try {
//         const response = await api.get(`interviews/${userId}`);
//         setPreviousInterviews(response.data);
//       } catch (error) {
//         console.error('Error fetching interviews:', error);
//       }
//     };

//     fetchInterviews();
//   }, [userId]);

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const options = {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//     };
//     return dateTime.toLocaleDateString('en-GB', options);
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen p-8">
//       <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full">
//         <div className="flex justify-between items-center mb-4">
//           <h2
//             className="text-2xl font-bold text-gray-800"
//             style={{
//               fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//             }}
//           >
//             History
//           </h2>
//           <button
//             onClick={() => window.history.back()}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-md"
//           >
//             <svg
//               className="w-6 h-6 inline-block mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 19l-7-7 7-7"
//               ></path>
//             </svg>
//             Back
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg shadow-lg">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">ID</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Role</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Date & Time</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Language</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Difficulty</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Score</th>
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {previousInterviews.map((interview) => (
//                 <tr key={interview.id} className="hover:bg-gray-100">
//                   <td className="py-4 px-6 text-center">{interview.id}</td>
//                   <td className="py-4 px-6 text-center">{interview.role}</td>
//                   <td className="py-4 px-6 text-center">
//                     {formatDateTime(interview.createdAt)}
//                   </td>
//                   <td className="py-4 px-6 text-center">{interview.language}</td>
//                   <td className="py-4 px-6 text-center">{interview.complexity}</td>
//                   <td className="py-4 px-6 text-center">
//                     {interview.score !== null ? interview.score : 'N/A'}
//                   </td>
//                   <td className="py-4 px-6 text-center">
//                     <Link
//                       to={`/interview-details/${interview.id}`}
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-xl inline-block"
//                     >
//                       View Score
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryComponent;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const StudentInterview = ({uid}) => {
  const [previousInterviews, setPreviousInterviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentId, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const interviewsPerPage = 100;
  // const userId = 1;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await api.get(`interviews/${studentId.get('id')}`);
        console.log(response);
        setPreviousInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, [uid]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return dateTime.toLocaleDateString('en-GB', options);
  };

  // Pagination
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = previousInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(previousInterviews.length / interviewsPerPage);

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold text-gray-800"
            style={{
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            }}
          >
            History
          </h2>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-md"
          >
            <svg
              className="w-6 h-6 inline-block mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back
          </button>
        </div>

        <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
          <table className="">
            <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">ID</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Role</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Date & Time</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Language</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Difficulty</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Score</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentInterviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">{interview.id}</td>
                  <td className="py-4 px-6 text-center">{interview.role}</td>
                  <td className="py-4 px-6 text-center">
                    {formatDateTime(interview.createdAt)}
                  </td>
                  <td className="py-4 px-6 text-center">{interview.language}</td>
                  <td className="py-4 px-6 text-center">{interview.complexity}</td>
                  <td className="py-4 px-6 text-center">
                    {interview.score !== null ? interview.score : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/student-interview-details?id=${interview.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-xl inline-block"
                    >
                      View Score
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 bg-blue-500 text-white rounded-md mx-1 hover:bg-blue-600 focus:outline-none ${
                currentPage === index + 1 ? 'bg-blue-600' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInterview;
