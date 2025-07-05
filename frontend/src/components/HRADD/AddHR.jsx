import React, { useState, useEffect } from "react";
// import axios from 'axios'
import api from '../../api';

const AddHR = ({
  onSave,
  editingCompany,
  setEditingCompany,
  validateYear,
  onCancel,
  companyid,
  company_name,
}) => {
  const [HRName, setHRName] = useState("");
  const [HREmail, setHREmail] = useState("");
  const [HRContact, setHRContact] = useState("");
  const [HRAlternate, setHRAlternate] = useState("");
  const [communicationMode, setCommunicationMode] = useState("contact");
  const [HRPost, setHRPost] = useState("");
  const [error, setError] = useState(false);

  console.log("Company ID:", companyid);
  // useEffect to populate form fields if editingCompany is provided
  useEffect(() => {
    if (editingCompany) {
      setHRName(editingCompany.HRName);
      setCommunicationMode(editingCompany.communicationMode);
      setHRPost(editingCompany.HRPost);
      setHREmail(editingCompany.HREmail || "");
      setHRContact(editingCompany.HRContact || "");
      setHRAlternate(editingCompany.HRAlternate || "");
    } else {
      clearForm();
    }
  }, [editingCompany]);

  const handleSave = async () => {
    if (!HRName.trim() || !HRPost.trim()) {
      setError(true);
      return;
    }

    const hrInfo = {
      HRName,
      HREmail,
      HRContact,
      HRAlternate,
      HRPost,
      // companyId: editingCompany ? editingCompany.companyId : null,
      companyid,
    };

    onSave(hrInfo);

    try {
      console.log("HR DATA TO SEND:", hrInfo);
      const res = api.post(`hr/addhr`, hrInfo);
      console.log(res);
    } catch (error) {}
    clearForm();
  };

  const handleCancel = () => {
    clearForm();
    setEditingCompany(null);
    onCancel(); // Call onCancel function passed from parent to handle closing popup
  };

  const clearForm = () => {
    setHRName("");
    setHREmail("");
    setHRContact("");
    setHRAlternate("");
    setCommunicationMode("contact");
    setHRPost("");
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center shadow-lg rounded-lg">
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative ">
    <button
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-white-900 text-white"
        onClick={handleCancel}
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">
        {editingCompany ? "Edit HR" : "Add HR"}
      </h2>

      <label className="block mb-2">
        Company
        <input
          type="text"
          className={`w-full p-2 border rounded
                          `}
          value={company_name}
        />
      </label>

      <label className="block mb-2">
        Name
        <input
          type="text"
          className={`w-full p-2 border rounded ${
            error && !HRName.trim() ? "border-red-500" : ""
          }`}
          value={HRName}
          onChange={(e) => setHRName(e.target.value)}
        />
      </label>
      {error && !HRName.trim() && (
        <p className="text-red-500 text-xs">HR Name cannot be empty</p>
      )}

      <label className="block mb-2">
        Email
        <input
          type="email"
          className={`w-full p-2 border rounded ${
            error && !HREmail.trim() ? "border-red-500" : ""
          }`}
          value={HREmail}
          onChange={(e) => setHREmail(e.target.value)}
        />
      </label>
      {error && !HREmail.trim() && (
        <p className="text-red-500 text-xs">Email cannot be empty</p>
      )}

      <label className="block mb-2">
        Contact
        <input
          type="number"
          className={`w-full p-2 border rounded ${
            error && !HRContact.trim() ? "border-red-500" : ""
          }`}
          value={HRContact}
          onChange={(e) => setHRContact(e.target.value)}
        />
      </label>
      {error && !HRContact.trim() && (
        <p className="text-red-500 text-xs">HR Contact cannot be empty</p>
      )}

      <label className="block mb-2">
        Post
        <input
          type="text"
          className={`w-full p-2 border rounded ${
            error && !HRPost.trim() ? "border-red-500" : ""
          }`}
          value={HRPost}
          onChange={(e) => setHRPost(e.target.value)}
        />
      </label>
      {error && !HRPost.trim() && (
        <p className="text-red-500 text-xs">HR cannot be empty</p>
      )}

      <label className="block mb-2">
        Alternate contact (if any)
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={HRAlternate}
          onChange={(e) => setHRAlternate(e.target.value)}
        />
      </label>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
  );
};

export default AddHR;
