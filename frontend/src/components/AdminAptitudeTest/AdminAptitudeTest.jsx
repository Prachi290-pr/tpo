
// import React, { useEffect, useState } from 'react';

// // Adjust the import path as needed
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';

// const aptitudeTypes = [
//     'Quantitative',
//     'Logical Reasoning',
//     'Verbal',
//     'Quantitative,Logical Reasoning,Verbal',
//   ];
  
//   const difficultyLevels = [
//     'Easy',
//     'Medium',
//     'Hard',
//     'Easy,Medium,Hard'
//   ];
  
  
//   const noofquestions = [
//       '10',
//       '20',
//       '30',
//       '40',
//       '50'
//     ];
  
  
   
//   const time = [
//     '15',
//     '30',
//     '60',
//   ]; 
  

// const AdminAptitudeTest = () => {

//     const [selectedAptitude, setSelectedAptitude] = useState('');
//     const [selectedno, setSelectedno] = useState('');
//     const [selectedDifficulty, setSelectedDifficulty] = useState('');
//     const [questions, setQuestions] = useState([]);
//     const [iserror, setIsError] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); //
//     const [selectedtime, setSelectedtime] = useState('');
//     const [title, setTitle] = useState('');
//     const [batch, setBatch] = useState('');
  
//     const navigate =useNavigate();
//     const getCurrentDateTime = () => {
//       const now = new Date();
    
//       // Get day, month, year
//       const day = String(now.getDate()).padStart(2, '0');
//       const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
//       const year = now.getFullYear();
    
//       // Get hours and minutes
//       const hours = String(now.getHours()).padStart(2, '0');
//       const minutes = String(now.getMinutes()).padStart(2, '0');
//       const seconds = String(now.getSeconds()).padStart(2, '0');
//       // Format date and time
//       const currentDate = `${day}/${month}/${year}`;
//       const currentTime = `${hours}:${minutes}:${seconds}`;
       
//       return `${currentDate} ${currentTime}`;
//     };


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(selectedAptitude,selectedno,selectedDifficulty)
//         if (selectedAptitude != ""  &&  selectedno !== "" && selectedDifficulty !== "" && selectedtime !== ""  && title!== "" && batch!='') {
//         setIsLoading(true);
//         try{
//         const res =api.post(`admin/aptitude/create`,{
//         aptitudeTypes:selectedAptitude,
//         no:selectedno,
//         level:selectedDifficulty,
//         time:selectedtime,
//         title:title,
//         batch:String(batch).trim()
//        }) .then(res => {
//         console.log(res.data);
//         setIsLoading(false);
//         alert("test is Generated")
//       })
    
      
//     }catch(error){
//         console.log(error)
//         setIsError(true);
//         setIsLoading(false);
//      //a
//     }
//         }else{alert("select all fileds")}
//       // Reload the page to allow the user to reappear for the test
//       };
      
//       const handleNavigateToStudentAptitude = () => {
//         navigate('/all-aptitude-student');
//       };
  
//   return (
//     <div className=" flex items-center justify-center bg-gray-100 py-6   px-4 sm:px-6 lg:px-8">
       
//       <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">
//       <button
//           onClick={handleNavigateToStudentAptitude}
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
//         >
//           Student Aptitude Tests
//         </button>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 text-center">MCQ Aptitude Test</h1>
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Test Title</label>
//           <input type="text" className='w-full p-3 border border-gray-300 rounded-md' onChange={(e)=>setTitle(e.target.value)}/>
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Enter Test Type</label>
//           <input
//           type='text'
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedAptitude}
//             onChange={(e) => setSelectedAptitude(e.target.value)}
//             required
//           />
          
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select no.of questions</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedno}
//             onChange={(e) => setSelectedno(e.target.value)}
//             required
//           >
//             <option value="">Select no.of questions</option>
//             {noofquestions.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select Difficulty Level</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedDifficulty}
//             onChange={(e) => setSelectedDifficulty(e.target.value)}
//             required
//           >
//             <option value="">Select Difficulty Level</option>
//             {difficultyLevels.map((level) => (
//               <option key={level} value={level.toLowerCase()}>{level}</option>
//             ))}
//           </select >

