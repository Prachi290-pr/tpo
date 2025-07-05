// import React, { useState } from "react";
// import axios from 'axios';
// import api from '../../api';
// import { useNavigate } from "react-router-dom";

// const AdminSetup = () => {
//   const navigate = useNavigate();
//   const [languages, setLanguages] = useState([""]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [customRole, setCustomRole] = useState("");
//   const [selectedDateTime, setSelectedDateTime] = useState("");
//   const [title, setTitle] = useState('');

//   const handleAddLanguage = () => {
//     setLanguages([...languages, ""]);
//   };

//   const handleLanguageChange = (index, value) => {
//     const newLanguages = languages.map((lang, i) =>
//       i === index ? value : lang
//     );
//     setLanguages(newLanguages);
//   };

//   const handleGenerateClick = async () => {
//     const roleToSubmit = customRole || selectedRole;
    
//     if (
//       languages.some((lang) => !lang) ||
//       !selectedDifficulty ||
//       !roleToSubmit ||
//       !selectedDateTime
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }

//     const requestBody = {
//       role: roleToSubmit,
//       difficulty: selectedDifficulty,
//       language: languages.join(', '),
//       deadline: selectedDateTime,
//       title:title
//     };

//     try {
//       const response = await api.post('details/create', requestBody);
//       console.log(response.data);
//       alert('Interview detail created successfully');
//       clearFields();
//     } catch (error) {
//       console.error('Error creating interview detail:', error);
//       alert('Failed to create interview detail');
//     }
//   };

//   const clearFields = () => {
//     setLanguages([""]);
//     setSelectedDifficulty("");
//     setSelectedRole("");
//     setCustomRole("");
//     setSelectedDateTime("");
//     setTitle("");
//   };

//   const handleNavigateToStudentInterview = () => {
//     navigate('/all-interview-details');
//   };

//   return (
//     <div className="rounded-lg  shadow-lg max-w-4xl mx-auto mt-10">
//       <button
//         onClick={handleNavigateToStudentInterview}
//         className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
//       >
//         Student Interviews
//       </button>
//       <div className="bg-blue-500 text-white rounded-t-lg p-6 mb-6">
//         <h2 className="text-3xl font-bold text-center">Admin Setup</h2>
//       </div>
//       <div className="bg-white rounded-b-lg p-6">
//         <div className="mb-6">
//             <label className="block text-gray-800 font-bold mb-2 text-lg">Interview Title</label>
//             <input type="text" className='w-full p-3 border border-gray-300 rounded-md' onChange={(e)=>setTitle(e.target.value)}/>
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-800 font-bold mb-2 text-lg">
//             Languages
//           </label>
//           {languages.map((language, index) => (
//             <div className="flex items-center mb-3" key={index}>
//               <input
//                 type="text"
//                 className="form-input mt-1 block w-full p-2 rounded-lg shadow-sm text-gray-800 border border-gray-300"
//                 value={language}
//                 onChange={(e) => handleLanguageChange(index, e.target.value)}
//               />
//               {index === languages.length - 1 && (
//                 <button
//                   type="button"
//                   onClick={handleAddLanguage}
//                   className="ml-3 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//           ))}
//           <div className="mt-3">
//             <h3 className="text-xl font-bold mb-2 text-gray-800">
//               Entered Languages:
//             </h3>
//             <ul className="list-disc pl-5 text-gray-800">
//               {languages
//                 .filter((lang) => lang)
//                 .map((lang, index) => (
//                   <li key={index}>{lang}</li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-800 font-bold mb-2 text-lg">
//             Select Difficulty Level
//           </label>
//           <select
//             className="form-select mt-1 block w-full p-2 rounded-lg shadow-sm text-gray-800 border border-gray-300"
//             value={selectedDifficulty}
//             onChange={(e) => setSelectedDifficulty(e.target.value)}
//           >
//             <option value="">Level</option>
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//             <option value="Mixed Levels">All</option>
//           </select>
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-800 font-bold mb-2 text-lg">
//             Select Role
//           </label>
//           <select
//             className="form-select mt-1 block w-full p-2 rounded-lg shadow-sm text-gray-800 border border-gray-300"
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             disabled={!!customRole}
//           >
//             <option value="">Role</option>
//             <option value="Frontend Developer">Frontend Developer</option>
//             <option value="Backend Developer">Backend Developer</option>
//             <option value="Full Stack Developer">Full Stack Developer</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Or enter a custom role"
//             className="form-input mt-1 block w-full p-2 rounded-lg shadow-sm text-gray-800 border border-gray-300"
//             value={customRole}
//             onChange={(e) => setCustomRole(e.target.value)}
//             disabled={!!selectedRole}
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-800 font-bold mb-2 text-lg">
//             Select Date and Time
//           </label>
//           <input
//             type="datetime-local"
//             className="form-input mt-1 block w-full p-2 rounded-lg shadow-sm text-gray-800 border border-gray-300"
//             value={selectedDateTime}
//             onChange={(e) => setSelectedDateTime(e.target.value)}
//           />
//         </div>
//         <button
//           onClick={handleGenerateClick}
//           className="bg-blue-500 text-white w-full py-3 rounded-lg shadow-md hover:bg-blue-600"
//         >
//           Generate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSetup;


