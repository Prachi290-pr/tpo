import React, { useState, useEffect } from "react";
import api from "../../../api";
// import axios from "axios";

const InternEditCompanyPopup = ({ onSave, onCancel, editingCompany }) => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [communicationMode, setCommunicationMode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [companyTurnover, setCompanyTurnover] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingCompany) {
      setCompanyName(editingCompany.name);
      setLocation(editingCompany.location);
      setCommunicationMode(editingCompany.mode_of_communication);
      setAcademicYear(editingCompany.academic_year);
      setCompanyTurnover(editingCompany.turnover);
    }
  }, [editingCompany]);

  const validateCompanyName = (name) => {
    if (!name.trim()) {
      setError("Company name cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  const validateAcademicYear = (year) => {
    const isValidYear = /^\d{4}$/.test(year);
    if (!isValidYear) {
      setError("Invalid year format. Please use YYYY format.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (
      !validateCompanyName(companyName) ||
      !location ||
      !communicationMode ||
      !validateAcademicYear(academicYear) ||
      !companyTurnover
    ) {
      return;
    }

    const updatedCompany = {
      name: companyName,
      location: location,
      mode_of_communication: communicationMode,
      academic_year: academicYear, 
      turnover : companyTurnover,
    };

    try {
      await api.put(`companies/intership/${editingCompany.id}`, updatedCompany);
      onSave(updatedCompany);
      clearForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    clearForm();
    onCancel();
  };

  const clearForm = () => {
    setCompanyName("");
    setLocation("");
    setCommunicationMode("");
    setAcademicYear(""); 
    setCompanyTurnover("");
    setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 mt-14">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-xl text-white-600 hover:text-white-900"
          onClick={onCancel}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Company</h2>
        {error && <div className="text-red-500 mb-4 p-2">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            className="w-full flex-1 p-3 border rounded shadow-lg rounded-md"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full flex-1 p-3 border rounded shadow-lg rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Mode of Communication
          </label>
          <select
            className="w-full flex-1 p-3 border rounded shadow-lg rounded-md"
            value={communicationMode}
            onChange={(e) => setCommunicationMode(e.target.value)}
          >
            <option value="">Select Mode</option>
            <option value="Contact">Contact</option>
            <option value="Email">Email</option>
            <option value="Whatsapp">WhatsApp</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Academic Year</label>
          <input
            type="text"
            className="w-full flex-1 p-3 border rounded shadow-lg rounded-md"
            placeholder="YYYY"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Turnover</label>
          <input
            type="text"
            className="w-full flex-1 p-3 border rounded shadow-lg rounded-md"
            placeholder=""
            value={companyTurnover}
            onChange={(e) => setCompanyTurnover(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternEditCompanyPopup;
