/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import CustomQuestionsForm from "./CustomQuestionsForm";
import QuestionTable from "./QuestionTable";
import "./jobposting.css";
import api from "../../api";

const JobPostingContainer = () => {
  const [withTracker, setWithTracker] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({
    companyId: "",
    remarkId: "",
  });
  const [confirmedCompanies, setConfirmedCompanies] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchConfirmedCompanies = async () => {
      try {
        const response = await api.get("remarks/confirmed");
        setConfirmedCompanies(response.data);
      } catch (error) {
        console.error("Error fetching confirmed companies:", error);
      }
    };

    fetchConfirmedCompanies();
  }, []);

  const handleTrackerChange = (e) => {
    setWithTracker(e.target.value === "yes");
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleCompanyChange = (e) => {
    const [companyId, remarkId] = e.target.value.split(",");
    setSelectedCompany({ companyId, remarkId });
  };

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);
    const payload = {
      ...formData,
      questions: withTracker ? questions : [],
      tracker: withTracker ? "yes" : "no",
      companyId: selectedCompany.companyId,
      remarkId: selectedCompany.remarkId,
    };

    let questionsJson = "";
    try {
      questionsJson = JSON.stringify(payload.questions);
    } catch (error) {
      console.error("Error stringifying questions:", error);
      alert("Error in questions format.");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === "questions") {
        formDataToSend.append(key, questionsJson);
      } else {
        formDataToSend.append(key, payload[key]);
      }
    });

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await api.post("jobpostings", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });
      console.log("Job posting created successfully:", response.data);
      alert("Job Posting successful");
      clearForm();
    } catch (error) {
      console.error("Error creating job posting:", error);
      setIsError(true);
      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const clearForm = () => {
    setWithTracker(false);
    setQuestions([]);
    setSelectedCompany({ companyId: "", remarkId: "" });
    setFormData({});
  };

  return (
    <div className="flex items-center justify-center bg-white-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">
        {/* <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Job Posting</h1> */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center mb-6">Companies with Confirmed Status</h2>
          <label className="block text-sm font-medium text-gray-700">Company:</label>
          <select
            onChange={handleCompanyChange}
            value={`${selectedCompany.companyId},${selectedCompany.remarkId}`}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Company</option>
            {confirmedCompanies.map((company) => (
              <option key={company.companyId} value={`${company.companyId},${company.remarkId}`}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
        {selectedCompany.companyId && (
          <>
            <RegistrationForm onFormDataChange={handleFormDataChange} />
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">With Tracker?</label>
              <select
                onChange={handleTrackerChange}
                value={withTracker ? "yes" : "no"}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            {withTracker && (
              <>
                <CustomQuestionsForm onAddQuestion={handleAddQuestion} />
                {questions.length > 0 && <QuestionTable questions={questions} onDeleteQuestion={handleDeleteQuestion}  />}
              </>
            )}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-navy-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
              {isError && <p className="text-red-500">Error occurred while processing request.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobPostingContainer;
