import React from 'react'
import StudentDashboard from '../DashBoard/Studentdashboard';


const CompleteRegister = ({email}) => {
      alert("Registration Sucessfull!");
      const studentId = window.localStorage.getItem('uid');
      return <StudentDashboard email={email} studentId={studentId}/>;
}

export default CompleteRegister;
