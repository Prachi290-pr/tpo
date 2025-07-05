import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';

const AllStudentAptitudeTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

//   const handleClick = (id) => {
//     const selectedInterview = interviews.find(interview => interview.id === id);
//     if (selectedInterview) {
//       navigate(`/adminforum/${id}`);
//     }
//   };

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await api.get("/openai/getStudentsWithAptitude");
        console.log(response);
        setInterviews(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInterviews();
  }, []);

  const interviewsPerPage = 7;
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = interviews.slice(indexOfFirstInterview, indexOfLastInterview);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };

  return (
    <div className="container mx-auto px-4">
      <h4 className="font-bold text-4xl text-center text-blue-700 mt-8 mb-4">Student Aptitude Report</h4>
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
      <div className="overflow-x-auto">
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
          <table >
            <thead className="sticky top-0 z-8 w-fulls">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Student ID</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Student Name</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
                {/* <th className="px-4 py-2 text-center text-sm font-medium text-white">Language</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Created At</th> */}
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-gray-200">
              {currentInterviews.map((interview, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap bg-white z-10">{`${interview.studentId}`}</td>
                  <td className="px-6 py-3">{interview.name}</td>
                  <td className="px-6 py-3">{interview.email_id}</td>
                  <td className="px-6 py-3">{interview.clg_id}</td>
                  {/* <td className="px-6 py-3">{interview.language}</td>
                  <td className="px-6 py-3">{formatDate(interview.createdAt)}</td> */}
                  <td className="px-6 py-3">
                  <Link
                      to = {`/each-aptitude-student?id=${interview.studentId}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none shadow-xl inline-block"
                    >
                      View Aptitudes
                    </Link>
                    {/* <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleClick(interview.id)}
                    >
                      View Details
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-4 ">
        <nav className="block overflow-x-auto">
          <ul className="flex pl-0 space-x-2 ">
            {Array(Math.ceil(interviews.length / interviewsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllStudentAptitudeTest;
