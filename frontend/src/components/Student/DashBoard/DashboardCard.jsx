import CustomModal from "./CustomModal"; // Assuming CustomModal component path
import React, { useState } from "react";
import Accordion from "./Accordian";

const DashboardCard = ({ company, onRegister, isRegistered }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatSalary = (salary) => {
    return `${salary} LPA`; // Format salary with "LPA" appended
  };

  const openFullDetails = () => {
    if (!company) {
      return; // Handle case where company is undefined
    }

    CustomModal.open({
      title: company.name,
      content: (
        <>
          <p className="text-gray-700">{company.job_description}</p>
          <p className="text-gray-700">
            <strong>Role:</strong> {company.roles}
          </p>
          <p className="text-gray-700">
            <strong>CTC: </strong> {formatSalary(company.package_details)}
          </p>
          <p className="text-gray-700">
            <strong>10th Criteria: </strong> {company.criteria_10th}
          </p>
          <p className="text-gray-700">
            <strong>12th Criteria: </strong> {company.criteria_12th}
          </p>
          <p className="text-gray-700">
            <strong>Diploma Criteria: </strong> {company.diploma_criteria}
          </p>
          <p className="text-gray-700">
            <strong>Degree Criteria: </strong> {company.deg_criteria}
          </p>
          <p className="text-gray-700">
            <strong>Eligible Branches: </strong> {company.eligible_branches}
          </p>
          <p className="text-gray-700">
            <strong>Location: </strong> {company.location}
          </p>
        </>
      ),
    });
  };

  const handleRegisterClick = () => {
    onRegister(company);
  };

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <div className="bg-white shadow-xl rounded-lg p-4 space-y-4 ">
      <h3
        className="text-xl font-bold cursor-pointer text-blue-500 "
        onClick={openFullDetails}
      >
        {company ? company.name : "Loading..."}
      </h3>
      {/* {console.log(company)} */}
      <Accordion
        title="Job Description"
        content={
          <div
            className={`transition-all duration-300 ${
              isExpanded ? "h-auto" : "h-0"
            } overflow-hidden`}
          >
            <div className="space-y-2">
              <p className="text-gray-700">{company.job_description}</p>
              <p className="text-gray-700">
                <strong>10th Criteria:</strong> {company.criteria_10th} %
              </p>
              <p className="text-gray-700">
                <strong>12th Criteria:</strong> {company.criteria_12th} %
              </p>
              <p className="text-gray-700">
                <strong>Diploma Criteria:</strong> {company.diploma_criteria} %
              </p>
              <p className="text-gray-700">
                <strong>Degree Criteria:</strong> {company.deg_criteria} CGPA
              </p>
              <p className="text-gray-700">
                <strong>Eligible Branches:</strong> {company.eligible_branches}
              </p>
              
              {
                (company.docs!=null && company.docs!=undefined && company.docs!='null' && company.docs!='')
                  ?
                    <p className="text-gray-700">
                      <strong>Doc:</strong> <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/docs/${company.docs}`} target="_blank">Click Here</a>
                    </p>
                  :
                  <></>
              }

              {
                (company.docs2!=null && company.docs2!=undefined && company.docs2!='null' && company.docs2!='')
                  ?
                    <p className="text-gray-700">
                      <strong>Doc:</strong> <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/docs/${company.docs2}`} target="_blank">Click Here</a>
                    </p>
                  :
                  <></>
              }

              {
                (company.docs3!=null && company.docs3!=undefined && company.docs3!='null' && company.docs3!='')
                  ?
                    <p className="text-gray-700">
                      <strong>Doc:</strong> <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/docs/${company.docs3}`} target="_blank">Click Here</a>
                    </p>
                  :
                  <></>
              }

              {/* <p className="text-gray-700">
                <strong>Doc:</strong> <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/docs/${company.docs}`} target="_blank">Click Here</a>
              </p> */}
            </div>
          </div>
        }
        isOpen={isExpanded}
        toggleAccordion={toggleAccordion}
      />

        <p className="text-gray-700">
            <strong>CTC:</strong>{" "}
            {company ? formatSalary(company.package_details) : "Loading..."}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {company ? company.roles : "Loading..."}
          </p>
          {
           company ? (company.extLink!=null && company.extLink!=undefined && company.extLink!='null' && company.extLink!='') ? 
          <p className="text-gray-700">
            <strong>Registration Link:</strong> <a href={company.extLink}>Click Here</a>
          </p>:<></>:<></>
          }
          
          <p className="text-gray-700">
              <strong>Dealine To Register:</strong> {company.deadline} {company.deadlineTime}
          </p>
          {isRegistered ? (
        <button className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-md cursor-not-allowed" disabled>
          Already Registered
        </button>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700" onClick={() => onRegister(company)}>
          Register
        </button>
      )}
        </div>
  );
};

export default DashboardCard;