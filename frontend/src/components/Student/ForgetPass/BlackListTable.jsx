import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../api";

const BlackListTable = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clgId, setClgId] = useState("");
  const [blacklistCount, setBlacklistCount] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch student data from the API
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/blacklist/blacklisted-students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleUnblock = async (studentId) => {
    const confirmation = prompt("Type 'unblock' to confirm:");
    if (confirmation === "unblock") {
      try {
        await api.post(`/blacklist/remove`, { clgId:studentId });
        alert("Student unblocked successfully!");
        window.location.reload();
        setError('');
        // Remove unblocked student from the list
        setStudents(students.filter((student) => student.id !== studentId));
      } catch (error) {
        console.error("Error unblocking student:", error);
        setError("Failed to unblock student.");
        setSuccess('');
      }
    } else {
      alert("Unblock cancelled.");
    }
  };

  const handleAddToBlacklist = async () => {
    try {
      const response = await api.post(`/blacklist/add`, {
        clgId: clgId,
        blacklistCount: blacklistCount
      });
      alert("Student added to blacklist successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding student to blacklist:", error);
      setShowModal(false);
      setError("Failed to add student to blacklist.");
      setSuccess('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Blacklisted Students</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add to Blacklist
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-center text-gray-500">No blacklisted students.</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
        <table className="">
          <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <tr>
              <th className="py-2 px-4 border-b text-white">College ID</th>
              <th className="py-2 px-4 border-b text-white">Name</th>
              <th className="py-2 px-4 border-b text-white">Number of Black Listing Left</th>
              <th className="py-2 px-4 border-b text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border-b">{student.clg_id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.blackListedCount}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUnblock(student.clg_id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Add Student to Blacklist</h2>
            <label className="block text-gray-700 mb-2">
              College ID:
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={clgId}
                onChange={(e) => setClgId(e.target.value)}
                required
              />
            </label>
            <label className="block text-gray-700 mb-4">
              Blacklist Count:
              <input
                type="number"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={blacklistCount}
                onChange={(e) => setBlacklistCount(e.target.value)}
                required
              />
            </label>
            <div className="flex justify-between items-center">
              <button
                onClick={handleAddToBlacklist}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlackListTable;
