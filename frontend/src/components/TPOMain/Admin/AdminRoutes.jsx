// import React from 'react'
// import NavbarAdmin from '../Navbar/NavbarAdmin'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import JobPostingContainer from '../../JobPosting/JobPostingContainer'
// import CompanyDashboard from '../../Company Communication/CompanyDashBoard'
// import CompanyRemark from '../../Company Remark/CompanyRemark'
// import HRDash from '../../HRADD/HRDash'
// import Reconnect from '../../Recontact/Reconnect'
// import TableComponentContainer from '../../ConfrimCompanies/TableComponentContainer'
// import ForumDetails from '../../adminforum/ForumsDetails'
// import Announcement from '../../announcement/Announcement'
// import DriveStatus from '../../pages/CompanyList'
// import StudentsForRoundThree from '../../pages/StudentsForRoundThree'
// import StudentList from '../../pages/StudentsList'
// import StudentsForRoundTwo from '../../pages/StudentsForRoundTwo'
// import StudentsForRoundFour from '../../pages/StudentsForRoundFour'
// import PlacedStudent from '../../pages/PlacedStudents'
// import AdminForum from '../../adminforum/AdminForum'

// const AdminRoutes = () => {
//     return (
//         <>
//             <NavbarAdmin />
//             <Routes>
//                 <Route path='/' element={<CompanyDashboard />} />
//                 <Route path='/jobposting' element={<JobPostingContainer />} />
//                 <Route path='/companyremark' element={<CompanyRemark/>} />
//                 <Route path='/hrcontact' element={<HRDash />} />
//                 <Route path='/recontact' element={<Reconnect/>} />
//                 <Route path='/companyconfirm' element={<TableComponentContainer/>} />
//                 <Route path='/forums' element={<ForumDetails/>} />
//                 <Route path='/announcements' element={<Announcement/>}/>
//                 <Route path='/driveStatus' element={<DriveStatus/>}/>
//                 <Route path='/driveStatus/students' element={<StudentList/>}/>
//                 <Route path='drivestatus/students-for-round-three' element={<StudentsForRoundThree/>}/>
//                 <Route path='/drivestatus/students-for-round-two' element={<StudentsForRoundTwo/>}/>
//                 <Route path='/drivestatus/students-for-round-four' element={<StudentsForRoundFour/>}/>
//                 <Route path='/drivestatus/placedStudents' element={<PlacedStudent/>}/>
//                 <Route path='/postform' element={<AdminForum/>}/>
//             </Routes>
//         </>
//     )
// }

// export default AdminRoutes

import React from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobPostingContainer from "../../JobPosting/JobPostingContainer";
import CompanyDashboard from "../../Company Communication/CompanyDashBoard";
import CompanyRemark from "../../Company Remark/CompanyRemark";
import HRDash from "../../HRADD/HRDash";
import Reconnect from "../../Recontact/Reconnect";
import TableComponentContainer from "../../ConfrimCompanies/TableComponentContainer";
import ForumDetails from "../../adminforum/ForumsDetails";
import Announcement from "../../announcement/Announcement";
import DriveStatus from "../../pages/CompanyList";
import StudentsForRoundThree from "../../pages/StudentsForRoundThree";
import StudentList from "../../pages/StudentsList";
import StudentsForRoundTwo from "../../pages/StudentsForRoundTwo";
import StudentsForRoundFour from "../../pages/StudentsForRoundFour";
import PlacedStudent from "../../pages/PlacedStudents";
import AdminForum from "../../adminforum/AdminForum";

import IndiERPReport from "../../reports/IndiERPReport.jsx";
import ReportsContainer from "../../reports/ReportsContainer.jsx";
import Report_nav from "../../reports/Report_nav.jsx";
import CompanywiseData from "../../reports/CompanywiseData.jsx";
import GenderwiseData from "../../reports/GenderwiseData.jsx";
import ERPReport from "../../reports/ERPReport.jsx";
// import ReportsContainer from "../../reports/ReportsContainer.jsx";

