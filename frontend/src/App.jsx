// import { React, useEffect, useState } from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Navbar from './components/TPOMain/Navbar/NavbarAdmin';
// import AdminRoutes from "./components/TPOMain/Admin/AdminRoutes";
// import Login from './components/Login/Login.jsx';
// // import RegistrationForm from './components/Registration/RegistrationForm.jsx';
// // import Studentdashboard from './components/DashBoard/Studentdashboard.jsx';
// import NavbarStudent from "./components/TPOMain/Navbar/NavbarStudent.jsx";
// // import SignUpForm from "./components/Student/Registration/SignUpForm.jsx";
// // import StudentDashboard from '../../DashBoard/Studentdashboard';
// // import SignUpForm from "../../Registration/SignUpForm";
// // import StudentRoutes from "./components/TPOMain/Student/StudentRoutes";
// import StudentRoutes from "./components/Student/StudentRoutes.jsx";
// import StudentDashboard from "./components/Student/DashBoard/Studentdashboard.jsx";
// import RegistrationForm from "./components/Student/Registration/RegistrationForm.jsx";
// import StudentNotification from "./components/Student/Notification/StudentNotification.jsx";
// import ProfileUpdate from "./components/Student/Profile/ProfileUpdate.jsx";
// import ProfileUpdate2 from "./components/Student/Profile/ProfileUpdate2.jsx";
// import ProfileUpdate3 from "./components/Student/Profile/ProfileUpdate3.jsx";
// import Navbar from "./components/Student/Navbar/Navbar.jsx";
// import AptitudeTest from './components/Student/test/AptitudeTest.jsx';
// import QuestionCard from "./components/Student/interview/QuestionCard.jsx";
// import CompletedTest from './components/Student/test/CompletedTest.jsx';
// import ReviewPage from "./components/Student/test/ReviewPage";
// import HistoryPage from "./components/Student/test/HistoryPage";
// import TestResult from "./components/Student/test/TestResult";
// import MockInterview from "./components/Student/interview/MockInterview";
// import HistoryComponent from "./components/Student/interview/HistoryComponent";
// import InterviewDetails from "./components/Student/interview/InterviewDetails";
// import QuestionPage from "./components/Student/test/QuestionPage.jsx";

// const App = () => {
//   const [token, setToken] = useState("");
//   const [status_id, setStatus] = useState("");
//   const [user_id, setUID] = useState(0);
//   const [usertype, SetUserType] = useState(0);
//   const [istoken, setIstoken] = useState('');
//   const [userName, setUserName] = useState("John Doe"); // Replace with actual user name

//   const handleLogin = (newToken, uid, status, user_type, user_name) => {
//     setToken(newToken);
//     window.localStorage.setItem("token", newToken);
//     window.localStorage.setItem("uid", uid);
//     window.localStorage.setItem('user_type', user_type);
//     window.localStorage.setItem('status', status);
//     window.localStorage.setItem('user_name', user_name);
//   };


//   const handleLogout=()=>{
//     window.localStorage.clear();
//     window.location.reload();
//   }
  
//   useEffect(() => {
//     const storedToken = window.localStorage.getItem("token");
//     setIstoken(storedToken)
//     if (storedToken) {
//       setToken(storedToken);
//       const uid = window.localStorage.getItem('uid');
//       const status = window.localStorage.getItem('status');
//       const user_type = window.localStorage.getItem('user_type');
//       const email = window.localStorage.getItem('email');
//       const user_name = window.localStorage.getItem('user_name');

//       if (token) {
//         setUID(uid);
//         setStatus(status);
//         SetUserType(user_type)
//       }
//     }
//   }, [token]);

//   return (
//    <>
   
//    {usertype == 1 ? (
//           <AdminRoutes uid={user_id}/>
//         ) :
//          usertype == 3 ? (
//         //   <>
//         // <NavbarStudent />

//         //     <Routes>
//         //       <Route path="/" element={<Studentdashboard handleLogout={handleLogout}/>}></Route>
            
//         //     {/* <Route path="/dashboard/studentdashboard" element={istoken ? <StudentDashboard /> : <Navigate to="/" />} /> */}
//         //     <Route path="/profile" element={<ProfileUpdate uid={user_id} />} />
//         //     <Route path="/profile2/update" element={<ProfileUpdate2 uid={user_id} />} />
//         //     <Route path="/profile3/update" element={<ProfileUpdate3 uid={user_id} />} />
//         //     <Route path="/stu_reg/registration" element={istoken ? <RegistrationForm handleLogout={handleLogout} /> : <Navigate to="/" />} />
//         //     <Route path="/studentnotification" element={istoken ? <StudentNotification /> : <Navigate to="/" />} />
          