//           <label className="block text-sm font-medium text-gray-700">Select Batch</label>
//           <input className="w-full p-3 border border-gray-300 rounded-md" name='batch' onChange={(e)=>{setBatch(e.target.value)}} type="text" placeholder='For multiple batches use ,' />


//           <label className="block text-sm font-medium text-gray-700">Select Time</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedtime}
//             onChange={(e) => setSelectedtime(e.target.value)}
//             required
//           >
//             <option value="">Select Time</option>
//             {time.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//         <button
//             onClick={handleSubmit}
//             className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading} // Disable button when loading
//           >
//             {isLoading ? 'Generating...' : 'Generate'}
//           </button>
//           {iserror && <p className="text-red-500">Error occurred while processing request.</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminAptitudeTest

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

// Dropdown options for aptitude types
const aptitudeTypes = [
  'Quantitative',
  'Verbal',
  'Reasoning',
  'Quantitative Verbal and Reasoning'
];

// const AdminAptitudeTest = () => {
//   const [selectedAptitude, setSelectedAptitude] = useState('');
//   const [selectedno, setSelectedno] = useState('');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('');
//   const [iserror, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedtime, setSelectedtime] = useState('');
//   const [title, setTitle] = useState('');
//   const [batch, setBatch] = useState('');
//   const [testType, setTestType] = useState('aptitude'); // 'aptitude' or 'technical'

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (
//       selectedAptitude !== '' &&
//       selectedno !== '' &&
//       selectedDifficulty !== '' &&
//       selectedtime !== '' &&
//       title !== '' &&
//       batch !== ''
//     ) {
//       setIsLoading(true);
//       try {
//         const res = await api.post(`admin/aptitude/create`, {
//           aptitudeTypes: selectedAptitude,
//           no: selectedno,
//           level: selectedDifficulty,
//           time: selectedtime,
//           title: title,
//           batch: String(batch).trim()
//         });
//         console.log(res.data);
//         setIsLoading(false);
//         alert('Test is Generated');
//       } catch (error) {
//         console.log(error);
//         setIsError(true);
//         setIsLoading(false);
//       }
//     } else {
//       alert('Select all fields');
//     }
//   };

//   const handleNavigateToStudentAptitude = () => {
//     navigate('/all-aptitude-student');
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">
//         <button
//           onClick={handleNavigateToStudentAptitude}
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
//         >
//           Student Aptitude Tests
//         </button>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 text-center">MCQ Test</h1>
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Test Title</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md"
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         {/* Toggle button for test type */}
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Test Type</label>
//           <div className="flex items-center space-x-4">
//             <button
//               type="button"
//               onClick={() => setTestType('aptitude')}
//               className={`${
//                 testType === 'aptitude' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
//               } py-2 px-4 rounded-md`}
//             >
//               Aptitude
//             </button>
//             <button
//               type="button"
//               onClick={() => setTestType('technical')}
//               className={`${
//                 testType === 'technical' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
//               } py-2 px-4 rounded-md`}
//             >
//               Technical
//             </button>
//           </div>
//         </div>

//         {/* Conditionally render input based on test type */}
//         {testType === 'aptitude' ? (
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700">Aptitude Type</label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-md"
//               value={selectedAptitude}
//               onChange={(e) => setSelectedAptitude(e.target.value)}
//             >
//               <option value="">Select Aptitude Type</option>
//               {aptitudeTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700">Technical Test Description</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               value={selectedAptitude}
//               onChange={(e) => setSelectedAptitude(e.target.value)}
//               placeholder="Enter technical test details"
//             />
//           </div>
//         )}

//         {/* Other fields */}
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select no.of questions</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedno}
//             onChange={(e) => setSelectedno(e.target.value)}
//           >
//             <option value="">Select no.of questions</option>
//             {['10', '20', '30', '40', '50'].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select Difficulty Level</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedDifficulty}
//             onChange={(e) => setSelectedDifficulty(e.target.value)}
//           >
//             <option value="">Select Difficulty Level</option>
//             {['Easy', 'Medium', 'Hard'].map((level) => (
//               <option key={level} value={level.toLowerCase()}>
//                 {level}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select Batch</label>
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md"
//             name="batch"
//             onChange={(e) => setBatch(e.target.value)}
//             type="text"
//             placeholder="For multiple batches, use ','"
//           />
//         </div>

