import React from "react";
import NavbarStudent from "../TPOMain/Navbar/NavbarStudent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './components/Login/Login';
import RegistrationForm from './Registration/RegistrationForm';
import StudentDashboard from './DashBoard/Studentdashboard';
// import SignUpForm from "../Registration/SignUpForm";
// import StudentRoutes from "./components/TPOMain/Student/StudentRoutes";
import StudentNotification from "./Notification/StudentNotification";
import ProfileUpdate from "./Profile/ProfileUpdate";
import ProfileUpdate2 from "./Profile/ProfileUpdate2";
import ProfileUpdate3 from "./Profile/ProfileUpdate3";
import Navbar from "./Navbar/Navbar";

const StudentRoutes = ({handleLogout, userName, user_id}) => {
    return (
        <>
        {/* <NavbarStudent /> */}
        <Navbar/>
            {/* <Router> */}  
      {/* {istoken && <Navbar handleLogout={handleLogout} userName={userName} />} */}
      {/* <Router> */}
      {istoken && <Navbar handleLogout={handleLogout} userName={userName} />}
      <Routes>
        {/* <Route path="/" element={<Login handleLogin={handleLogin} />} /> */}
        <Route
          path="/"
          element={istoken ? <StudentDashboard /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<ProfileUpdate uid={user_id} />} />
        <Route path="/profile2/update" element={<ProfileUpdate2 uid={user_id}/>} />
        <Route path="/profile3/update" element={<ProfileUpdate3 uid={user_id}/>} />
        <Route
          path="/stu_reg/registration"
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
        <Route path="/aptitude-test" element={<AptitudeTest uid={user_id} />}/>
        <Route path="/generate_questions" element={<QuestionPage />} />
        <Route path="/complete-test" element={<CompletedTest />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/history" element={<HistoryPage uid={user_id}/>} />
        {/* <Route path="/forum" element={<StudentForumPage uid={user_id}/>} /> */}
        <Route path="/testresult" element={<TestResult />} />
        //
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/mock-interview-history" element={<HistoryComponent uid={user_id}/>} />
        <Route
            path="/interview-details/:interviewId"
            element={<InterviewDetails />}
          />{" "}
      </Routes>
    {/* </Router> */}
        </>
    )   
}

export default StudentRoutes;