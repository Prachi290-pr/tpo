import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Modal from "./Model"; // Adjusted import for Modal
import { useNavigate } from 'react-router-dom';
import api from "../../../api";
import EventCompo from "./EventCompo";

const StudentDashboard = ({ handleLogout }) => {
  const [studentId, setStudentId] = useState(null);
  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [intershipRegistered, setInershipRegister] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [email, setEmailId] = useState(null);
  const [jobPostingCompanies, setJobPostingCompanies] = useState([]);
  const [intershipPost, setIntershipPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const email = localStorage.getItem("email");
        const studentId = localStorage.getItem("uid");
        setEmailId(email);
        setStudentId(studentId);
        await fetchJobPostingCompanies(studentId);
        await fetchRegisteredCompanies(studentId);
        await fetchRegisteredIntershipCompanies(studentId);
        await fetchInternshipPostingCompanies(studentId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  const fetchJobPostingCompanies = async (studentId) => {
    try {
      const response = await api.get(`/stu/jobposts/getjobpostingcompanies/${studentId}`);
      setJobPostingCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };


  const fetchInternshipPostingCompanies = async (studentId) => {
    try {
      const response = await api.get(`/stu/jobposts/intership/getjobpostingcompanies/${studentId}`);
      setIntershipPost(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchRegisteredCompanies = async (studentId) => {
    try {
      const response = await api.get(`/addstu/students/${studentId}/registeredcompanies`);
      setRegisteredCompanies(response.data);
    } catch (error) {
      console.error("Error fetching registered companies:", error);
      throw error;
    }
  };


  const fetchRegisteredIntershipCompanies = async (studentId) => {
    try {
      const response = await api.get(`/addstu/students/internship/${studentId}/registeredcompanies`);
      setInershipRegister(response.data);
    } catch (error) {
      console.error("Error fetching registered companies:", error);
      throw error;
    }
  };

  const handleRegister = async (company) => {
    const confirmRegistration = window.confirm("Do you want to register?");
    if (confirmRegistration) {
      setSelectedCompany(company);
      if (company.tracker === 'yes') {
        setShowModal(true);
      } else {
        registerStudent(company);
      }
    }
  };

  const handleRegisterInters = async (company) => {
    const confirmRegistration = window.confirm("Do you want to register?");
    if (confirmRegistration) {
      setSelectedCompany(company);
      if (company.tracker === 'yes') {
        setShowModal(true);
      } else {
        registerStudentIntership(company);
      }
    }
  };

  const registerStudent = async (company, answers) => {
    console.log(answers);
    try {
      const response = await api.post('/addstu/setregister', {
        studentId,
        companyId: company.jobId,
        que_answers: answers,
      });
      if (response.status === 200) {
        setRegisteredCompanies((prev) => [...prev, company.jobId]);
        alert("Registered successfully!");
        if(company.extLink!='null' || company.extLink!=undefined){
          window.open(company.extLink,'_blank');
        }
        window.location.reload(); // Reload the page after successful registration
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err) {
      console.error("Error registering company:", err);
      // alert("Error registering company.");
    }
  };


  const registerStudentIntership = async (company, answers) => {
    console.log(answers);
    try {
      const response = await api.post('/addstu/intership/setregister', {
        studentId,
        companyId: company.jobId,
        que_answers: answers,
      });
      if (response.status === 200) {
        setRegisteredCompanies((prev) => [...prev, company.jobId]);
        alert("Registered successfully!");
        if(company.extLink!='null' || company.extLink!=undefined){
          window.open(company.extLink,'_blank');
        }
        window.location.reload(); // Reload the page after successful registration
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err) {
      console.error("Error registering company:", err);
    }
  };


  const handleConfirm = (answers) => {
    console.log("Submitted answers:", answers);
    registerStudent(selectedCompany, answers);
    window.location.reload();
    setShowModal(false);
    setSelectedCompany(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
    };
  }, [showModal]);

  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Eligible Companies</h1>
      {loading ? (
        <div>Loading...</div>
      ) : jobPostingCompanies.length > 0 ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobPostingCompanies.map((company, index) => (
            <DashboardCard
              key={index}
              company={company}
              onRegister={handleRegister}
              isRegistered={registeredCompanies.includes(company.jobId)}
            />
          ))}
        </div>
        </>
        ) : (
          <></>
        )}

        <br />

        {
        intershipPost.length > 0 ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {intershipPost.map((company, index) => (
          <DashboardCard
            key={index}
            company={company}
            onRegister={handleRegisterInters}
            isRegistered={intershipRegistered.includes(company.jobId)}
          />
        ))}
        </div>
        </>
      ) : <></>}

      {
        (jobPostingCompanies.length==0 && intershipPost.length==0)?
        (
          <div className="text-center text-xl text-gray-500 mt-10">
            You are not eligible for any companies at the moment.
          </div>
        ):
        <></>
      }

      

      {selectedCompany && (
        <Modal
          show={showModal}
          onClose={handleClose}
          onConfirm={handleConfirm}
          companyId={selectedCompany} // Pass companyId to the Modal
          companyName={selectedCompany.name}
          studentId={studentId}
        />
      )}
      <hr className="m-4" />
      <h1 className="text-3xl font-bold mb-6 text-center">Event Details</h1>
      <EventCompo/>
    </div>
  );
};

export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import api from "api";
// import DashboardCard from "./DashboardCard";
// import Modal from "./Model"; // Adjusted import for Modal
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = ({ handleLogout }) => {
//   const [studentId, setStudentId] = useState(null);
//   const [registeredCompanies, setRegisteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [email, setEmailId] = useState(null);
//   const [jobPostingCompanies, setJobPostingCompanies] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const email = localStorage.getItem("email");
//         const studentId = localStorage.getItem("uid");
//         setEmailId(email);
//         setStudentId(studentId);
//         await fetchJobPostingCompanies(studentId);
//         await fetchRegisteredCompanies(studentId);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };
//     fetchStudentData();
//   }, []);

//   const fetchJobPostingCompanies = async (studentId) => {
//     try {
//       const response = await api.get(`/stu/jobposts/getjobpostingcompanies/${studentId}`);
//       setJobPostingCompanies(response.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     }
//   };

//   const fetchRegisteredCompanies = async (studentId) => {
//     try {
//       const response = await api.get(`/addstu/students/${studentId}/registeredcompanies`);
//       setRegisteredCompanies(response.data);
//     } catch (error) {
//       console.error("Error fetching registered companies:", error);
//       throw error;
//     }
//   };

//   const handleRegister = async (company) => {
//     const confirmRegistration = window.confirm("Do you want to register?");
//     if (confirmRegistration) {
//       setSelectedCompany(company);
//       if (company.tracker === 'yes') {
//         setShowModal(true);
//       } else {
//         registerStudent(company);
//       }
//     }
//   };

//   const registerStudent = async (company, answers) => {
//     console.log(answers);
//     try {
//       const response = await api.post('/addstu/setregister', {
//         studentId,
//         companyId: company.jobId,
//         que_answers: answers,
//       });
//       if (response.status === 200) {
//         setRegisteredCompanies((prev) => [...prev, company.jobId]);
//         alert("Registered successfully!");
//       } else {
//         throw new Error("Registration failed.");
//       }
//     } catch (err) {
//       console.error("Error registering company:", err);
//       alert("Error registering company.");
//     }
//   };

//   const handleConfirm = (answers) => {
//     console.log("Submitted answers:", answers);
//     registerStudent(selectedCompany, answers);
//     setShowModal(false);
//     setSelectedCompany(null);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedCompany(null);
//   };

//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = "hidden"; // Disable scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Enable scrolling
//     }
//     return () => {
//       document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
//     };
//   }, [showModal]);

//   return (
//     <div className="min-h-screen flex flex-col p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Eligible Companies</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : jobPostingCompanies.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobPostingCompanies.map((company, index) => (
//             <DashboardCard
//               key={index}
//               company={company}
//               onRegister={handleRegister}
//               isRegistered={registeredCompanies.includes(company.jobId)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-xl text-gray-500 mt-10">
//           You are not eligible for any companies at the moment.
//         </div>
//       )}
//       {selectedCompany && (
//         <Modal
//           show={showModal}
//           onClose={handleClose}
//           onConfirm={handleConfirm}
//           companyId={selectedCompany} // Pass companyId to the Modal
//           companyName={selectedCompany.name}
//           studentId={studentId}
//         />
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;


// // import React, { useEffect, useState } from "react";
// // import api from "api";
// // import DashboardCard from "./DashboardCard";
// // import Modal from "./Model";
// // // import StudentNotification from "./StudentNotification";
// // import { useNavigate } from 'react-router-dom';

// // const StudentDashboard = ({ handleLogout }) => {
// //   const [studentId, setStudentId] = useState(null);
// //   const [registeredCompanies, setRegisteredCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedCompany, setSelectedCompany] = useState(null);
// //   const [email, setEmailId] = useState(null);
// //   const [jobPostingCompanies, setJobPostingCompanies] = useState([]);
// //   // const [showNotifications, setShowNotifications] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchStudentData = async () => {
// //       try {
// //         const email = localStorage.getItem("email");
// //         const studentId = localStorage.getItem("uid");
// //         setEmailId(email);
// //         setStudentId(studentId);
// //         await fetchJobPostingCompanies(studentId);
// //         await fetchRegisteredCompanies(studentId);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     };
// //     fetchStudentData();
// //   }, []);

// //   const fetchJobPostingCompanies = async (studentId) => {
// //     try {
// //       const response = await api.get(`/stu/jobposts/getjobpostingcompanies/${studentId}`);
// //       setJobPostingCompanies(response.data);
// //       // console.log(jobPostingCompanies)
// //     } catch (error) {
// //       console.error("Error fetching companies:", error);
// //     }
// //   };

// //   const fetchRegisteredCompanies = async (studentId) => {
// //     try {
// //       const response = await api.get(`/addstu/students/${studentId}/registeredcompanies`);
// //       setRegisteredCompanies(response.data);
// //     } catch (error) {
// //       console.error("Error fetching registered companies:", error);
// //       throw error;
// //     }
// //   };

// //   const handleRegister = async (company) => {
// //     const confirmRegistration = window.confirm("Do you want to register?");
// //     if (confirmRegistration) {
// //       setSelectedCompany(company);
// //       if (company.tracker === 'yes') {
// //         setShowModal(true);
// //       } else {
// //         registerStudent(company);
// //       }
// //     }
// //   };

// //   const registerStudent = (company) => {
// //     api.post('/addstu/setregister', {
// //       studentId,
// //       companyId: company.jobId,
// //     })
// //     .then((response) => {
// //       if (response.status === 200) {
// //         setRegisteredCompanies([...registeredCompanies, company.jobId]);
// //         // console.log(company.jobId);
// //         alert("Registered successfully!");
// //       } else {
// //         throw new Error("Registration failed.");
// //       }
// //     })
// //     .catch((err) => {
// //       console.error("Error registering company:", err);
// //       alert("Error registering company.");
// //     });
// //   };

// //   // const handleNotificationClick = () => {
// //   //   navigate('/StudentNotification');
// //   // };

// //   const handleConfirm = (answers) => {
// //     console.log("Submitted answers:", answers);
// //     registerStudent(selectedCompany);
// //     setShowModal(false);
// //     setSelectedCompany(null);
// //   };

// //   const handleClose = () => {
// //     setShowModal(false);
// //     setSelectedCompany(null);
// //   };

// //   useEffect(() => {
// //     if (showModal) {
// //       document.body.style.overflow = "hidden"; // Disable scrolling
// //     } else {
// //       document.body.style.overflow = "auto"; // Enable scrolling
// //     }
// //     return () => {
// //       document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
// //     };
// //   }, [showModal]);

// //   return (
// //     <div className="min-h-screen flex flex-col p-6">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Eligible Companies</h1>
// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : jobPostingCompanies.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {/* {console.log("jobs",jobPostingCompanies)} */}
// //           {jobPostingCompanies.map((company, index) => (
// //             <DashboardCard
// //               key={index}
// //               company={company}
// //               onRegister={handleRegister}
// //               isRegistered={registeredCompanies.includes(company.jobId)}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center text-xl text-gray-500 mt-10">
// //           You are not eligible for any companies at the moment.
// //         </div>
// //       )}
// //       {selectedCompany && (
// //         <Modal 
// //           show={showModal} 
// //           onClose={handleClose} 
// //           onConfirm={handleConfirm} 
// //           companyId={selectedCompany} // Pass companyId to the Modal
// //           companyName={selectedCompany.name}
// //           studentId={studentId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default StudentDashboard;


// // // import React, { useEffect, useState } from "react";
// // // import api from "api";
// // // import DashboardCard from "./DashboardCard";
// // // import Modal from "./Model";
// // // // import StudentNotification from "./StudentNotification";
// // // import { useNavigate } from 'react-router-dom';

// // // const StudentDashboard = ({ handleLogout }) => {
// // //   const [studentId, setStudentId] = useState(null);
// // //   const [registeredCompanies, setRegisteredCompanies] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [selectedCompany, setSelectedCompany] = useState(null);
// // //   const [email, setEmailId] = useState(null);
// // //   const [jobPostingCompanies, setJobPostingCompanies] = useState([]);
// // //   // const [showNotifications, setShowNotifications] = useState(false);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchStudentData = async () => {
// // //       try {
// // //         const email = localStorage.getItem("email");
// // //         const studentId = localStorage.getItem("uid");
// // //         setEmailId(email);
// // //         setStudentId(studentId);
// // //         await fetchJobPostingCompanies(studentId);
// // //         await fetchRegisteredCompanies(studentId);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchStudentData();
// // //   }, []);

// // //   const fetchJobPostingCompanies = async (studentId) => {
// // //     try {
// // //       const response = await api.get(`/jobs/getjobpostingcompanies/${studentId}`);
// // //       setJobPostingCompanies(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching companies:", error);
// // //     }
// // //   };

// // //   const fetchRegisteredCompanies = async (studentId) => {
// // //     try {
// // //       const response = await api.get(`/addstu/students/${studentId}/registeredcompanies`);
// // //       setRegisteredCompanies(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching registered companies:", error);
// // //       throw error;
// // //     }
// // //   };

// // //   const handleRegister = async (company) => {
// // //     setSelectedCompany(company);
// // //     if (company.tracker === 'yes') {
// // //       setShowModal(true);
// // //     } else {
// // //       registerStudent(company);
// // //     }
// // //   };

// // //   const registerStudent = (company) => {
// // //     api.post('/addstu/setregister', {
// // //       studentId,
// // //       companyId: company.id,
// // //     })
// // //     .then((response) => {
// // //       if (response.status === 200) {
// // //         setRegisteredCompanies([...registeredCompanies, company.id]);
// // //         alert("Registered successfully!");
// // //       } else {
// // //         throw new Error("Registration failed.");
// // //       }
// // //     })
// // //     .catch((err) => {
// // //       console.error("Error registering company:", err);
// // //       alert("Error registering company.");
// // //     });
// // //   };

// // //   const handleNotificationClick = () => {
// // //     navigate('/StudentNotification');
// // //   };

// // //   const handleConfirm = (answers) => {
// // //     console.log("Submitted answers:", answers);
// // //     registerStudent(selectedCompany);
// // //     setShowModal(false);
// // //     setSelectedCompany(null);
// // //   };

// // //   const handleClose = () => {
// // //     setShowModal(false);
// // //     setSelectedCompany(null);
// // //   };

// // //   useEffect(() => {
// // //     if (showModal) {
// // //       document.body.style.overflow = "hidden"; // Disable scrolling
// // //     } else {
// // //       document.body.style.overflow = "auto"; // Enable scrolling
// // //     }
// // //     return () => {
// // //       document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
// // //     };
// // //   }, [showModal]);

// // //   return (
// // //     <div className="min-h-screen flex flex-col p-6">
// // //       <h1 className="text-3xl font-bold mb-6 text-center">Eligible Companies</h1>
// // //       {loading ? (
// // //         <div>Loading...</div>
// // //       ) : jobPostingCompanies.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //           {jobPostingCompanies.map((company, index) => (
// // //             <DashboardCard
// // //               key={index}
// // //               company={company}
// // //               onRegister={handleRegister}
// // //               isRegistered={registeredCompanies.includes(company.id)}
// // //             />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center text-xl text-gray-500 mt-10">
// // //           You are not eligible for any companies at the moment.
// // //         </div>
// // //       )}
// // //       {selectedCompany && (
// // //         <Modal 
// // //           show={showModal} 
// // //           onClose={handleClose} 
// // //           onConfirm={handleConfirm} 
// // //           companyId={selectedCompany.id} // Pass companyId to the Modal
// // //           companyName={selectedCompany.name}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default StudentDashboard;


// // // // // import React, { useEffect, useState } from "react";
// // // // // import api from "api";
// // // // // import DashboardCard from "./DashboardCard";
// // // // // import Modal from "./Model";

// // // // // const StudentDashboard = ({ handleLogout }) => {
// // // // //   const [studentId, setStudentId] = useState(null);
// // // // //   const [registeredCompanies, setRegisteredCompanies] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [showModal, setShowModal] = useState(false);
// // // // //   const [selectedCompany, setSelectedCompany] = useState(null);
// // // // //   const [email, setEmailId] = useState(null);
// // // // //   const [jobPostingCompanies, setJobPostingCompanies] = useState(null);
// // // // //   // const [showNotifications, setShowNotifications] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchStudentData = async () => {
// // // // //       try {
// // // // //         const email = localStorage.getItem("email");
// // // // //         const studentId = localStorage.getItem("uid");
// // // // //         setEmailId(email);
// // // // //         setStudentId(studentId);
// // // // //         console.log("email ", email);
// // // // //         console.log("stid from sds", studentId);
// // // // //         await fetchJobPostingCompanies();
// // // // //         await fetchRegisteredCompanies(studentId);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching data:", error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchStudentData();
// // // // //   }, []);

// // // // //   const fetchJobPostingCompanies = async () => {
// // // // //     try {
// // // // //       const response = await api.get("/jobs/getjobpostingcompanies");
// // // // //       setJobPostingCompanies(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching companies:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   const fetchRegisteredCompanies = async (studentId) => {
// // // // //     try {
// // // // //       const response = await api.get(`/addstu/students/${studentId}/registeredcompanies`);
// // // // //       setRegisteredCompanies(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching registered companies:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   const handleRegister = async (company) => {
// // // // //     setSelectedCompany(company);
// // // // //     if (company.tracker === 'yes') {
// // // // //       setShowModal(true);
// // // // //     } else {
// // // // //       registerStudent(company);
// // // // //     }
// // // // //   };

// // // // //   const registerStudent = (company) => {
// // // // //     api.post('/addstu/setregister', {
// // // // //       studentId,
// // // // //       companyId: company.id,
// // // // //     })
// // // // //     .then((response) => {
// // // // //       if (response.status === 200) {
// // // // //         setRegisteredCompanies([...registeredCompanies, company.id]);
// // // // //         alert("Registered successfully!");
// // // // //       } else {
// // // // //         throw new Error("Registration failed.");
// // // // //       }
// // // // //     })
// // // // //     .catch((err) => {
// // // // //       console.error("Error registering company:", err);
// // // // //       alert("Error registering company.");
// // // // //     });
// // // // //   };

// // // // //   const handleConfirm = (answers) => {
// // // // //     console.log("Submitted answers:", answers);
// // // // //     registerStudent(selectedCompany);
// // // // //     setShowModal(false);
// // // // //     setSelectedCompany(null);
// // // // //   };

// // // // //   const handleClose = () => {
// // // // //     setShowModal(false);
// // // // //     setSelectedCompany(null);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (showModal) {
// // // // //       document.body.style.overflow = "hidden"; // Disable scrolling
// // // // //     } else {
// // // // //       document.body.style.overflow = "auto"; // Enable scrolling
// // // // //     }

// // // // //     return () => {
// // // // //       document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
// // // // //     };
// // // // //   }, [showModal]);

// // // // //   return (
// // // // //     <div className="min-h-screen p-6 flex flex-col lg:mx-10">
// // // // //       {/* Navbar */}
// // // // //       <nav className="bg-gray-800 text-white p-4">
// // // // //         <div className="container mx-auto flex justify-between">
// // // // //           <div className="text-lg font-bold">Student Dashboard</div>
// // // // //           <div>
// // // // //             <button className="px-3 py-2 rounded hover:bg-gray-700">
// // // // //               Home
// // // // //             </button>
// // // // //             <button className="px-3 py-2 rounded hover:bg-gray-700">
// // // // //               Profile
// // // // //             </button>
// // // // //             <button className="px-3 py-2 rounded hover:bg-gray-700"
// // // // //               onClick={handleLogout}
// // // // //             >
// // // // //               Logout
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </nav>
// // // // //       <h1 className="text-3xl font-bold mb-6 text-center">Eligible Companies</h1>
// // // // //       <br/>
// // // // //       Email: {email}
// // // // //       <br/>
// // // // //       {loading ? (
// // // // //         <div>Loading...</div>
// // // // //       ) : (
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //           {jobPostingCompanies.map((company, index) => (
// // // // //             <DashboardCard
// // // // //               key={index}
// // // // //               company={company}
// // // // //               onRegister={handleRegister}
// // // // //               isRegistered={registeredCompanies.includes(company.id)}
// // // // //             />
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //       {selectedCompany && (
// // // // //         <Modal 
// // // // //           show={showModal} 
// // // // //           onClose={handleClose} 
// // // // //           onConfirm={handleConfirm} 
// // // // //           companyId={selectedCompany.id} // Pass companyId to the Modal
// // // // //           companyName={selectedCompany.name}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default StudentDashboard;

