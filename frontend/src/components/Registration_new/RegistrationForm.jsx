/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import AcademicDetails from "./AcademicDetails";
import axios from "axios";

export default function RegistrationForm({handleLogout}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    tpoId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    clgId: "",
    contactNo: "",
    email: "",
    gender: "",
    dob: "",
    branch: "",
    academicYear: "",
    residence: "",
  });
  const [email, setEmailId] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmailId(email);
    console.log("email ",email);
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNo" && !/^\d*$/.test(value)) {
      return;
    }
   
    setFormData({ ...formData, [name]: value });
   
  };

  const handleValidation = () => {
    const requiredFields = [
      "tpoId",
      "firstName",
      "lastName",
      "clgId",
      "contactNo",
      "email",
      "gender",
      "dob",
      "branch",
      "academicYear",
      "residence",
    ];

    for (let field of requiredFields) {
      if (field === "email") {
        continue;
      }
      if (formData[field].length === 0) {
        console.log(field);
        alert(`Please fill in the ${field} field.`);
        return false;
      }
    }

    if (!/^TPO_\d{2}_\d{3}$/.test(formData.tpoId)) {
      alert("TPO ID should start with 'TPO_' followed by 2 numbers, an underscore, and then 3 numbers.");
      return false;
    }

    if (formData.contactNo.length !== 10) {
      alert("Enter a valid contact number.");
      return false;
    }

    return true;
  };

  const [showAcademicDetails, setShowAcademicDetails] = useState(false);

  const handleProceedClick = async () => {
    if (handleValidation()) {
      try {
        const response = await axios.put(`https://api.tpo.getflytechnologies.com/register/${email}`, {
          firstname: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          tpoId: formData.tpoId,
          clgId: formData.clgId,
          mobile: formData.contactNo,
          gender: formData.gender,
          dob: formData.dob,
          branch: formData.branch,
          ay: formData.academicYear,
          loc: formData.residence
        });
        console.log('Successfully updated record:', response.data);
        setShowAcademicDetails(true);
        setIsSubmitted(true);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Conflict error: The data you're trying to update may already exist.");
        } else {
          console.error("There was an error saving the registration!", error);
        }
      }
    }
  };

  if (showAcademicDetails) {
    if (isSubmitted) {
      return <AcademicDetails email={email} />;
    }
  }

  return (
    <>
    {/* <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-lg font-bold">Student Dashboard</div>
          <div>
            <button className="px-3 py-2 rounded hover:bg-gray-700 ">
              Home
            </button>
            <button className="px-3 py-2 rounded hover:bg-gray-700">
              Profile
            </button>
            <button className="px-3 py-2 rounded hover:bg-gray-700"
              onClick={(handleLogout)}
              
            >
              Logout
            </button>
          </div>
        </div>
      </nav> */}
    <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl mb-6 text-blue-500 text-center">
        Registration Form
      </h1>
      
  
      <form className="space-y-4" >
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
  
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
  
          <div className="w-full sm:w-1/3 px-3 mt-4">
            <label htmlFor="tpoId" className="block text-sm font-medium text-gray-700">
              TPO ID
            </label>
            <input
              type="text"
              id="tpoId"
              name="tpoId"
              value={formData.tpoId}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
  
          <div className="w-full sm:w-1/3 px-3 mt-4">
            <label htmlFor="clgId" className="block text-sm font-medium text-gray-700">
              College ID
            </label>
            <input
              type="text"
              id="clgId"
              name="clgId"
              value={formData.clgId}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
  
          <div className="w-full sm:w-1/3 px-3 mt-4">
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
              Contact No.
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full sm:w-1/3 px-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              disabled
              type="email"
              id="email"
              name="email"
              value={email}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full cursor-not-allowed opacity-50"
            />
          </div>
  
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full "
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        </div>
  
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            >
              <option value="">Select Branch</option>
              <option value="Comps">Comps</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="EXTC">EXTC</option>
            </select>
          </div>
  
          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
              Academic Year
            </label>
            <select
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            >
              <option value="">Select Year</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
        </div>
  
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label htmlFor="residence" className="block text-sm font-medium text-gray-700">
              Residence Location
            </label>
            <input
              type="text"
              id="residence"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        </div>
  
        <button
          type="button"
          className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300  px-4 py-2 "
          onClick={handleProceedClick}
        >
          Proceed to Academic Details
        </button>
      </form>
    </div>
    </>
  );
  
}
