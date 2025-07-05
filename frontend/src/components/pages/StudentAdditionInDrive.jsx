import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';

const StudentAdditionInDrive = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [leftTableData, setLeftTableData] = useState([]);
  const [rightTableData, setRightTableData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/jobpostings/company-name-jobpost'); // Replace with your API endpoint
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch students when a company is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCompany) return;
      try {
        const response = await api.get(`/drivestatus/manualStudent/${selectedCompany}`); // Replace with your API endpoint
        setLeftTableData(response.data.left);
        setRightTableData(response.data.right); // Clear the right table when switching companies
        setSelectedStudents([]); // Reset selected students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [selectedCompany]);

  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddStudents = async() => {
    if (!selectedCompany) return;
      try {
        const response = await api.post(`/drivestatus/manualStudent/${selectedCompany}`,{studentList:selectedStudents}); // Replace with your API endpoint

        const studentsToMove = leftTableData.filter((student) =>
        selectedStudents.includes(student.clg_id)
        );
        setRightTableData((prevData) => [...prevData, ...studentsToMove]);
        setLeftTableData((prevData) =>
        prevData.filter((student) => !selectedStudents.includes(student.clg_id))
        );
        setSelectedStudents([]); // Reset selected students
      } catch (error) {
        console.error('Error fetching students:', error);
      }

     // Reset selected students
  };

  return (
    <div className="p-4">
      {/* Company Selector */}
      <div className="mb-6">
        <label htmlFor="companySelect" className="block text-lg font-bold mb-2">
          Select a Company
        </label>
        <select
          id="companySelect"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">-- Select a Company --</option>
          {companies.map((company) => (
            <option key={company.jobPostingId} value={company.jobPostingId}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Dual Tables (Visible only if a company is selected) */}
      {selectedCompany && (
        <div className="flex space-x-8 ">
          {/* Left Table */}
          <div className="flex-1 max-h-[500px] overflow-auto">
            <h2 className="text-lg font-bold mb-2">Available Students</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200 sticky top-0 text-white">
                <tr>
                  <th className="border border-gray-300 p-2 text-white">Select</th>
                  <th className="border border-gray-300 p-2 text-white">ID</th>
                  <th className="border border-gray-300 p-2 text-white">Name</th>
                  <th className="border border-gray-300 p-2 text-white">Branch</th>
                </tr>
              </thead>
              <tbody>
                {leftTableData.map((student) => (
                  <tr key={student.id}>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.clg_id)}
                        onChange={() => handleCheckboxChange(student.clg_id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{student.clg_id}</td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Students Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleAddStudents}
              disabled={selectedStudents.length === 0}
              className={`px-4 py-2 text-white rounded ${
                selectedStudents.length
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Add Students
            </button>
          </div>

          {/* Right Table */}
          <div className="flex-1 max-h-[500px] overflow-auto">
            <h2 className="text-lg font-bold mb-2">Selected Students</h2>
            <table className="w-full table-auto border-collapse border border-gray-300 ">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="border border-gray-300 p-2 text-white">ID</th>
                  <th className="border border-gray-300 p-2 text-white">Name</th>
                  <th className="border border-gray-300 p-2 text-white">Branch</th>
                </tr>
              </thead>
              <tbody>
                {rightTableData.map((student) => (
                  <tr key={student.clg_id}>
                    <td className="border border-gray-300 p-2">{student.clg_id}</td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAdditionInDrive;