import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import api from "../../api";

const AdminSetup = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([""]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [batch, setBatch] = useState("");

  const [events, setEvents] = useState([]); // State to store event list
  const [selectedEvent, setSelectedEvent] = useState(''); // State to store selected event ID

   useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await api.get('/event/getAllActiveEvents');
          console.log(res.data); // Adjust endpoint based on your API
          setEvents(res.data.data); // Assume response contains an array of events
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }, []);

  const handleAddLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleLanguageChange = (index, value) => {
    const newLanguages = languages.map((lang, i) =>
      i === index ? value : lang
    );
    setLanguages(newLanguages);
  };

  const handleGenerateClick = async () => {
    const roleToSubmit = customRole || selectedRole;
    
    if (
      languages.some((lang) => !lang) ||
      !selectedDifficulty ||
      !roleToSubmit ||
      !selectedDateTime ||
      batch==''
    ) {
      alert("Please fill all fields.");
      return;
    }

    const requestBody = {
      role: roleToSubmit,
      difficulty: selectedDifficulty,
      language: languages.join(', '),
      deadline: selectedDateTime,
      title: title,
      batch:String(batch).trim(),
      event_id: selectedEvent, // Send event_id to backend
    };

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await api.post('details/create', requestBody);
      console.log(response.data);
      alert('Interview detail created successfully');
      clearFields();
    } catch (error) {
      console.error('Error creating interview detail:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFields = () => {
    setLanguages([""]);
    setSelectedDifficulty("");
    setSelectedRole("");
    setCustomRole("");
    setSelectedDateTime("");
    setTitle("");
    setBatch("");
  };

  const handleNavigateToStudentInterview = () => {
    navigate('/all-interview-details');
  };

  const removeLanguage = (indexToRemove) => {
    // Filter out the language based on the index
    setLanguages((prevLanguages) => prevLanguages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-6">
      <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">
        <button
          onClick={handleNavigateToStudentInterview}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          Student Interviews
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Interview Setup</h2>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Interview Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Event</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select an Event</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Languages</label>
          {languages.map((language, index) => (
            <div className="flex items-center mb-3" key={index}>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-800"
                value={language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
              />
              {index === languages.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="ml-3 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  +
                </button>
              )}
            </div>
          ))}
          <div className="mt-3">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Entered Languages:</h3>
            <ul className="list-disc pl-5 text-gray-800">
              {languages.filter((lang) => lang).map((lang, index) => (
               <li key={index}>
               <div className="flex justify-between items-center">
                 <span>{lang}</span>
                 <button className="text-red-500 hover:text-red-700"
                 onClick={() => removeLanguage(index)} 
                 >
                   &times;
                 </button>
               </div>
             </li>
             

              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Difficulty Level</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-800"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Mixed Levels">All</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-800"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={!!customRole}
          >
            <option value="">Select Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
          <input
            type="text"
            placeholder="Or enter a custom role"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 mt-2"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            disabled={!!selectedRole}
          />
        </div>

        <label className="block text-sm font-medium text-gray-700">Select Batch</label>
        <input className="w-full p-3 border border-gray-300 rounded-md" name='batch' onChange={(e)=>{setBatch(e.target.value)}} type="text" placeholder='For multiple batches use ,' />


        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Date and Time</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-800"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleGenerateClick}
            className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          {isError && <p className="text-red-500 mt-2">Error occurred while processing request.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