import UnplacedStudents from "../../reports/UnplacedStudents.jsx";
import CompanyTableGenerator from "../../reports/CompanyTableGenerator.jsx";
import StudentTableGenerator from "../../reports/StudentTableGenerator.jsx";
import PlacedStudentsReport from "../../reports/PlacedStudentsReport.jsx";
import AdminAptitudeTest from "../../AdminAptitudeTest/AdminAptitudeTest.jsx";
import AdminDashBoard from "../../adminDashboard/adminDashboard.jsx";
import AdminSetup from "../../adminMockInterview/adminSetup.jsx";
import RSLReport from '../../reports/RSLReport.jsx';
import SearchIndiERPReport from "../../reports/SearchIndiERPReport.jsx";
import StudentInterview from "../../adminMockInterview/eachStudentInterviews.jsx";
import StudentInterviewDetails from "../../adminMockInterview/studentInterviewDetails.jsx";
import AllStudentInterview from "../../adminMockInterview/allStudentInterviews.jsx";
import AllStudentAptitudeTest from "../../AdminAptitudeTest/allStudentAptitudeTest.jsx";
import EachStudentAptitudeTest from "../../AdminAptitudeTest/eachStudentAptitudeTest.jsx";
import AptitudeDetails from "../../AdminAptitudeTest/aptitudeDetails.jsx";
import EditJobPostingContainer from "../../JobPosting edit/JobPostingContainer.jsx";
import TestReport from "../../reports/TestReport.jsx";
import RegusteredReport from "../../reports/RegisteredReport.jsx";
import ForgetPass from "../../Student/ForgetPass/ForgetPass.jsx";
import StartRegi from "../../Student/ForgetPass/StartRegis.jsx";
import BalckListTable from "../../Student/ForgetPass/BlackListTable.jsx";
import BlackListTable from "../../Student/ForgetPass/BlackListTable.jsx";
import AddSlagForm from "../Slab/AddSlab.jsx";
import IntenrCompanyDashboard from "../../Interships/Company Communication/CompanyDashBoard.jsx";
import InternCompanyRemark from "../../Interships/Company Remark/CompanyRemark.jsx";
import IntershipPost from "../../Interships/JobPosting/JobPostingContainer.jsx";
import CompanySearchIntership from "../../Interships/RSLReport.jsx";
import AllTest from "../../reports/AllTest.jsx";
import SummarySheet from "../../reports/Summary.jsx";
import CompanyPlacedBranchWise from "../../reports/companyPlacedBranchWise.jsx";
import SingleStudentSingleOffer from "../../reports/SingleStudentSingleOffer.jsx";
import InterViewReport from "../../reports/IntervierReport.jsx";
import AllHrSheet from "../../reports/AllHrSheet.jsx";
import CompanyTableGeneratorIntership from "../../reports/CompanyTableGeneratorIntership.jsx";
import Event from "../../eventPages/event.jsx";
import CreateEvent from "../../eventPages/createevent.jsx";
import Approve from "../../eventPages/approve.jsx";
import Attendance from "../../eventPages/attendance.jsx";
import Scan from "../../eventPages/scan.jsx";
import HistoryEvents from "../../eventPages/historyEvents.jsx";
import RegistrationPage from "../../Eventadmin/registration.jsx";
import EditEventPage from "../../eventPages/EditEventPage.jsx";
import AdminScan from "../../Eventadmin/attendanceScan.jsx";
import PracticalCreation from "../../MachineTest/CreateMachineTest.jsx";
import MachineTestReport from "../../MachineTest/MachineTestReport.jsx";
import AllMachineTest from "../../MachineTest/AllMachineTest.jsx";
import ERPApti from "../../reports/Aptiitude_ERP.jsx";
import ERPInter from "../../reports/Interview_ERP.jsx";
import MachineERP from "../../reports/Machine_ERP.jsx";
import AllTestReprt from "../../reports/ALLTestReport.jsx";
import ForumsDetailsIntership from "../../adminforum/ForumsDetailsIntership.jsx";
import AdminForumIntership from "../../adminforum/AdminForumIntership.jsx";
import AnnouncementsIntership from "../../announcement/AnnouncementIntership.jsx";
import AllEventTestReprt from "../../reports/ALLEventTestReport.jsx";
import StudentAdditionInDrive from "../../pages/StudentAdditionInDrive.jsx";
import StudentEligibilitySelector from "../../pages/EligibleStudentsAppend.jsx";

