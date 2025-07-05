import React, { useState, useEffect } from "react";

const AddHRForm = ({
  onSave,
  editingCompany,
  setEditingCompany,
  validateYear,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [communicationMode, setCommunicationMode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (editingCompany) {
      setCompanyName(editingCompany.companyName);
      setCommunicationMode(editingCompany.communicationMode);
      setAcademicYear(editingCompany.academicYear);
    }
  }, [editingCompany]);

  const handleSave = () => {
    if (!companyName || !academicYear) {
      setValidationError("Company Name and Academic Year are required");
      return;
    }

    if (!validateYear(academicYear)) {
      setValidationError("Academic Year must be a valid year (e.g., 2023)");
      return;
    }

    onSave({ companyName, communicationMode, academicYear });
    clearForm();
  };

  const clearForm = () => {
    setEditingCompany(null);
    setCompanyName("");
    setCommunicationMode("");
    setAcademicYear("");
    setValidationError("");
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
    <h2 className="text-xl font-bold mb-4">
      {editingCompany ? "Edit Company" : "Add a Company"}
    </h2>
    {validationError && (
      <div className="text-red-500 mb-2">{validationError}</div>
    )}
    <div className="mb-2">
      <label className="block mb-1">Company Name</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
    </div>

    <div className="mb-2">
      <label className="block mb-1">Mode of Communication</label>
      <select
        className="w-full p-2 border rounded"
        value={communicationMode}
        onChange={(e) => setCommunicationMode(e.target.value)}
      >
        <option value="">Select Mode</option>
        <option value="contact">Contact</option>
        <option value="email">Email</option>
        <option value="whatsapp">WhatsApp</option>
      </select>
    </div>
    <div className="mb-2">
      <label className="block mb-1">Academic Year</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={academicYear}
        onChange={(e) => setAcademicYear(e.target.value)}
      />
    </div>
    <div className="flex space-x-4">
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        {editingCompany ? "Update Company" : "Add Company"}
      </button>
      {/* {editingCompany && (
        <button
          onClick={() => setEditingCompany(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
        >
          Cancel
        </button>
      )} */}
    </div>
  </div>
  );
};

export default AddHRForm;
