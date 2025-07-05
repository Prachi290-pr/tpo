import React, { useState ,useEffect} from "react";
// import api from "api";
import FormData from "form-data"
import { useNavigate } from "react-router-dom";
import api from "../../../api";


const ProfileUpdate3 = ({uid}) => {
    const [studentdetails,setStudentDetails] =useState({})
    const navigate =useNavigate();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        resume:"",
        email:""
        // resumeFile: null,
      });
    const email = formData.email
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }; 
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  useEffect(() => {
    const studentdetail = async () => {
      try{
        const response = await api.post(`student/getdata/${uid}`)
        .then((response) => {
          console.log('Successfully received:',response.data)
          setStudentDetails(response.data)
        })
          
          
         } catch(err){
          console.log(err.message)
        }
  
      }
    studentdetail()
  },[uid]);


  useEffect(() => {
    if (studentdetails.length > 0) {
      const initialFormData = {
       
        email: studentdetails[0].email_id || ''
        // resumeFile: null,
      };
      setFormData(initialFormData);
    }
  }, [studentdetails]);
  const email1=formData.email;
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('file', file);
     console.log(file);
        const response = await api.put(`register/upload/${email1}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('Successfully updated record:', response.data)})
          alert("Updated");
          setIsSubmitted(true);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    if (isSubmitted) {
      navigate("/");
      window.location.reload();
    }

  return (
    <div>
      <div className="max-w-screen-md mx-auto  p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
        <h1 className="text-2xl mb-6 text-blue-500 text-center">
        Update  File
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
  )
}

export default ProfileUpdate3