const AdminRoutes = ({uid}) => {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<AdminDashBoard />}/>

        <Route path="/companyDashboard" element={<CompanyDashboard />} />
        <Route path="/intern/companyDashboard" element={<IntenrCompanyDashboard />} />

        <Route path="/jobposting" element={<JobPostingContainer />} />
        <Route path="/IntershipPosting" element={<IntershipPost />} />
        
        <Route path="/companyremark" element={<CompanyRemark />} />
        <Route path="/intern/companyremark" element={<InternCompanyRemark />} />

        <Route path="/hrcontact" element={<HRDash />} />
        <Route path="/recontact" element={<Reconnect />} />
        <Route path="/companyconfirm" element={<TableComponentContainer />} />
        <Route path="/forums" element={<ForumDetails uid={uid}/>} />
        <Route path="/internshipforums" element={<ForumsDetailsIntership uid={uid}/>} />
        <Route path="/adminforum" element={<AdminForum uid={uid}/>} />
        <Route path="/adminforumintership" element={<AdminForumIntership uid={uid}/>} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/announcementsintership" element={<AnnouncementsIntership />} />
        <Route path="/driveStatus" element={<DriveStatus />} />
        <Route path="/Editjobposting" element={<EditJobPostingContainer />} />
        <Route path="/AddStudentsToDrive" element={<StudentAdditionInDrive />} />
        <Route path="/EligibleStudents" element={<StudentEligibilitySelector />} />


        {/* Admin Aptitude Test */}
        <Route path="/admin-aptitude" element={<AdminAptitudeTest />} />
        <Route path="/all-aptitude-student" element={<AllStudentAptitudeTest />} />
        <Route path= '/each-aptitude-student' element={<EachStudentAptitudeTest />} />
        <Route path="/admin-aptitude-details" element = {<AptitudeDetails />} />

        {/*interview*/}
        <Route path="/admin-mock-interview" element={<AdminSetup />} />
        {/* <Route path="/studentInterview" element={<StudentInterview />} /> */}
        <Route path="/all-interview-details" element={<AllStudentInterview />} />
        <Route path="/each-student-interview" element={<StudentInterview />} />
        <Route path="/student-interview-details" element={<StudentInterviewDetails />} />
        

        <Route path="/driveStatus/students" element={<StudentList />} />
        <Route
          path="drivestatus/students-for-round-three"
          element={<StudentsForRoundThree />}
        />
        <Route
          path="/drivestatus/students-for-round-two"
          element={<StudentsForRoundTwo />}
        />
        <Route
          path="/drivestatus/students-for-round-four"
          element={<StudentsForRoundFour />}
        />
        <Route path="/drivestatus/placedStudents" element={<PlacedStudent />} />
        <Route path="/postform" element={<AdminForum />} />
        <Route path="/report" element={<Report_nav />} />

        <Route
          path="/report/placed-students"
          element={<Report_nav ><PlacedStudentsReport /></Report_nav>}
        />
        <Route
          path="/report/unplaced-students"
          element={<Report_nav ><UnplacedStudents /></Report_nav>}
        />
        <Route
          path="/report/company-data-generator"
          element={<CompanyTableGenerator />}
        />
        <Route
          path="/report/student-data-generator"
          element={<StudentTableGenerator />}
        />
        <Route path="/report/gender-wise-data" element={<Report_nav ><GenderwiseData /></Report_nav>} />
        <Route path="/report/company-wise-data" element={<Report_nav ><CompanywiseData /></Report_nav>} />
        <Route path="/report/erp-report" element={<ERPReport />} />
        <Route path="/report/indierp-report" element={<IndiERPReport />} />
        <Route path="/report/indierp-report-search" element={<SearchIndiERPReport />} />
        <Route path="/report/rsl-report" element={<RSLReport />} />
        <Route path="/intership/rsl-report" element={<CompanySearchIntership />} />
        <Route path="/report/testReport" element={<TestReport />} />        
        <Route path="/report/StudentList" element={<RegusteredReport />} />   
        <Route path="/report/MachineTest" element={<MachineTestReport />} />   

        <Route path="/allTests" element={<AllTest />} />   
        <Route path="/allMachineTest" element={<AllMachineTest />} />   

        <Route path="/forgetPassword" element={<ForgetPass />} />   
        <Route path="/start-close" element={<StartRegi />} />   
        <Route path="/blacklist" element={<BlackListTable />} />   
        <Route path="/addslab" element={<AddSlagForm />} />   

        <Route path="/report/summary" element={<SummarySheet />} />   
        <Route path="/report/companyPlacedBranch" element={<Report_nav><CompanyPlacedBranchWise/></Report_nav>} />   
        <Route path="/report/singleStudnetSingleOffer" element={<Report_nav><SingleStudentSingleOffer/></Report_nav>} />   
        <Route path="/report/interViewReport" element={<InterViewReport/>} />   
        <Route path="/report/AllHrDetails" element={<AllHrSheet/>} />   
        <Route path="/report/internship-company-data-generator" element={<CompanyTableGeneratorIntership/>} />   
        
        <Route index  path="/event" element={<Event/>} />
        <Route path="/event/adminp" element={<CreateEvent/>} />
        <Route path="/event/admin/approve" element={<Approve/>} />
        <Route path="/event/admin/attendance" element={<Attendance/>} />
        <Route path="/event/admin/scan" element={<Scan/>} />
        <Route path="/event/admin/eventhistory" element={<HistoryEvents/>} />
        <Route path="/event/attendancescan/:id" element={<AdminScan/>} />
        <Route path="/event/registrations/:id" element={<RegistrationPage/>} />
        <Route path="/event/admin/history" element={<HistoryEvents />} />
        <Route path="/event/admin/editEvent" element={<EditEventPage/>} />
        <Route path="/CreateMachine" element={<PracticalCreation/>} />
  
        <Route path="/report/ERPApti" element={<ERPApti/>} />
        <Route path="/report/ERPInter" element={<ERPInter/>} />
        <Route path="/report/ERPMachine" element={<MachineERP/>} />
        <Route path="/report/AllTestReport" element={<AllTestReprt/>} />
        <Route path="/report/AllEventTestReport" element={<AllEventTestReprt />} />

      </Routes>
    </>
  );
};

export default AdminRoutes;