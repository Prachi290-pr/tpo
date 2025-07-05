/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../api";
import IndiERPReport from './IndiERPReport';

const SearchIndiERPReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudent, setFilteredStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch student details from the backend
    api.get('/indierp/geterpdetails')
      .then(response => {
        setStudentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleSearch = () => {
    const foundStudent = studentData.find(student =>
      Object.values(student).some(value => 
        value !== null && value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStudent(foundStudent);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Information</h2>
      <div className="mb-6 flex flex-wrap gap-6 justify-center w-full">
        <input
          type="text"
          placeholder="Search student details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button onClick={handleSearch} placeholder="Enter TPO ID" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
      {filteredStudent ? (
        <IndiERPReport student={filteredStudent} />
      ) : (
        searchTerm && <div>No student found</div>
      )}
    </div>
  );
};

export default SearchIndiERPReport;
