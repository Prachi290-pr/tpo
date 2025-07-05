import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data"
import CompleteRegister from "./CompleteRegister";
import { useLocation, useNavigate } from "react-router-dom";

const FIleUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {email} = location.state;
  
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }; 
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('file', file);
     console.log(file);
        const response = await axios.put(`https://api.tpo.getflytechnologies.com/register/upload/${email}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('Successfully updated record:', response.data)})
          setIsSubmitted(true);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    if (isSubmitted) {
      // return <CompleteRegister  />;
      navigate('/complete');
    }

  return (
    <div>
      <div className="max-w-screen-md mx-auto  p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
        <h1 className="text-2xl mb-6 text-blue-500 text-center">
         File
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-3 mb-4">
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
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FIleUp;
