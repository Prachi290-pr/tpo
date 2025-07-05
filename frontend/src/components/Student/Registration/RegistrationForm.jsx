import React, { useState } from "react";
import AcademicDetails from "./AcademicDetails";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const {email} = location.state;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNo" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "clgId",
      "contactNo",
      "gender",
      "dob",
      "branch",
      "academicYear",
      "residence",
    ];

    for (let field of requiredFields) {
      if (formData[field].length === 0) {
        alert(`Please fill in the ${field} field.`);
        return false;
      }
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
        const response = await axios.put(
          `https://api.tpo.getflytechnologies.com/register/${email}`,
          {
            firstname: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            clgId: formData.clgId,
            mobile: formData.contactNo,
            gender: formData.gender,
            dob: formData.dob,
            branch: formData.branch,
            ay: formData.academicYear,
            loc: formData.residence,
          }
        );
        console.log('Successfully updated record:', response.data);
        setShowAcademicDetails(true);
        setIsSubmitted(true);
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("There was an error saving the registration. Please try again.");
        }
      }
    }
  };

  if (showAcademicDetails && isSubmitted) {
    // return <AcademicDetails email={email} />;
    navigate('/form2', {state: {email: email}});
  }

  return (
    <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl mb-6 text-blue-500 text-center">
        Registration Form
      </h1>

      {errorMessage && (
        <div className="mb-4 text-red-500">
          {errorMessage}
        </div>
      )}

      <form className="space-y-4">
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="clgId" className="block text-sm font-medium text-gray-700">
              College ID
            </label>
            <input
              type="text"
              id="clgId"
              name="clgId"
              value={formData.clgId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
              Contact No.
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Branch</option>
              <option value="CS">Comps</option>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
          onClick={handleProceedClick}
        >
          Proceed to Academic Details
        </button>
      </form>
    </div>
  );
}
