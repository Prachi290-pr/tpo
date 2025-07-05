import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '/logo-main.webp';
import Announcements from './../../announcement/Announcement';

const NavbarAdmin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);
  const [isEventdropdown, setisEventdropdown] = useState(false);
  const [isTestDrop, setisTestDrop] = useState(false);
  const [isReportDropdown, setIsReportDropDown] = useState(false);
  const [isStudentDropdown, setIsStudentDropdwon] = useState(false);
  const [isForumDropdown, setIsForumDropDown] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMasterDropdownOpen(false);
    setIsReportDropDown(false);
    setisTestDrop(false);
    setisEventdropdown(false);
    // setIsStudentDropdwon(false);
    setIsForumDropDown(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setIsReportDropDown(false);
    setisTestDrop(false);
    setIsStudentDropdwon(false);
    setisEventdropdown(false);
    setIsForumDropDown(false);

  };

  const toggleReportDropdown = () => {
    setIsReportDropDown(!isReportDropdown);
    setisTestDrop(false);
    setIsMasterDropdownOpen(false);
    // setIsMobileMenuOpen(false);
    setIsStudentDropdwon(false);
    setisEventdropdown(false);
    setIsForumDropDown(false);


  }

  const toggleMasterDropdown = () => {
    setIsMasterDropdownOpen(!isMasterDropdownOpen);
    // setIsMobileMenuOpen(false);
    setisTestDrop(false);
    setIsReportDropDown(false);
    setIsStudentDropdwon(false);
    setisEventdropdown(false);
    setIsForumDropDown(false);

  };

  const toggleTestDropdown = () => {
    setIsReportDropDown(false);
    setisTestDrop(!isTestDrop);
    // setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setIsStudentDropdwon(false);
    setisEventdropdown(false);
    setIsForumDropDown(false);

  };

  const toggleForumDropdown = () => {
    setIsReportDropDown(false);
    setisTestDrop(false);
    // setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setIsStudentDropdwon(false);
    setisEventdropdown(false);
    setIsForumDropDown(!isForumDropdown);

  };

  const toggleStudentDropdown = () => {
    setIsReportDropDown(false);
    setisTestDrop(false);
    setIsStudentDropdwon(!isStudentDropdown)
    // setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setisEventdropdown(false);
    setIsForumDropDown(false);

  };

  const toggleEventDropDown = () => {
    setIsReportDropDown(false);
    setisTestDrop(false);
    setIsStudentDropdwon(false);
    // setIsMobileMenuOpen(false);
    setIsMasterDropdownOpen(false);
    setisEventdropdown(!isEventdropdown);
    setIsForumDropDown(false);

  };

  const handleLogout = () => {
      console.log("Function clicked!!!");
      window.localStorage.clear();
      window.location.href = "/"; // Navigate to the root URL in the current tab/window
  };

  const renderLinks = () => {
    return (
      <>
      <div className="relative">
        <button className="text-white  h-full px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-white"
          >
            Admin Dashboard
          </Link>
          </button>
      </div>
    

        <div className="relative">
      <button
        onClick={toggleEventDropDown}
        className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full flex items-center justify-center"
      >
        <span>Event</span>
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />
      </button>
      {isEventdropdown && (
        <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
          <Link
            to="/event/adminp"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/event/adminp"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Create Event
          </Link>

          <Link
          to="/event/admin/editEvent"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/event/admin/editEvent"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 text-sm font-medium bg-gray-800`}
        >
          Edit Event
        </Link>

          <Link
            to="/event/admin/approve"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/event/admin/approve"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Validate Students
          </Link>

          <Link
            to="/event/admin/scan"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/event/admin/scan"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Event Scanner
          </Link>

          <Link
            to="/event/admin/attendance"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/event/admin/attendance"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Event ERP
          </Link>

          <Link
            to="/event/admin/history"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/event/admin/history"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
           Event History
          </Link>
        
        </div>
      )}
    </div>

        <div className="relative">
      <button
        onClick={toggleMasterDropdown}
        className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full flex items-center justify-center"
      >
        <span>Master</span>
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />
      </button>
      {isMasterDropdownOpen && (
        <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
          <Link
            to="/companyDashboard"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/companyDashboard"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Company Dashboard
          </Link>

          <Link
          to="/intern/companyDashboard"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/intern/companyDashboard"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 text-sm font-medium bg-gray-800`}
        >
          Internship Company Dashboard
        </Link>

          <Link
            to="/hrcontact"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/hrcontact"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Hr Contact
          </Link>
          <Link
            to="/companyremark"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/companyremark"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Company Remark
          </Link>

          <Link
            to="/intern/companyremark"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/intern/companyremark"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Intership Company Remark
          </Link>

          <Link
            to="/jobposting"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/jobposting"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Job Postings
          </Link>
          <Link
            to="/IntershipPosting"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/IntershipPosting"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Internship Postings
          </Link>

          <Link
            to="/Editjobposting"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/Editjobposting"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Edit Job Postings
          </Link>

          <Link
            to="/AddStudentsToDrive"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/AddStudentsToDrive"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Add Students To Job Post
          </Link>

          <Link
            to="/EligibleStudents"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/EligibleStudents"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Add Students Eligible List
          </Link>

          <Link
            to="/driveStatus"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/driveStatus"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Drive Status
          </Link>
          <Link
            to="/recontact"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/recontact"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Recontact
          </Link>
          <Link
            to="/companyconfirm"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/companyconfirm"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Confirm Companies
          </Link>

          <Link
            to="/addslab"
            onClick={closeMobileMenu}
            className={`${
              location.pathname === "/companyconfirm"
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-gray-200 hover:text-black"
            } block px-3 py-2 text-sm font-medium bg-gray-800`}
          >
            Placement Policy
          </Link>
        </div>
      )}
    </div>
        
        
        
        <div className="relative text-center">
          <button
            onClick={toggleReportDropdown}
            className="text-white  px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full flex items-center justify-center"
          >
            <span className="">Reports</span>
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />

          </button>
          {isReportDropdown && (
            <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
              <Link
                to="/report/placed-students"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/placed-students"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Placement Reports
              </Link>

              <Link
                to="/report/AllHrDetails"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/AllHrDetails"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                All HR Sheet
              </Link>

              <Link
                to="/report/company-data-generator"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/comapny-data-generator"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Company Generator
              </Link>
              <Link
                to="/report/internship-company-data-generator"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/internship-company-data-generator"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Intership Company Generator
              </Link>
              
              <Link
                to="/report/student-data-generator"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/student-data-generator"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Generator
              </Link>
              <Link
                to="/report/erp-report"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/erp-report"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                ERP Report
              </Link>
             
              {/* <Link
                to="/report/indierp-report"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/indierp-report"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Individual ERP
              </Link> */}
              <Link
                to="/report/indierp-report-search"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/indierp-report"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Individual ERP
              </Link>
              
              <Link
                to="/report/rsl-report"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/rsl-report"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                RSL Report
              </Link>

              <Link
                to="intership/rsl-report"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "intership/rsl-report"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Intership RSL Report
              </Link>

              <Link
                to="/report/studentList"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/studentList"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Registration Report
              </Link>

              <Link
                to="/report/testReport"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/testReport"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Test Report
              </Link>


              <Link
                to="/report/ERPApti"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/ERPApti"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Student Test ERP
              </Link>

              <Link
                to="/report/interViewReport"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/interViewReport"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Interview Report
              </Link>

              <Link
                to="/report/ERPInter"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/ERPInter"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Interview EP
              </Link>

              <Link
                to="/report/machineTest"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/machineTest"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Machine Test Report
              </Link>

              <Link
                to="/report/ERPMachine"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/ERPMachine"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                Machine Test ERP
              </Link>

              <Link
                to="/report/AllTestReport"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/AllTestReport"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                All Test Report
              </Link>
              
              <Link
                to="/report/summary"
                onClick={closeMobileMenu}
                className={`${
                  location.pathname === "/report/summary"
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-200 hover:text-black"
                } block px-3 py-2 text-sm font-medium bg-gray-800`}
              >
                All In One
              </Link>

              
              
            </div>
          )}
        </div>
        {/* <Link
          to="/report"
          onClick={closeMobileMenu}
          className={`${
            location.pathname === "/report"
              ? "bg-blue-600 text-white"
              : "text-white hover:bg-gray-200 hover:text-black"
          } block px-3 py-2 rounded-md text-sm font-medium`}
        >
          Reports
        </Link> */}


    <div className="relative">
        <button
          onClick={toggleForumDropdown}
          className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full items-center justify-center flex"
        >
          <span>Forums & Announcements</span>
          <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />

        </button>
        {isForumDropdown && (
          <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
              <Link
              to="/forums"
              onClick={closeMobileMenu}
              className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
            >
              Forums
            </Link>

            <Link
              to="/internshipforums"
              onClick={closeMobileMenu}
              className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
            >
              Internship Forums
            </Link>
            
            <Link
              to="/announcements"
              onClick={closeMobileMenu}
              className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
            >
              Announcements
            </Link>

            <Link
              to="/announcementsintership"
              onClick={closeMobileMenu}
              className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
            >
              Intership Announcements
            </Link>           
          </div>
        )}
      </div>   


      {/* <button className="text-white h-full px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full">
        <Link
          to="/forums"
          onClick={closeMobileMenu}
          className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full"
        >
          Forums
        </Link>
      </button> */}

      {/* <button className="text-white h-full px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full">
        <Link
          to="/announcements"
          onClick={closeMobileMenu}
          className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full"
        >
          Announcements
        </Link>
        </button> */}

        <div className="relative">
          <button
            onClick={toggleTestDropdown}
            className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full items-center justify-center flex"
          >
            <span>Tests</span>
           <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />

          </button>
          {isTestDrop && (
            <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
               <Link
                to="/allTests"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                All Tests
              </Link>

              <Link
                to="/admin-aptitude"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                Admin Aptitude Test
              </Link>
              
              <Link
                to="/admin-mock-interview"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                Admin Mock Interview
              </Link>

              <Link
                to="/createMachine"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                Admin Machine Test
              </Link>

              <Link
                to="/allMachineTest"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                All Machine Test
              </Link>

              
            </div>
          )}
        </div>   

        <div className="relative">
          <button
            onClick={toggleStudentDropdown}
            className="text-white px-3 py-2 rounded bg-inherit hover:bg-gray-700 w-full sm:w-full items-center justify-center flex"
          >
            <span>Students Action</span>
           <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '16px' }} className="ml-2" />

          </button>
          {isStudentDropdown && (
            <div className="absolute left-0 w-48 bg-white shadow-2xl rounded-md z-10">
              <Link
                to="/forgetPassword"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                Forget Password
              </Link>
              
              <Link
                to="/start-close"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                Open/Close Registrations
              </Link>

              <Link
                to="/blacklist"
                onClick={closeMobileMenu}
                className="text-white hover:bg-gray-200 hover:text-black block px-3 py-2 text-sm font-medium bg-gray-800"
              >
                BlackList
              </Link>
            </div>
          )}
        </div>   

         <div className="relative">
            <button
              onClick={handleLogout}
              className="text-white flex items-start rounded bg-inherit hover:bg-gray-700 w-full sm:w-full"
            >
            <a>Log out</a>
            
          </button>
        </div>   
       
      </>
    );
  };

  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            /> */}
             <img
              className="h-32 w-auto filter invert  brightness-0"
              src={logo}
              alt="TPO Dashboard"
            />
           {/* <div className="text-lg font-bold">TPO Dashboard</div> */}

          </div>
          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">{renderLinks()}</div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">{renderLinks()}</div>
        </div>
      )}
    </nav>
  );
};

export default NavbarAdmin;