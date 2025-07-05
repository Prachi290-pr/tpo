// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api";

const ReviewPage = () => {
  const location = useLocation();
  const { questions, answers, remarkedQuestions, submittedQuestions, currentQuestionIndex,timeRemaining: initialTimeRemaining } = location.state || {};
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('reloadDetected', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.removeItem('reloadDetected');
    };
  }, []);
  
  useEffect(() => {
    if (localStorage.getItem('reloadDetected') === 'true') {
      navigate('/complete-test');
      localStorage.removeItem('reloadDetected');
    }
  }, [navigate]);



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/complete-test");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };



  useEffect(() => {
    if (questions.length > 0 && !userUid) {
      const extractedUserUid = questions[0].user_uid;
      console.log("User UID:", extractedUserUid);
      setUserUid(extractedUserUid);
    }
  }, [questions, userUid]);

  const handleBack = () => {
    if (userUid) {
      console.log(userUid);
      api.post(`openai/ans`, { userUid: userUid })
        .then((response) => {
          navigate("/generate_questions", {
            state: {
              questions: response.data,
              answers,
              remarkedQuestions,
              submittedQuestions,
              currentQuestionIndex,
              timeRemaining
            }
          });
        })
        .catch((error) => {
          console.error('Error submitting test:', error);
        });
    }
  };

  const handleSubmitAll = () => {
    console.log("Submitting all questions:", answers);
    navigate("/complete-test");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Review Answers</h2>
        <div className="grid grid-cols-4 gap-4">
          {questions && questions.map((question, index) => (
            <button
              key={index}
              className={`p-2 rounded-md text-center ${
                submittedQuestions.includes(question.id)
                  ? "bg-green-600 text-white"
                  : remarkedQuestions.includes(question.id)
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Time Remaining: {formatTime(timeRemaining)}</h2>
          {questions.length > 0 ? (
            <div className="mt-8">
              {questions.map((question, index) => (
                <div key={question.id} className="mb-6">
                  <h3 className="text-lg font-semibold">{question.question}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">Options:</p>
                    <ol type="A" style={{ listStyleType: "upper-alpha", paddingLeft: "20px" }} className="list-inside">
                      <li className={`${answers[question.id] === "A" ? "text-gray-600 font-semibold" : ""}`}>
                        {question.optionA}
                      </li>
                      <li className={`${answers[question.id] === "B" ? "text-gray-600 font-semibold" : ""}`}>
                        {question.optionB}
                      </li>
                      <li className={`${answers[question.id] === "C" ? "text-gray-600 font-semibold" : ""}`}>
                        {question.optionC}
                      </li>
                      <li className={`${answers[question.id] === "D" ? "text-gray-600 font-semibold" : ""}`}>
                        {question.optionD}
                      </li>
                    </ol>
                    <p className="text-gray-600 mt-2">
                      Selected Answer: <span className="font-semibold">{answers[question.id]}</span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-blue-600 text-white p-2 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitAll}
                  className="bg-green-600 text-white p-2 rounded-md"
                >
                  Submit All
                </button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
