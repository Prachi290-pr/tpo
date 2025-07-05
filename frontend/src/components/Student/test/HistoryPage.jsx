import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import moment from 'moment';
import {  useNavigate } from 'react-router-dom';
import api from '../../../api';

const HistoryPage = ({ uid }) => {
  const [userdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();
  useEffect(() => {
    api
      .post(`openai/history/${uid}`)
      .then((res) => {
        console.log(res.data);
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  // Calculate the current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userdata.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(userdata.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlequiz = (mcqKey) => {
    console.log(`Starting quiz with key: ${mcqKey}`);
    navigate("/testresult",{state:{mcqKey}})
    // Add your quiz handling logic here
  };

  const formatDate = (dateString) => {
    const dateWithoutFirstTwoChars = dateString.substring(2);
    return moment(dateWithoutFirstTwoChars, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm:ss');
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 max-w-6xl mx-auto w-full transform transition duration-500 hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>History</h2>
          <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
            <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </button>
        </div>

        {/* Table for previous users */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Index</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Date Attempted</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Aptitude</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Difficulty</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Score</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">QUIZ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6">{indexOfFirstItem + index + 1}</td>
                  <td className="py-4 px-6">{formatDate(user.stu_mcq_key)}</td>
                  {/* <td className="py-4 px-6">{Date(user.stu_mcq_key).toLocaleLowerCase()}</td> */}

                  <td className="py-4 px-6">{user.aptitudetype}</td>
                  <td className="py-4 px-6">{user.aptitude_level}</td>
                  <td className="py-4 px-6"> 
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L19 7"></path>
                      </svg>
                      {`${user.correct_answers}/${user.noq}`}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button onClick={() => handlequiz(user.stu_mcq_key)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
                      Quiz
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
