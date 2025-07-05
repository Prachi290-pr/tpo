import React, { useEffect, useState } from "react";
// import api from "api";
import {  useNavigate } from "react-router-dom";
import api from "../../../api";


const ProfileUpdate2 = ({uid}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentdetails,setStudentDetails] =useState({})
  const navigate =useNavigate()
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
    email:"",
    interested:"",
    // resumeFile: null,
  });



  useEffect(() => {
    const studentdetail = async () => {
      try{
        const response = await api.post(`student/getdata/${uid}`)
        .then((response) => {
          console.log('Successfully received:',response.data)
          setStudentDetails(response.data)
        })
          
          
         } catch(err){
          console.log(err)
          console.log(err.message)
        }
  
      }
    studentdetail()
  },[uid]);



useEffect(() => {
  if (studentdetails.length > 0) {
    const initialFormData = {
      sscPercentage: studentdetails[0].ssc_per || '',
      sscYear: studentdetails[0].ssc_year || '',
      hscPercentage: studentdetails[0].hsc_per || '',
      hscYear: studentdetails[0].hsc_year || '',
      diplomaPercentage: studentdetails[0].diploma_per || '',
      diplomaYear: studentdetails[0].diploma_year || '',
      degreePercentage: studentdetails[0].degree_per || '',
      degreeCgpa: studentdetails[0].degree_cgpa || '',
      degreeYear: studentdetails[0].degree_year || '',
      email: studentdetails[0].email_id || '',
      interested: studentdetails[0].interested_in || '' 
      // resumeFile: null,
    };
    setFormData(initialFormData);
  }
}, [studentdetails]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// const handleChange = (e) => {
//     if (e.target.name === "resumeFile") {
//       setFormData({ ...formData, resumeFile: e.target.files[0] });
//     } else {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//     }
//   };
  

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
      "interested"
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
    const response =  api.put(`register/form2/${formData.email}`, { 
      sscPercentage:formData.sscPercentage,
      sscYear:formData.sscYear,
      hscPercentage:formData.hscPercentage,
      hscYear:formData.hscYear,
      diplomaPercentage:formData.diplomaPercentage,
      diplomaYear:formData.diplomaYear,
      degreePercentage:formData.degreePercentage,
      degreeCgpa:formData.degreeCgpa,
      degreeYear:formData.degreeYear,
      interested:formData.interested
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
    navigate("/profile3/update");
  }
  

  return (
    <div className="max-w-screen-md mx-auto  p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl mb-6 text-blue-500 text-center">
      Update  Academic Details
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="degreeYear"
            className="block text-sm font-medium text-gray-700"
          >
           Intereted in
          </label>
          <select
            type="text"
            id="interested"
            name="interested"
            value={formData.interested}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >

            <option value="">Select Option</option>
            <option value="Higher Studies">Higher Studies</option>
            <option value="Placement">Placement</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
          </select>
        </div>

        
        {/* <div className="flex flex-wrap -mx-3 mb-4">
  <div className="w-full px-3">
    <label
      htmlFor="resumeFile"
      className="block text-sm font-medium text-gray-700"
    >
      Upload Resume (PDF or Word document)
    </label>
    <input
      type="file"
      id="resumeFile"
      name="resumeFile"
      accept=".pdf,.doc,.docx"
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      required
    />
  </div>
</div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProfileUpdate2
