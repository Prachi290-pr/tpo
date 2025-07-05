/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { Form, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CompanyList from "./components/pages/CompanyList";
import StudentsList from "./components/pages/StudentsList";
import StudentsForRoundThree from "./components/pages/StudentsForRoundThree";
import StudentsForRoundFour from "./components/pages/StudentsForRoundFour";
import StudentsForRoundTwo from "./components/pages/StudentsForRoundTwo";
import PlacedStudents from "./components/pages/PlacedStudents";
import CompanyDashboard from "./components/Company Communication/CompanyDashBoard.jsx";
import HRDash from "./components/HRADD/HRDash.jsx";
import CompanyRemark from "./components/Company Remark/CompanyRemark.jsx";
import Reconnect from "./components/Recontact/Reconnect.jsx";
import TableComponentContainer from "./components/ConfrimCompanies/TableComponentContainer.jsx";
import JobPostingContainer from "./components/JobPosting/JobPostingContainer.jsx";
import AdminForum from "./components/adminforum/AdminForum.jsx";
import Forums from "./components/adminforum/ForumsDetails";
import Announcement from "./components/announcement/Announcement";
// import RegistrationForm from "./components/Registration/RegistrationForm.jsx";
import PlacedStudentsReport from "./components/reports/PlacedStudentsReport.jsx";
import UnplacedStudents from "./components/reports/UnplacedStudents.jsx";
import CompanyTableGenerator from "./components/reports/CompanyTableGenerator.jsx";
import CompanyWisePlaced from "./components/reports/CompanyWisePlaced.jsx";
import CompanywiseData from "./components/reports/CompanywiseData.jsx";
import ERPReport from "./components/reports/ERPReport.jsx";

import GenderwiseData from "./components/reports/GenderwiseData.jsx";
import ReportsContainer from "./components/reports/ReportsContainer.jsx";
import StudentTableGenerator from "./components/reports/StudentTableGenerator.jsx";
import IndiERPReport from "./components/reports/IndiERPReport.jsx";
import Report_nav from "./components/reports/Report_nav.jsx";
import AdminAptitudeTest from "./components/AdminAptitudeTest/AdminAptitudeTest.jsx";
import AdminDashBoard from "./components/adminDashboard/adminDashboard.jsx";
import AdminSetup from "./components/adminMockInterview/adminSetup.jsx";
import StudentDashboard from "./components/Student/DashBoard/Studentdashboard.jsx";
import ProfileUpdate from "./components/Student/Profile/ProfileUpdate.jsx";
import ProfileUpdate2 from "./components/Student/Profile/ProfileUpdate2.jsx";
import ProfileUpdate3 from "./components/Student/Profile/ProfileUpdate3.jsx";
import StudentNotification from "./components/Student/Notification/StudentNotification.jsx";
import AptitudeTest from "./components/Student/test/AptitudeTest.jsx";
import QuestionPage from "./components/Student/test/QuestionPage.jsx";
import CompletedTest from "./components/Student/test/CompletedTest.jsx";
import ReviewPage from "./components/Student/test/ReviewPage.jsx";
import HistoryPage from "./components/Student/test/HistoryPage.jsx";
import TestResult from "./components/Student/test/TestResult.jsx";
import MockInterview from "./components/Student/interview/MockInterview.jsx";
import HistoryComponent from "./components/Student/interview/HistoryComponent.jsx";
import InterviewDetails from "./components/Student/interview/InterviewDetails.jsx";
import RegistrationForm from "./components/Student/Registration/RegistrationForm.jsx";
import RegisteredCompanies from "./components/Student/DashBoard/RegisteredCompanies.jsx";
import RSLReport from './components/reports/RSLReport.jsx';
import SearchIndiERPReport from "./components/reports/SearchIndiERPReport.jsx";
import SignUpForm from "./components/Student/Registration/SignUpForm.jsx";
import AcademicDetails from "./components/Student/Registration/AcademicDetails.jsx";
import FIleUp from "./components/Student/Registration/FIleUp.jsx";
import CompleteRegister from "./components/Student/Registration/CompleteRegister.jsx";
import StudentInterview from "./components/adminMockInterview/eachStudentInterviews.jsx";
import StudentInterviewDetails from "./components/adminMockInterview/studentInterviewDetails.jsx";
import AllStudentInterview from "./components/adminMockInterview/allStudentInterviews.jsx";
import AllStudentAptitudeTest from "./components/AdminAptitudeTest/allStudentAptitudeTest.jsx";
import EachStudentAptitudeTest from "./components/AdminAptitudeTest/eachStudentAptitudeTest.jsx";
import AptitudeDetails from "./components/AdminAptitudeTest/aptitudeDetails.jsx";
import EditJobPostingContainer from "./components/JobPosting edit/JobPostingContainer.jsx";
import TestReport from "./components/reports/TestReport.jsx";
import RegusteredReport from "./components/reports/RegisteredReport.jsx";
import ForgetPass from "./components/Student/ForgetPass/ForgetPass.jsx";
import StartRegi from "./components/Student/ForgetPass/StartRegis.jsx";
import BalckListTable from "./components/Student/ForgetPass/BlackListTable.jsx";
import BlackListTable from "./components/Student/ForgetPass/BlackListTable.jsx";
import AddSlagForm from "./components/TPOMain/Slab/AddSlab.jsx";
import IntenrCompanyDashboard from "./components/Interships/Company Communication/CompanyDashBoard.jsx";
// import IntershipRemark from "../../backend/models/internshipRemark.js";
import InternCompanyRemark from "./components/Interships/Company Remark/CompanyRemark.jsx";
import IntershipPost from "./components/Interships/JobPosting/JobPostingContainer.jsx";
import CompanySearchIntership from "./components/Interships/RSLReport.jsx";
import AllTest from "./components/reports/AllTest.jsx";
import SummarySheet from "./components/reports/Summary.jsx";
import CompanyPlacedBranchWise from "./components/reports/companyPlacedBranchWise.jsx";
import SingleStudentSingleOffer from "./components/reports/SingleStudentSingleOffer.jsx";
import InterViewReport from "./components/reports/IntervierReport.jsx";
import AllHrSheet from "./components/reports/AllHrSheet.jsx";
import CompanyTableGeneratorIntership from "./components/reports/CompanyTableGeneratorIntership.jsx";
import CreateEvent from "./components/eventPages/createevent.jsx";
import Approve from "./components/eventPages/approve.jsx";
import Attendance from "./components/eventPages/attendance.jsx";
import Scan from "./components/eventPages/scan.jsx";
import HistoryEvents from "./components/eventPages/historyEvents.jsx";
import AdminScan from "./components/Eventadmin/attendanceScan.jsx";
import RegistrationPage from "./components/Eventadmin/registration.jsx";
import EditEventPage from "./components/eventPages/EditEventPage.jsx";
import PracticalCreation from "./components/MachineTest/CreateMachineTest.jsx";
import PracticalList from "./components/MachineTest/TestList.jsx";
import CodingEnvironmentPage from "./components/MachineTest/codingEnv.jsx";
import MachineTestReport from "./components/MachineTest/MachineTestReport.jsx";
import MySubmissions from "./components/MachineTest/MySubmissions.jsx";
import AllMachineTest from "./components/MachineTest/AllMachineTest.jsx";
import ERPApti from "./components/reports/Aptiitude_ERP.jsx";
import ERPInter from "./components/reports/Interview_ERP.jsx";
import MachineERP from "./components/reports/Machine_ERP.jsx";
import AllTestReprt from "./components/reports/ALLTestReport.jsx";
import ForumsDetailsIntership from "./components/adminforum/ForumsDetailsIntership.jsx";
import AdminForumIntership from "./components/adminforum/AdminForumIntership.jsx";
import AnnouncementsIntership from "./components/announcement/AnnouncementIntership.jsx";
import StudentNotificationIntership from "./components/Student/Notification/StudentNotificationIntership.jsx";
import AllEventTestReprt from "./components/reports/ALLEventTestReport.jsx";
import StudentAdditionInDrive from "./components/pages/StudentAdditionInDrive.jsx";
import StudentEligibilitySelector from "./components/pages/EligibleStudentsAppend.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //Student
      { path: '/', element: <StudentDashboard/>},
      { path: '/profile', element: <ProfileUpdate /> },
      { path: '/profile2/update', element: <ProfileUpdate2 />},
      { path: '/profile3/update',  element: <ProfileUpdate3 />},
      { path: '/registration', element: <RegistrationForm /> },
      { path: '/sign-up', element: <SignUpForm /> },
      { path: '/form2', element: <AcademicDetails />},
      { path: '/upload', element: <FIleUp />},
      { path: '/complete', element: <CompleteRegister />},
      { path: '/studentnotification', element: <StudentNotification />},
      { path: '/studentnotificationintership', element: <StudentNotificationIntership />},
      

      { path: '/aptitude-test', element: <AptitudeTest /> },
      { path: '/generate_questions', element: <QuestionPage /> },
      { path: '/complete-test', element: <CompletedTest />},
      { path: '/review', element: <ReviewPage />},
      { path: '/history', element: <HistoryPage /> },
      { path: '/testresult', element: <TestResult />},
      { path : '/mock-interview', element: <MockInterview />},
      { path: '/mock-interview-history', element: <HistoryComponent />},
      // { path: "/interview-details/:interviewId", element: <InterviewDetails />},
      { path: "/interview-details", element: <InterviewDetails />},
      { path: '/registeredcompanies', element: <RegisteredCompanies /> },

      //Admin
      { path: "/", element: <AdminDashBoard/> },

      { path: "/companyDashboard", element: <CompanyDashboard /> },
      { path: "/intern/companyDashboard", element: <IntenrCompanyDashboard /> },


      { path: "/hrcontact", element: <HRDash /> },

      { path: "/companyremark", element: <CompanyRemark /> },
      { path: "/intern/companyremark", element: <InternCompanyRemark /> },

      { path: "/recontact", element: <Reconnect /> },
      { path: "/companyconfirm", element: <TableComponentContainer /> },
      { path: "/jobposting", element: <JobPostingContainer /> },
      { path: "/IntershipPosting", element: <IntershipPost /> },
      { path: "/intership/rsl-report", element: <CompanySearchIntership /> },
      

      { path: "/Editjobposting", element: <EditJobPostingContainer /> },

      { path: "/forums", element: <Forums /> },
      { path: "/internshipforums", element: <ForumsDetailsIntership /> },
      { path: "/adminforum", element: <AdminForum /> },
      { path: "/adminforumintership", element: <AdminForumIntership /> },
      { path: "/announcements", element: <Announcement /> },
      { path: "/announcementsintership", element: <AnnouncementsIntership /> },

      { path: "/driveStatus", element: <CompanyList /> },
      { path: "/driveStatus/students", element: <StudentsList /> },
      {
        path: "/driveStatus/students-for-round-two",
        element: <StudentsForRoundTwo />,
      },
      {
        path: "/driveStatus/students-for-round-three",
        element: <StudentsForRoundThree />,
      },
      {
        path: "/driveStatus/students-for-round-four",
        element: <StudentsForRoundFour />,
      },
      { path: "/driveStatus/placedStudents", element: <PlacedStudents /> },
      // { path: "/registration", element: <RegistrationForm /> },

      //aptitude admin
      { path: "/admin-aptitude", element: <AdminAptitudeTest /> },
      { path: '/all-aptitude-student', element: <AllStudentAptitudeTest />},
      { path: '/each-aptitude-student', element: <EachStudentAptitudeTest />},
      { path: '/admin-aptitude-details', element: <AptitudeDetails />},

      //interview admin
      { path: "/admin-mock-interview", element: <AdminSetup />},
      { path: '/each-student-interview', element: <StudentInterview />},
      { path: '/all-interview-details', element: <AllStudentInterview />},
      { path: "/student-interview-details", element: <StudentInterviewDetails />},

      { path: "/forgetPassword", element: <ForgetPass />},
      { path: "/start-close", element: <StartRegi />},
      { path: "/blacklist", element: <BlackListTable />},
      { path: "/addslab", element: <AddSlagForm />},
      
      { path: "/allTests", element: <AllTest/> },
      { path: "/allMachineTest", element: <AllMachineTest/> },

      { path: "/event", element: <Event /> },
      { path: "/event/adminp", element: <CreateEvent /> },
      { path: "/event/admin/approve", element: <Approve/> },
      { path: "/event/admin/attendance", element: <Attendance /> },
      { path: "/event/admin/scan", element: <Scan/> },
      { path: "/event/admin/eventhistory", element: <HistoryEvents /> },
      { path: "/event/attendancescan/:id", element: <AdminScan/> },
      { path: "/event/registrations/:id", element: <RegistrationPage /> },
      { path: "/event/admin/history", element: <HistoryEvents /> },
      { path: "/event/admin/editEvent", element: <EditEventPage /> },
      { path: "/CreateMachine", element: <PracticalCreation /> },
      { path: "/machineTestList", element: <PracticalList /> },
      { path: "/mySubmissions", element: <MySubmissions /> },
      { path: "/coding/:practicalId", element: <CodingEnvironmentPage /> },
      { path: "/AddStudentsToDrive", element: <StudentAdditionInDrive/> },
      { path: "/EligibleStudents", element: <StudentEligibilitySelector/> },

  

      // <Route path="/" element={<ForgetPass />} />   


      {
        path: "/report",
        // element: <Report_nav />,
        element: <ReportsContainer />,
        children: [
          {
            path: "/report/placed-students",
            element: <PlacedStudentsReport />,
          },
          { path: "/report/unplaced-students", element: <UnplacedStudents /> },
          {
            path: "/report/company-data-generator",
            element: <CompanyTableGenerator />,
          },
          {
            path: "/report/student-data-generator",
            element: <StudentTableGenerator />,
          },
          { path: "/report/gender-wise-data", element: <GenderwiseData /> },
          { path: "/report/company-wise-data", element: <CompanywiseData /> },
          { path: "/report/company-wise-placed", element: <CompanyWisePlaced /> },
          { path: "/report/erp-report", element: <ERPReport /> },
          { path: "/report/indierp-report", element: <IndiERPReport /> },
          { path: "/report/indierp-report-search", element: <SearchIndiERPReport /> },

          { path: "/report/testReport", element: <TestReport /> },
          { path: "/report/interViewReport", element: <InterViewReport /> },
          { path: "/report/rsl-report", element: <RSLReport /> },
          { path: "/report/StudentList", element: <RegusteredReport/> },
          { path: "/report/summary", element: <SummarySheet/> },
          { path: "/report/companyPlacedBranch", element: <CompanyPlacedBranchWise/> },
          { path: "/report/singleStudnetSingleOffer", element: <SingleStudentSingleOffer/> },
          { path: "/report/AllHrDetails", element: <AllHrSheet/> },
          { path: "/report/internship-company-data-generator", element: <CompanyTableGeneratorIntership/> },
          { path: "/report/MachineTest", element: <MachineTestReport/> },
          { path: "/report/ERPApti", element: <ERPApti/> },
          { path: "/report/ERPInter", element: <ERPInter/> },
          { path: "/report/ERPMachine", element: <MachineERP/> },
          { path: "/report/AllTestReport", element: <AllTestReprt/> },
          { path: "/report/AllEventTestReport", element: <AllEventTestReprt /> },


        ],
      },

      // 
      // { path: '/dashboard/studentdashboard'}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);