//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Select Time</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md"
//             value={selectedtime}
//             onChange={(e) => setSelectedtime(e.target.value)}
//           >
//             <option value="">Select Time</option>
//             {['15', '30', '60'].map((time) => (
//               <option key={time} value={time}>
//                 {time} minutes
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit button */}
//         <div>
//           <button
//             onClick={handleSubmit}
//             className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ${
//               isLoading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Generating...' : 'Generate'}
//           </button>
//           {iserror && <p className="text-red-500">Error occurred while processing request.</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAptitudeTest;

const AdminAptitudeTest = () => {
  const [selectedAptitude, setSelectedAptitude] = useState('');
  const [selectedno, setSelectedno] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [iserror, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedtime, setSelectedtime] = useState('');
  const [title, setTitle] = useState('');
  const [batch, setBatch] = useState('');
  const [testType, setTestType] = useState('aptitude'); // 'aptitude' or 'technical'

  const [events, setEvents] = useState([]); // State to store event list
  const [selectedEvent, setSelectedEvent] = useState(''); // State to store selected event ID

  const navigate = useNavigate();

  // Fetch event list from API
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      selectedAptitude !== '' &&
      selectedno !== '' &&
      selectedDifficulty !== '' &&
      selectedtime !== '' &&
      title !== '' &&
      batch !== '' &&
      selectedEvent !== ''
    ) {
      setIsLoading(true);
      try {
        const res = await api.post(`admin/aptitude/create`, {
          aptitudeTypes: selectedAptitude,
          no: selectedno,
          level: selectedDifficulty,
          time: selectedtime,
          title: title,
          batch: String(batch).trim(),
          event_id: selectedEvent, // Send event_id to backend
        });
        console.log(res.data);
        setIsLoading(false);
        alert('Test is Generated');
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    } else {
      alert('Select all fields');
    }
  };

  const handleNavigateToStudentAptitude = () => {
    navigate('/all-aptitude-student');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">
        <button
          onClick={handleNavigateToStudentAptitude}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          Student Aptitude Tests
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">MCQ Test</h1>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Test Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Dropdown for Event Names */}
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

        {/* Toggle button for test type */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Test Type</label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setTestType('aptitude')}
              className={`${
                testType === 'aptitude' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
              } py-2 px-4 rounded-md`}
            >
              Aptitude
            </button>
            <button
              type="button"
              onClick={() => setTestType('technical')}
              className={`${
                testType === 'technical' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
              } py-2 px-4 rounded-md`}
            >
              Technical
            </button>
          </div>
        </div>

        {/* Other input fields remain unchanged */}
        {/* Conditionally render input based on test type */}
         {testType === 'aptitude' ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Aptitude Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={selectedAptitude}
              onChange={(e) => setSelectedAptitude(e.target.value)}
            >
              <option value="">Select Aptitude Type</option>
              {aptitudeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Technical Test Description</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={selectedAptitude}
              onChange={(e) => setSelectedAptitude(e.target.value)}
              placeholder="Enter technical test details"
            />
          </div>
        )}

        {/* Other fields */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select no.of questions</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedno}
            onChange={(e) => setSelectedno(e.target.value)}
          >
            <option value="">Select no.of questions</option>
            {['10', '20', '30', '40','45', '50'].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Difficulty Level</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty Level</option>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <option key={level} value={level.toLowerCase()}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Batch</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md"
            name="batch"
            onChange={(e) => setBatch(e.target.value)}
            type="text"
            placeholder="For multiple batches, use ','"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Time</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedtime}
            onChange={(e) => setSelectedtime(e.target.value)}
          >
            <option value="">Select Time</option>
            {['15', '30','45', '60'].map((time) => (
              <option key={time} value={time}>
                {time} minutes
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          {iserror && <p className="text-red-500">Error occurred while processing request.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAptitudeTest;