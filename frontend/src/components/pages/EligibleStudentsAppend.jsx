import React, { useState, useEffect } from 'react';
import api from '../../api';

const StudentEligibilitySelector = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availableStudents, setAvailableStudents] = useState([]);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [selectedAvailableStudents, setSelectedAvailableStudents] = useState([]);
  const [selectedEligibleStudents, setSelectedEligibleStudents] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      
    };
    fetchCourses();
  }, []);

  // Fetch students when a course is selected
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/students/getAllStudentsFOrEligible`);
        setAvailableStudents(response.data.AvailableStudents || []);
        setEligibleStudents(response.data.eligible || []);
        // Reset selections
        setSelectedAvailableStudents([]);
        setSelectedEligibleStudents([]);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  },[]);

  const handleAvailableCheckboxChange = (studentId) => {
    setSelectedAvailableStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((clg_id) => clg_id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleEligibleCheckboxChange = (studentId) => {
    setSelectedEligibleStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((clg_id) => clg_id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleAddStudents = async () => {
    if (selectedAvailableStudents.length === 0) return;
    
    try {
      // API call to add students to eligible list
      await api.post(`/students/addEligibleStudents`, {
        studentIds: selectedAvailableStudents
      });
      
      // Update local state
      const studentsToMove = availableStudents.filter((student) =>
        selectedAvailableStudents.includes(student.clg_id)
      );
      
      setEligibleStudents((prev) => [...prev, ...studentsToMove]);
      setAvailableStudents((prev) =>
        prev.filter((student) => !selectedAvailableStudents.includes(student.clg_id))
      );
      
      // Reset selections
      setSelectedAvailableStudents([]);
    } catch (error) {
        alert(error);
      console.error('Error adding students to eligible list:', error);
    }
  };

  const handleRemoveStudents = async () => {
    if (selectedEligibleStudents.length === 0) return;
    
    try {
      // API call to remove students from eligible list
      await api.post(`/students/deleteEligibleStudents`, {
        studentIds: selectedEligibleStudents
      });
      
      // Update local state
      const studentsToMove = eligibleStudents.filter((student) =>
        selectedEligibleStudents.includes(student.clg_id)
      );
      
      setAvailableStudents((prev) => [...prev, ...studentsToMove]);
      setEligibleStudents((prev) =>
        prev.filter((student) => !selectedEligibleStudents.includes(student.clg_id))
      );
      
      // Reset selections
      setSelectedEligibleStudents([]);
    } catch (error) {
      console.error('Error removing students from eligible list:', error);
    }
  };

  const handleClearAllEligible = async () => {
    if (eligibleStudents.length === 0) return;
    
    try {
      // API call to clear all eligible students
      await api.post(`/students/clearAllEligibleStudents`);
      
      // Update local state
      setAvailableStudents((prev) => [...prev, ...eligibleStudents]);
      setEligibleStudents([]);
      
      // Reset selections
      setSelectedEligibleStudents([]);
      window.location.reload();
    } catch (error) {
      console.error('Error clearing eligible students list:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Eligibility Management</h1>
      

      {/* Tables Section */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Left Table: Available Students */}
          <div className="flex-1 mb-4 md:mb-0">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Available Students</h2>
              <div className="max-h-96 overflow-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-gray-700 text-white sticky top-0">
                    <tr>
                      <th className="border border-gray-300 p-2">Select</th>
                      <th className="border border-gray-300 p-2">ID</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableStudents.length > 0 ? (
                      availableStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedAvailableStudents.includes(student.clg_id)}
                              onChange={() => handleAvailableCheckboxChange(student.clg_id)}
                              className="rounded"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">{student.clg_id}</td>
                          <td className="border border-gray-300 p-2">{student.name}</td>
                          <td className="border border-gray-300 p-2">{student.branch}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="border border-gray-300 p-4 text-center text-gray-500">No available students</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex flex-row md:flex-col justify-center items-center mb-4 md:mb-0 space-y-0 md:space-y-4 space-x-2 md:space-x-0">
            <button
              onClick={handleAddStudents}
              disabled={selectedAvailableStudents.length === 0}
              className={`px-4 py-2 text-white rounded ${
                selectedAvailableStudents.length > 0
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Add &rarr;
            </button>
            
            <button
              onClick={handleRemoveStudents}
              disabled={selectedEligibleStudents.length === 0}
              className={`px-4 py-2 text-white rounded ${
                selectedEligibleStudents.length > 0
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              &larr; Remove
            </button>
            
            <button
              onClick={handleClearAllEligible}
              disabled={eligibleStudents.length === 0}
              className={`px-4 py-2 text-white rounded ${
                eligibleStudents.length > 0
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Clear All
            </button>
          </div>

          {/* Right Table: Eligible Students */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Eligible Students</h2>
              <div className="max-h-96 overflow-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-gray-700 text-white sticky top-0">
                    <tr>
                      <th className="border border-gray-300 p-2">Select</th>
                      <th className="border border-gray-300 p-2">ID</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eligibleStudents.length > 0 ? (
                      eligibleStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedEligibleStudents.includes(student.clg_id)}
                              onChange={() => handleEligibleCheckboxChange(student.clg_id)}
                              className="rounded"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">{student.clg_id}</td>
                          <td className="border border-gray-300 p-2">{student.name}</td>
                          <td className="border border-gray-300 p-2">{student.branch}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="border border-gray-300 p-4 text-center text-gray-500">No eligible students</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default StudentEligibilitySelector;