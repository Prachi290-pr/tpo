import React, { useState, useEffect } from "react";
import api from "../../../api";

const RegisteredCompanies = () => {
  const [registeredcompanies, setRegisteredCompanies] = useState([]);
  const studentId = localStorage.getItem("uid");

  useEffect(() => {
    if (studentId) {
      fetchRegisteredCompanies(studentId);
    }
    console.log(studentId);
  }, [studentId]);

  const fetchRegisteredCompanies = async (studentId) => {
    try {
      console.log(studentId)
      const response = await api.get(`/rc/registeredcompanies?studentId=${studentId}`);
      setRegisteredCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-semibold">Registered Companies</h1>
        <p className="text-lg">You have registered for {registeredcompanies.length} companies.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          {registeredcompanies.map((company, index) => (
            <li key={index} className="justify-between py-2">
              <span className="font-medium">{index + 1}.</span>
              <span className="pl-3">{company.name} ({company.roles} | {company.batch_date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegisteredCompanies;