//         //     </Routes>
            
//         //   </>
//           // <StudentRoutes handleLogout={handleLogout} userName={userName} user_id={user_id}/>
//           <>
//         {/* <NavbarStudent /> */}
//         {/* <Navbar/> */}
//             {/* <Router> */}  
//       {/* {istoken && <Navbar handleLogout={handleLogout} userName={userName} />} */}
//       {/* <Router> */}
//       {istoken && <Navbar handleLogout={handleLogout} userName={userName} />}
//       <Routes>
//         {/* <Route path="/" element={<Login handleLogin={handleLogin} />} /> */}
//         <Route
//           path="/dashboard/studentdashboard"
//           element={istoken ? <StudentDashboard /> : <Navigate to="/" />}
//         />
//         <Route path="/profile" element={<ProfileUpdate uid={user_id} />} />
//         <Route path="/profile2/update" element={<ProfileUpdate2 uid={user_id}/>} />
//         <Route path="/profile3/update" element={<ProfileUpdate3 uid={user_id}/>} />
//         <Route
//           path="/stu_reg/registration"
//           element={
//             istoken ? (
//               <RegistrationForm handleLogout={handleLogout} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//         <Route
//           path="/studentnotification"
//           element={istoken ? <StudentNotification uid={user_id}/> : <Navigate to="/" />}
//         />
//         <Route path="/aptitude-test" element={<AptitudeTest uid={user_id} />}/>
//         <Route path="/generate_questions" element={<QuestionPage />} />
//         <Route path="/complete-test" element={<CompletedTest />} />
//         <Route path="/review" element={<ReviewPage />} />
//         <Route path="/history" element={<HistoryPage uid={user_id}/>} />
//         {/* <Route path="/forum" element={<StudentForumPage uid={user_id}/>} /> */}
//         <Route path="/testresult" element={<TestResult />} />
//         //
//         <Route path="/mock-interview" element={<MockInterview />} />
//         <Route path="/mock-interview-history" element={<HistoryComponent uid={user_id}/>} />
//         <Route
//             path="/interview-details/:interviewId"
//             element={<InterviewDetails />}
//           />{" "}
//       </Routes>
//     {/* </Router> */}
//         </>
//           // <StudentRoutes />
//         ):(

//           <Routes>

//             <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
//             {/* <Route path="/registration" element={<SignUpForm/>} /> */}
//           </Routes>
//         )}

         
// {/* </BrowserRouter> */}
      
   
      
      
//    </>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminRoutes from "./components/TPOMain/Admin/AdminRoutes";
import Login from './components/Login/Login.jsx';
import NavbarStudent from "./components/TPOMain/Navbar/NavbarStudent.jsx";
import StudentDashboard from "./components/Student/DashBoard/Studentdashboard.jsx";
import RegistrationForm from "./components/Student/Registration/RegistrationForm.jsx";
import StudentNotification from "./components/Student/Notification/StudentNotification.jsx";
import ProfileUpdate from "./components/Student/Profile/ProfileUpdate.jsx";
import ProfileUpdate2 from "./components/Student/Profile/ProfileUpdate2.jsx";
import ProfileUpdate3 from "./components/Student/Profile/ProfileUpdate3.jsx";
import Navbar from "./components/Student/Navbar/Navbar.jsx";
import AptitudeTest from './components/Student/test/AptitudeTest.jsx';
import QuestionCard from "./components/Student/interview/QuestionCard.jsx";
import CompletedTest from './components/Student/test/CompletedTest.jsx';
import ReviewPage from "./components/Student/test/ReviewPage";
import HistoryPage from "./components/Student/test/HistoryPage";
import TestResult from "./components/Student/test/TestResult";
import MockInterview from "./components/Student/interview/MockInterview";
import HistoryComponent from "./components/Student/interview/HistoryComponent";
import InterviewDetails from "./components/Student/interview/InterviewDetails";
import QuestionPage from "./components/Student/test/QuestionPage.jsx";
import RegisteredCompanies from "./components/Student/DashBoard/RegisteredCompanies.jsx";
import SignUpForm from "./components/Student/Registration/SignUpForm.jsx";
import AcademicDetails from "./components/Student/Registration/AcademicDetails.jsx";
import FIleUp from "./components/Student/Registration/FIleUp.jsx";
import CompleteRegister from "./components/Student/Registration/CompleteRegister.jsx";
import PracticalList from "./components/MachineTest/TestList.jsx";
import CodingEnvironmentPage from "./components/MachineTest/codingEnv.jsx";
import MySubmissions from "./components/MachineTest/MySubmissions.jsx";
import StudentNotificationIntership from "./components/Student/Notification/StudentNotificationIntership.jsx";
import AllEventTestReprt from "./components/reports/ALLEventTestReport.jsx";

