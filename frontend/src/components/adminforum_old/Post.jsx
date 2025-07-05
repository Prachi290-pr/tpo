import React from "react";
import { SlCalender } from "react-icons/sl";
import { TbLocation } from "react-icons/tb";

function Post({ companyName, date, location, jobDescription }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-indigo-700">{companyName}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <SlCalender className="text-gray-500 mr-2" />
          <p>{date}</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <TbLocation className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-600">{location}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-medium text-indigo-600">Job Description</h4>
        <p className="text-sm text-gray-700">{jobDescription}</p>
      </div>
    </div>
  );
}

export default Post;
