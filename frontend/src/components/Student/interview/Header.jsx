import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgressBar from './progressBar';

const Header = ({ onStartInterview, interviews }) => {
  const navigate = useNavigate();
  const [startClicked, setStartClicked] = useState(false);

  const handleTabClick = (tab) => {
    navigate(tab); // Navigate to the clicked tab
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      {/* <nav className="bg-gray-800 sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/history"
                    onClick={() => handleTabClick("/history")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    History
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      {
        startClicked && <CircularProgressBar/>
      }
      {
        !startClicked &&
        <>
        <h2 className="text-2xl font-bold p-6 mb-4" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>Available Interviews</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {interviews.map((interview, index) => (
            <div key={index} className="bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full transform transition duration-500 hover:scale-105 mt-8">
              <div className="mb-4 text-gray-700">
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Title:</strong> {interview.title}</p>
                </div>
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Role:</strong> {interview.role}</p>
                </div>
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Difficulty Level:</strong> {interview.difficulty}</p>
                </div>
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Language:</strong> {interview.language}</p>
                </div>
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Date & Time:</strong> {new Date(interview.deadline).toLocaleString('en-GB')}</p>
                </div>
                <div className="p-4 mb-2 border border-gray-300 rounded-lg bg-blue-50">
                  <p><strong>Total Score:</strong> {interview.totalScore ? interview.totalScore : 100}</p>
                </div>
              </div>
              {!startClicked && <button
                onClick={() => {setStartClicked(true);onStartInterview(interview)}}
                className="bg-blue-500 text-white w-full py-3 rounded-lg shadow-md hover:bg-blue-600"
                style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}
              >
                Start Interview
              </button>}
            </div>
          ))}
        </div>
        </>
      }
     
    </div>
  );
};

export default Header;