const App = () => {
  const [token, setToken] = useState("");
  const [status_id, setStatus] = useState("");
  const [user_id, setUID] = useState(0);
  const [usertype, setUserType] = useState(0);
  const [istoken, setIstoken] = useState('');
  const [userName, setUserName] = useState("John Doe");

  const navigate = useNavigate();

  const handleLogin = (newToken, uid, status, user_type, user_name) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
    window.localStorage.setItem("uid", uid);
    window.localStorage.setItem('user_type', user_type);
    window.localStorage.setItem('status', status);
    window.localStorage.setItem('user_name', user_name);
  };
  
  const handleLogout = () => {
    // window.localStorage.clear();
    // window.location.reload();
    // navigate('/');
    window.localStorage.clear();
    window.location.href = "/";
  }
  
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    setIstoken(storedToken)
    if (storedToken) {
      setToken(storedToken);
      const uid = window.localStorage.getItem('uid');
      const status = window.localStorage.getItem('status');
      const user_type = window.localStorage.getItem('user_type');
      const email = window.localStorage.getItem('email');
      const user_name = window.localStorage.getItem('user_name');

      if (token) {
        setUID(uid);
        setStatus(status);
        setUserType(user_type)
      }
    }
  }, [token]);

  return (
    // <BrowserRouter>
      <>
        {usertype == 1 ? (
          <Routes>
            <Route path="/*" element={<AdminRoutes uid={user_id} />} />
          </Routes>
        ) : usertype == 3 ? (
          <>
            {istoken && <Navbar handleLogout={handleLogout} userName={userName} />}
            <Routes>
              <Route
                path="/"
                element={istoken ? <StudentDashboard /> : <Navigate to="/" />}
              />
              <Route path="/profile" element={<ProfileUpdate uid={user_id} />} />
              <Route path="/profile2/update" element={<ProfileUpdate2 uid={user_id}/>} />
              <Route path="/profile3/update" element={<ProfileUpdate3 uid={user_id}/>} />
              <Route
                path="/registration"
                element={
                  istoken ? (
                    <RegistrationForm handleLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/studentnotification"
                element={istoken ? <StudentNotification uid={user_id}/> : <Navigate to="/" />}
              />
              <Route
                path="/studentnotificationintership"
                element={istoken ? <StudentNotificationIntership uid={user_id}/> : <Navigate to="/" />}
              />
                <Route
                  path="/registeredcompanies"
                  element={istoken ? <RegisteredCompanies /> : <Navigate to="/" />}
                />
              <Route path="/aptitude-test" element={<AptitudeTest uid={user_id} />}/>
              <Route path="/generate_questions" element={<QuestionPage />} />
              <Route path="/complete-test" element={<CompletedTest />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/history" element={<HistoryPage uid={user_id}/>} />
              <Route path="/testresult" element={<TestResult />} />
              <Route path="/mock-interview" element={<MockInterview uid={user_id}/>} />
              <Route path="/mock-interview-history" element={<HistoryComponent uid={user_id}/>} />
              {/* <Route path="/interview-details/:interviewId" element={<InterviewDetails />} /> */}
              <Route path="/interview-details" element={<InterviewDetails />} />
              <Route path="/machineTestList" element={<PracticalList />} />
              <Route path="/mySubmissions" element={<MySubmissions />} />
              <Route path="/coding/:practicalId" element={<CodingEnvironmentPage />} />


              {/* <Route path="/registration" element={<RegistrationForm handleLogout={handleLogout} />} /> */}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/form2" element={<AcademicDetails />} />
            <Route path="/upload" element={<FIleUp />} />
            <Route path="/complete" element= {<CompleteRegister />} />
            {/* <Route
                path="/registration"
                element={
                  istoken ? (
                    <RegistrationForm handleLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              /> */}
          </Routes>
        )}
      </>
    // </BrowserRouter>
  );
};

export default App;
