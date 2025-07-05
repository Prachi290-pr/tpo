/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../api";

const fieldToColumnName = {
  tpo_id: "TPO ID",
  clg_id: "College ID",
  branch: "Branch",
  mobile: "Mobile",
  gender: "Gender",
  degree: "Degree",
  dob: "Date of Birth",
  loc: "Location",
  ssc_per: "SSC Percentage",
  ssc_year: "SSC Year",
  hsc_per: "HSC Percentage",
  hsc_year: "HSC Year",
  diploma_per: "Diploma Percentage",
  diploma_year: "Diploma Year",
  degree_per: "Degree Percentage",
  degree_cgpa: "Degree CGPA",
  degree_year: "Degree Year",
  resume: "Resume",
  first_name: "First Name",
  middle_name: "Middle Name",
  last_name: "Last Name",
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const IndiERPReport = ({ student }) => {
  const [showRegistered, setShowRegistered] = useState(false);
  const [showPlaced, setShowPlaced] = useState(false);
  const [showEligibleCount, setShowEligibleCount] = useState(false);
  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [placedCompanies, setPlacedCompanies] = useState([]);
  const [eligibleCompaniesCount, setEligibleCompaniesCount] = useState(0);

  useEffect(() => {
    if (showRegistered) {
      // Fetch registered companies for the student
      api.get(`/indierp/geterpregistered?studentId=${student.id}`)
        .then(response => {
          setRegisteredCompanies(response.data);
        })
        .catch(error => {
          console.error("Error fetching registered companies:", error);
        });
    } 
    if (showPlaced) {
      // Fetch placed companies for the student
      api.get(`/indierp/geterpplaced?studentId=${student.id}`)
        .then(response => {
          setPlacedCompanies(response.data);
        })
        .catch(error => {
          console.error("Error fetching placed companies:", error);
        });
    }
    if (showEligibleCount) {
      // Fetch count of eligible companies for the student
      api.get(`/indierp/geterpeligiblecount?studentId=${student.id}`)
        .then(response => {
          setEligibleCompaniesCount(response.data.eligible_count);
        })
        .catch(error => {
          console.error("Error fetching eligible companies count:", error);
        });
    }
  }, [showRegistered, showPlaced,showEligibleCount, student.id]);

  const handleShowRegistered = () => {
    setShowRegistered(!showRegistered);
    setShowPlaced(false);
    setShowEligibleCount(false);
  };

  const handleShowPlaced = () => {
    setShowPlaced(!showPlaced);
    setShowRegistered(false);
    setShowEligibleCount(false);
  };

  const handleShowEligibleCount = () => {
    setShowEligibleCount(!showEligibleCount);
    setShowRegistered(false);
    setShowPlaced(false);
  };

  const fullName = `${student.first_name || ''} ${student.middle_name || ''} ${student.last_name || ''}`.trim() || '-';

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 border border-gray-100 rounded-md">
      <div className="flex flex-wrap gap-6 justify-center w-full">
        <div className="bg-white border border-gray-100 rounded-md p-4 w-60 inline-block">
          <div className="font-semibold mb-2">Name:</div>
          <div className="break-words">{fullName}</div>
        </div>
        {Object.keys(fieldToColumnName).map((field) => (
          field !== "first_name" && field !== "middle_name" && field !== "last_name" && (
            <div key={field} className="bg-white border border-gray-100 rounded-md p-4 w-60 inline-block">
              <div className="font-semibold mb-2">{fieldToColumnName[field]}:</div>
              <div className="break-words">
                {field === "resume" ? (
                  student[field] ? (
                    <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/resume/${student[field]}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View Resume
                    </a>
                  ) : '-'
                ) : field === "dob" ? (
                  formatDate(student[field])
                ) : (
                  student[field] || '-'
                )}
              </div>
            </div>
          )
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleShowRegistered}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {showRegistered ? 'Hide Registered Companies' : 'Show Registered Companies'}
        </button>
        <button
          onClick={handleShowPlaced}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {showPlaced ? 'Hide Placed Companies' : 'Show Placed Companies'}
        </button>
        <button
          onClick={handleShowEligibleCount}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {showEligibleCount ? 'Hide Eligible Companies Count' : 'Show Eligible Companies Count'}
        </button>
      </div>
      {showRegistered && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md w-full text-center bg-gray-200">
          {registeredCompanies.length > 0 ? (
            registeredCompanies.map((company, index) => (
              <div key={index}>{company.name}</div>
            ))
          ) : (
            <div>No registered companies found</div>
          )}
        </div>
      )}
      {showPlaced && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md w-full text-center bg-gray-200">
          {placedCompanies.length > 0 ? (
            placedCompanies.map((company, index) => (
              <div key={index}>{company.name}</div>
            ))
          ) : (
            <div>No placed companies found</div>
          )}
        </div>
      )}
      {showEligibleCount && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md w-full text-center bg-gray-200">
          {eligibleCompaniesCount !== null ? (
            <div>Eligible Companies Count: {eligibleCompaniesCount}</div>
          ) : (
            <div>No eligible companies count available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndiERPReport;
