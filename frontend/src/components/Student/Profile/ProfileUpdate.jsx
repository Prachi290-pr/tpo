import React, { useContext, useEffect, useState } from 'react'
// import api from 'api'
import ProfileUpdate2 from './ProfileUpdate2'
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
export default function ProfileUpdate ({uid})  {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [studentdetails,setStudentDetails] =useState({})
    const navigate =useNavigate()
    const initialFormData ={
      firstName: studentdetails.length > 0 ? studentdetails[0].first_name : '',
      middleName: studentdetails.length > 0 ? studentdetails[0].middle_name : '',
      lastName: studentdetails.length > 0 ? studentdetails[0].last_name : '',
      clgId: studentdetails.length > 0 ? studentdetails[0].clg_id : '',
      contactNo: studentdetails.length > 0 ? studentdetails[0].mobile : '',
      email: ((studentdetails.length > 0) ? studentdetails[0].email_id : ''),
      gender: studentdetails.length > 0 ? studentdetails[0].gender : '',
      dob: studentdetails.length > 0 ? studentdetails[0].dob : '',
      branch: studentdetails.length > 0 ? studentdetails[0].branch : '',
      academicYear: studentdetails.length > 0 ? studentdetails[0].degree : '',
      residence: studentdetails.length > 0 ? studentdetails[0].loc : ''
    };
  
    const [formData, setFormData] = useState(initialFormData);
 


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


const email = window.localStorage.getItem('email');

useEffect(() => {
  if (studentdetails.length > 0) {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
  };

  const initialFormData = {
      firstName: studentdetails[0].first_name || '',
      middleName: studentdetails[0].middle_name || '',
      lastName: studentdetails[0].last_name || '',
      clgId: studentdetails[0].clg_id || '',
      contactNo: studentdetails[0].mobile || '',
      email: studentdetails[0].email_id || '',
      gender: studentdetails[0].gender || '',
      dob: studentdetails[0].dob ? formatDate(studentdetails[0].dob) : '',
      branch: studentdetails[0].branch || '',
      academicYear: studentdetails[0].degree || '',
      residence: studentdetails[0].loc || ''
  };
    setFormData(initialFormData);
  }
}, [studentdetails]);


  
// if(studentdetails.length >0){
//   const email1 = studentdetails.map(student => student.email_id);

// }


        
  
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
        "email",
        "gender",
        "dob",
        "branch",
        "academicYear",
        "residence",
      ];
  
      for (let field of requiredFields) {
        if(field === "email"){ continue;}
        if (formData[field].length === 0) {
          console.log(field)
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
          const response = await api.put(`register/${formData.email}`, {
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
          });
  
          console.log('Successfully updated record:', response.data);
          navigate('/profile2/update');
        } catch (error) {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage('There was an error saving the registration. Please try again.');
          }
        }
      }
    };
  
    // if (showAcademicDetails) {
    //   if (isSubmitted) {
    //     return <ProfileUpdate2  />;
    //   }
    // }

  return (
    <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
    <h1 className="text-2xl mb-6 text-blue-500 text-center">
     Profile Update Form
    </h1>
    {errorMessage && (
        <div className="mb-4 text-red-500">
          {errorMessage}
        </div>
      )}
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
          <input disabled
            type="email"
            id="email"
            name="email"
            value={email}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            <option value="Female">Female</option>
            <option value="Male">Male</option>
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
  )
}


