/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import FIleUp from "./FIleUp.jsx";
export default function AcademicDetails({email}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sscPercentage: "",
    sscYear: "",
    hscPercentage: "",
    hscYear: "",
    diplomaPercentage: "",
    diplomaYear: "",
    degreePercentage: "",
    degreeCgpa: "",
    degreeYear: "",
    // resumeFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isNumber = (value) => {
    return !isNaN(value) && value !== "";
  };

  const isValidYear = (value) => {
    return (
      /^\d{4}$/.test(value) &&
      value >= 1900 
    );
  };

  const isValidPercentage = (value) => {
    const numValue = parseFloat(value);
    return numValue >= 0 && numValue <= 100;
  };

  const isValidCgpa = (value) => {
    const numValue = parseFloat(value);
    return numValue >= 0 && numValue <= 10;
  };

  const handleSubmit =   (e) => {
    e.preventDefault();
    console.log("Academic Details Data:", formData);

    const requiredFields = [
      "sscPercentage",
      "sscYear",
      "degreePercentage",
      "degreeCgpa",
      "degreeYear",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    if (!formData.hscPercentage && !formData.diplomaPercentage) {
      alert("Please fill in either HSC Percentage or Diploma Percentage.");
      return;
    }

    if (!formData.hscYear && !formData.diplomaYear) {
      alert(
        "Please fill in either HSC Year of Passing or Diploma Year of Passing."
      );
      return;
    }

    if (
      (formData.hscPercentage && !formData.hscYear) ||
      (!formData.hscPercentage && formData.hscYear)
    ) {
      alert("Please fill in both HSC Percentage and HSC Year of Passing.");
      return;
    }

    if (
      (formData.diplomaPercentage && !formData.diplomaYear) ||
      (!formData.diplomaPercentage && formData.diplomaYear)
    ) {
      alert(
        "Please fill in both Diploma Percentage and Diploma Year of Passing."
      );
      return;
    }

    const percentageFields = [
      "sscPercentage",
      "hscPercentage",
      "diplomaPercentage",
      "degreePercentage",
      "degreeCgpa",
    ];

    for (let field of percentageFields) {
      if (
        formData[field] &&
        (!isNumber(formData[field]) || !isValidPercentage(formData[field]))
      ) {
        alert(`Please enter a valid number between 0 and 100 for ${field}.`);
        return;
      }
    }

    if (
      formData.degreeCgpa &&
      (!isNumber(formData.degreeCgpa) || !isValidCgpa(formData.degreeCgpa))
    ) {
      alert("Please enter a valid number between 0 and 10 for Degree CGPA.");
      return;
    }

    const yearFields = ["sscYear", "hscYear", "diplomaYear", "degreeYear"];

    for (let field of yearFields) {
      if (formData[field] && !isValidYear(formData[field])) {
        alert(`Please enter a valid year for ${field}.`);
        return;
      }
    }
    try{
    const response =  axios.put(`https://api.tpo.getflytechnologies.com/register/form2/${email}`, { 
      sscPercentage:formData.sscPercentage,
      sscYear:formData.sscYear,
      hscPercentage:formData.hscPercentage,
      hscYear:formData.hscYear,
      diplomaPercentage:formData.diplomaPercentage,
      diplomaYear:formData.diplomaYear,
      degreePercentage:formData.degreePercentage,
      degreeCgpa:formData.degreeCgpa,
      degreeYear:formData.degreeYear
    }).then((response) => {
      console.log('Successfully updated record:', response.data)})
      setIsSubmitted(true);

  }
      catch(error){
        alert("Error in update");
        console.log(error);
      }
  };
  if (isSubmitted) {
    return <FIleUp email={email} />;
  }
  

  return (
    <div className="max-w-screen-md mx-auto  p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl mb-6 text-blue-500 text-center">
        Academic Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="sscPercentage"
              className="block text-sm font-medium text-gray-700"
            >
              SSC Percentage
            </label>
            <input
              type="text"
              id="sscPercentage"
              name="sscPercentage"
              value={formData.sscPercentage}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="sscYear"
              className="block text-sm font-medium text-gray-700"
            >
              SSC Year of Passing
            </label>
            <input
              type="text"
              id="sscYear"
              name="sscYear"
              value={formData.sscYear}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="hscPercentage"
              className="block text-sm font-medium text-gray-700"
            >
              HSC Percentage
            </label>
            <input
              type="text"
              id="hscPercentage"
              name="hscPercentage"
              value={formData.hscPercentage}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="hscYear"
              className="block text-sm font-medium text-gray-700"
            >
              HSC Year of Passing
            </label>
            <input
              type="text"
              id="hscYear"
              name="hscYear"
              value={formData.hscYear}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="diplomaPercentage"
              className="block text-sm font-medium text-gray-700"
            >
              Diploma Percentage
            </label>
            <input
              type="text"
              id="diplomaPercentage"
              name="diplomaPercentage"
              value={formData.diplomaPercentage}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="diplomaYear"
              className="block text-sm font-medium text-gray-700"
            >
              Diploma Year of Passing
            </label>
            <input
              type="text"
              id="diplomaYear"
              name="diplomaYear"
              value={formData.diplomaYear}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3 shadow-lg w-full"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/3">
            <label
              htmlFor="degreePercentage"
              className="block text-sm font-medium text-gray-700"
            >
              Degree Percentage
            </label>
            <input
              type="text"
              id="degreePercentage"
              name="degreePercentage"
              value={formData.degreePercentage}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>

          <div className="w-1/3">
            <label
              htmlFor="degreeCgpa"
              className="block text-sm font-medium text-gray-700"
            >
              Degree CGPA
            </label>
            <input
              type="text"
              id="degreeCgpa"
              name="degreeCgpa"
              value={formData.degreeCgpa}
              onChange={handleChange}
              className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
            />
          </div>
        <div className="w-1/3">
          <label
            htmlFor="degreeYear"
            className="block text-sm font-medium text-gray-700"
          >
            Degree Year of Passing
          </label>
          <input
            type="text"
            id="degreeYear"
            name="degreeYear"
            value={formData.degreeYear}
            onChange={handleChange}
            className="mt-1  border border-gray-300 rounded-md flex-1 p-3  shadow-lg w-full"
          />
        </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
