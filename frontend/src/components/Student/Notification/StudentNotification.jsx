import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentForumPage from "./studentForum";

const api = axios.create({
  baseURL: 'https://api.tpo.getflytechnologies.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const StudentNotification = ({uid}) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [response, setResponse] = useState("");
  const [forum, setForum] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [jobPostingId, setJobPostingId] = useState(null);
  const [question, setQuestion] = useState("");
  const [isForum, setIsForm] = useState(false);

  // const navigate = useNavigate();
  

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("jobpostings/company-name-jobpost");
        setCompanies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const fetchAnnouncements = async (jobPostingId) => {
    try {
      const response = await api.get(`announcements/${jobPostingId}`);
      if (response.status === 200) {
        if (response.data && response.data.length > 0) {
          setUpdates(response.data);
          console.log(response.data);
        } else {
          console.log('No announcements found for jobPostingId:', jobPostingId);
          setUpdates([]);
        }
      } else {
        console.error('Unexpected status:', response.status);
      }
    } catch (error){
        console.error('Error fetching updates:', error);
        setUpdates([]);
}
};

const fetchForums = async (jobPostingId) => {
try {
  const response = await api.get(`forums/chats/${jobPostingId}`);
  if (response.status === 200) {
    if (response.data && response.data.length > 0) {
      setForum(response.data);
      console.log(response.data);
    } else {
      console.log('No forums found for jobPostingId:', jobPostingId);
      setForum([]);
    }
  } else {
    console.error('Unexpected status:', response.status);
  }
} catch (error) {
  console.error('Error fetching forums:', error);
  setForum([]);
}
};

const handleCompanyChange = (companyId) => {
setSelectedCompany(companyId);
const selectedCompany = companies.find(c => c.jobPostingId === parseInt(companyId));

if (selectedCompany) {
  const { jobPostingId } = selectedCompany;
  if (jobPostingId) {
    fetchAnnouncements(jobPostingId);
    fetchForums(jobPostingId);
    setJobPostingId(jobPostingId);
  } else {
    console.log("No jobPostingId found for selected company.");
    setJobPostingId(null);
  }
} else {
  console.log("Selected company not found in companies array.");
  setJobPostingId(null);
}
};

// const handleQuestionSubmit = async (question) => {
// try {
//   const timestamp = new Date().toISOString();

//   const response = await api.post("forums/chats", {
//     jobCompanyId: jobPostingId,
//     userId: uid, // hardcoded student id change it later when integrating with the student side modules
//     message: question,
//     timestamp: timestamp,
//   });

//   if (response.status === 201) {
//     fetchForums(jobPostingId);
//     setResponse("Question submitted successfully");
//   } else {
//     setResponse("Failed to submit question");
//   }
// } catch (error) {
//   console.error("Error submitting question:", error);
//   setResponse("Error submitting question");
// }
// };


const  handleQuestionSubmit = async () => {
  const data = {
    jobCompanyId: jobPostingId, // Make sure this is not null
    userId: uid,
    message: question,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await axios.post('https://api.tpo.getflytechnologies.com/forums/chats', data);
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
};

const handleOpenQuestionModal = () => {
const dialog = document.getElementById("question-dialog");
if (dialog) {
  dialog.showModal();
}
};

const handleCloseQuestionModal = () => {
const dialog = document.getElementById("question-dialog");
if (dialog) {
  dialog.close();
}
};

const clearFilter = () => {
setSelectedCompany("");
setResponse("");
setForum([]);
setUpdates([]);
setJobPostingId(null);
};

// const handleBack = () => {
//   navigate('/dashboard/studentdashboard');
// };

const goToForum =()=>{
  setIsForm(!isForum);
}


return (
  <div className="container mx-auto p-6">
    <div className="row">
      {
        !isForum && 
        <div className="col-md-6">
        <div className="flex justify-between m-4">
            <select
              className="w-full sm:w-1/4 border shadow-md rounded-md p-2"
              value={selectedCompany}
              onChange={(e) => handleCompanyChange(e.target.value)}
            >
              <option value="">--Select Company--</option>
              {companies.map((company) => (
                <option key={company.jobPostingId} value={company.jobPostingId}>
                  {company.companyName}
                </option>
              ))}
            </select>
          <button className="w-full sm:w-1/4 border shadow-md rounded-md p-2" onClick={clearFilter}>
            Clear Filter
          </button>
  
          <button className="w-full sm:w-1/4 border shadow-md rounded-md p-2" onClick={goToForum}>
            Go To Forum
          </button>
        </div>
        
        {selectedCompany && (
          <>
            <div className="perfectMatch">
                <p>Displaying the Recent Updates of the Company</p>
                {/* <div className="line"></div> */}
              </div>
              <div className="overflow-x-auto container">
                <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-center text-sm font-medium text-white">Time and Date</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-white">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {updates.map((update, index) => (
                      <tr key={index}>
                        <td>{new Date(update.createdAt).toLocaleString()}</td>
                        <td>{update.announcement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            {/* <div className="buttonContainer">
              <button className="primary" onClick={handleOpenQuestionModal}>
                Ask a Question
              </button>
            </div> */}
            {response && <p className="text-success">{response}</p>}
          </>
        )}
      </div>
      }
      
      {
        isForum && 
        <>
        <div className="col-md-6 mb-3">
            <button className="w-full sm:w-1/4 border shadow-md rounded-md p-2" onClick={goToForum}>
                  Go To Announcement
            </button>
        </div>
        <StudentForumPage uid={uid}/>
        </>
      }
      
    </div>
   
  </div>
  );
};

export default StudentNotification;








// import React, { useState, useEffect } from "react";
// // import "./App.css";
// import api from "./api";
// import axios from "axios";



// const api = axios.create({
//   baseURL: 'https://api.tpo.getflytechnologies.com/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// const StudentNotification = () => {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [response, setResponse] = useState("");
//   const [forum, setForum] = useState([]);
//   const [updates, setUpdates] = useState([]);
//   const [jobPostingId, setJobPostingId] = useState(null);
//   const [question, setQuestion] = useState("");


//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await api.get("jobpostings/company-name-jobpost");
//         setCompanies(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const fetchAnnouncements = async (jobPostingId) => {
//     try {
//       const response = await api.get(`announcements/${jobPostingId}`);
//       if (response.status === 200) {
//         if (response.data && response.data.length > 0) {
//           setUpdates(response.data);
//           console.log(response.data);
//         } else {
//           console.log('No announcements found for jobPostingId:', jobPostingId);
//           setUpdates([]);
//         }
//       } else {
//         console.error('Unexpected status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching updates:', error);
//       setUpdates([]);
//     }
//   };
  
//   const fetchForums = async (jobPostingId) => {
//     try {
//       const response = await api.get(`forums/${jobPostingId}`);
//       if (response.status === 200) {
//         if (response.data && response.data.length > 0) {
//           setForum(response.data);
//           console.log(response.data);
//         } else {
//           console.log('No forums found for jobPostingId:', jobPostingId);
//           setForum([]);
//         }
//       } else {
//         console.error('Unexpected status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching forums:', error);
//       setForum([]);
//     }
//   };

//   const handleCompanyChange = (companyId) => {
//     setSelectedCompany(companyId);
//     const selectedCompany = companies.find(c => c.jobPostingId === parseInt(companyId));
//     if (selectedCompany) {
//       const { jobPostingId } = selectedCompany;
//       if (jobPostingId) {
//         fetchAnnouncements(jobPostingId);
//         fetchForums(jobPostingId);
//         setJobPostingId(jobPostingId);
//       } else {
//         console.log("No jobPostingId found for selected company.");
//         setJobPostingId(null);
//       }
//     } else {
//       console.log("Selected company not found in companies array.");
//       setJobPostingId(null);
//     }
//   };

//   const handleQuestionSubmit = async () => {
//     try {
//       const response = await api.post("forums", {
//         post_id: jobPostingId,
//         stud_id: 1, // hardcoded student id change it later when integrating with the student side modules
//         question
//       });

//       if (response.status === 201) {
//         fetchForums(jobPostingId);
//         setResponse("Question submitted successfully");
//         setQuestion("");
//       } else {
//         setResponse("Failed to submit question");
//       }
//     } catch (error) {
//       console.error("Error submitting question:", error);
//       setResponse("Error submitting question");
//     }
//   };

//   const handleOpenQuestionModal = () => {
//     const dialog = document.getElementById("question-dialog");
//     if (dialog) {
//       dialog.showModal();
//     }
//   };

//   const handleCloseQuestionModal = () => {
//     const dialog = document.getElementById("question-dialog");
//     if (dialog) {
//       dialog.close();
//     }
//   };

//   const clearFilter = () => {
//     setSelectedCompany("");
//     setResponse("");
//     setForum([]);
//     setUpdates([]);
//     setJobPostingId(null);
//   };

//   return (
//     <div className="app-container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="component-container">
//             <label className="form-label">Select Company:</label>
//             <div className="dropdown-container">
//               <select
//                 className="form-select"
//                 value={selectedCompany}
//                 onChange={(e) => handleCompanyChange(e.target.value)}
//               >
//                 <option value="">--Select Company--</option>
//                 {companies.map((company) => (
//                   <option key={company.jobPostingId} value={company.jobPostingId}>
//                     {company.companyName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <button className="btn-clear" onClick={clearFilter}>
//             Clear Filter
//           </button>
//           {selectedCompany && (
//             <>
//               <div className="table-container">
//                 <div className="perfectMatch">
//                   <h2>Announcements</h2>
//                   <p>Displaying the Recent Updates of the Company</p>
//                   <div className="line"></div>
//                 </div>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Time and Date</th>
//                       <th>Details</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {updates.map((update, index) => (
//                       <tr key={index}>
//                         <td>{new Date(update.createdAt).toLocaleString()}</td>
//                         <td>{update.announcement}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="buttonContainer">
//                 <button className="primary" onClick={handleOpenQuestionModal}>
//                   Ask a Question
//                 </button>
//               </div>
//               {response && <p className="text-success">{response}</p>}
//             </>
//           )}
//         </div>
//         <div className="col-md-6">
//           {selectedCompany && (
//             <div className="forum-container">
//               <h2>Forum</h2>
//               {forum &&
//                 forum.map(({ id, question, answer, question_time, answer_time }) => (
//                   <div key={id} className="card mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">Q: {question}</h5>
//                       <p className="card-text">
//                         <small>Posted on: {new Date(question_time).toLocaleString()}</small>
//                       </p>
//                       {answer ? (
//                         <>
//                           <h4 className="card-text">A: {answer}</h4>
//                           <p className="card-text">
//                             <small>Answered on: {new Date(answer_time).toLocaleString()}</small>
//                           </p>
//                         </>
//                       ) : (
//                         <p className="card-text">No answer yet</p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <dialog id="question-dialog" className="modal">
//         <div className="modal-content">
//           <h2>Ask a Question</h2>
//           <textarea
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Type your question here..."
//             style={{
//               height: "150px",
//               width: "100%",
//               fontSize: "18px",
//               textAlign: "center",
//             }}
//           />
//           <div className="button-group">
//             <button className="primary" onClick={handleQuestionSubmit}>
//               Submit
//             </button>
//             <button className="secondary" onClick={handleCloseQuestionModal}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default StudentNotification;
