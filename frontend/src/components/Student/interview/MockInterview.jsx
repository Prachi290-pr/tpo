// // import React, { useState } from "react";
// // import Header from "../components/Header";
// // import QuestionForm from "../components/QuestionForm";
// // import api from '../api.js';

// // const MockInterview = () => {
// //   const [questions, setQuestions] = useState([]);
// //   const [isInterviewStarted, setIsInterviewStarted] = useState(false);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [interviewId, setInterviewId] = useState(null);

// //   const interviewDetails = {
// //     role: "Frontend Developer",
// //     difficulty: "Medium",
// //     language: "JavaScript",
// //     dateTime: "2024-07-03 10:00 AM",
// //     totalScore: "100"
// //   };

// //   const startInterview = async () => {
// //     try {
// //       const response = await api.post('interviews', {
// //         userId: 1,
// //         title: interviewDetails.role,
// //         complexity: interviewDetails.difficulty,
// //         language: interviewDetails.language,
// //         numQuestions: 1,
// //         role: interviewDetails.role,
// //       });
// //       console.log("Interview API response:", response.data.interviewId);

// //       setQuestions(response.data.questions);
// //       setInterviewId(response.data.interviewId);
// //       setIsInterviewStarted(true);
// //       setCurrentQuestionIndex(0);
// //     } catch (error) {
// //       console.error("Error starting interview:", error);
// //     }
// //   };

// //   // const startInterview = () => {
// //   //   const sampleQuestions = [
// //   //     { text: "Tell me about yourself." },
// //   //     { text: "Explain a challenging technical problem you solved." },
// //   //     { text: "What is your experience with [specific technology or tool relevant to the job]?" },
// //   //     { text: "What is your approach to debugging code?" },
// //   //     { text: "How do you stay updated with the latest industry trends and technologies?" },
// //   //     { text: "Describe a project where you had to learn a new technology quickly." },
// //   //     { text: "Explain the concept of closures in JavaScript and provide an example." },
// //   //     { text: "Describe the process of setting up continuous integration/continuous deployment (CI/CD) for a full stack application." },
// //   //     { text: "How do you handle state management in a large-scale React application?" },
// //   //     { text: "What are some common security vulnerabilities in web applications, and how do you mitigate them?" },
// //   //   ];
// //   //   setQuestions(sampleQuestions);
// //   //   setIsInterviewStarted(true);
// //   //   setCurrentQuestionIndex(0);
// //   // };

// //   const handleNextQuestion = () => {
// //     if (currentQuestionIndex < questions.length - 1) {
// //       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
// //     } else {
// //       // Submit answers when the last question is reached
// //       submitInterview();
// //     }
// //   };

// //   const submitInterview = async () => {
// //       console.log(interviewId);

// //     try {
// //       const answers = questions.map((question, index) => ({
// //         questionId: question.id,
// //         content: question.answer,
// //       }));
// //       console.log(interviewId);
      
// //       const response = await api.post('interviews/submit', {
// //         interviewId,
// //         answers,
// //       });
      
// //       console.log("Interview submitted:", response.data);
// //     } catch (error) {
// //       console.error("Error submitting interview:", error);
// //     }
// //   };

// //   // const handleNextQuestion = () => {
// //   //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
// //   // };

// //   return (
// //     <div className="container mx-auto p-4">
// //       {!isInterviewStarted ? (
// //         <Header onStartInterview={startInterview} interviewDetails={interviewDetails} />
// //       ) : (
// //         <QuestionForm
// //           questions={questions}
// //           currentQuestionIndex={currentQuestionIndex}
// //           onNextQuestion={handleNextQuestion}
// //           onGoBack={() => setIsInterviewStarted(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default MockInterview;

// import React, { useState } from "react";
// import Header from "../components/Header";
// import QuestionForm from "../components/QuestionForm";
// import api from '../api.js';

// const MockInterview = () => {
//   const [questions, setQuestions] = useState([]);
//   const [isInterviewStarted, setIsInterviewStarted] = useState(false);
//   const [interviewId, setInterviewId] = useState(null);

//   const interviewDetails = {
//     role: "Frontend Developer",
//     difficulty: "Medium",
//     language: "JavaScript",
//     dateTime: "2024-07-03 10:00 AM",
//     totalScore: "100"
//   };

//   const startInterview = async () => {
//     try {
//       const response = await api.post('interviews', {
//         userId: 1,
//         title: interviewDetails.role,
//         complexity: interviewDetails.difficulty,
//         language: interviewDetails.language,
//         numQuestions: 10,
//         role: interviewDetails.role,
//       });

//       console.log("Interview API response:", response.data);

//       setQuestions(response.data.questions);
//       setInterviewId(response.data.interviewId);
//       setIsInterviewStarted(true);
//     } catch (error) {
//       console.error("Error starting interview:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {!isInterviewStarted ? (
//         <Header onStartInterview={startInterview} interviewDetails={interviewDetails} />
//       ) : (
//         <QuestionForm
//           questions={questions}
//           interviewId={interviewId}
//           onGoBack={() => setIsInterviewStarted(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default MockInterview;


import React, { useState, useEffect } from "react";
import Header from "./Header";
import QuestionForm from "./QuestionForm";
import api from '../../../api';

const MockInterview = ({uid}) => {
  const [questions, setQuestions] = useState([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await api.get('details/get');
        setInterviews(response.data); 
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    fetchInterviewDetails();
  }, []);

  // const interviewDetails = {
  //   role: "Frontend Developer",
  //   difficulty: "Medium",
  //   language: "JavaScript",
  //   dateTime: "2024-07-03 10:00 AM",
  //   totalScore: "100"
  // };

  const startInterview = async (interview) => {
    try {
      const response = await api.post('interviews/start', {
        userId: uid,
        title: interview.title,
        complexity: interview.difficulty,
        language: interview.language,
        numQuestions: 10,
        role: interview.role,
      });

      console.log("Interview API response:", response.data);

      setQuestions(response.data.questions);
      setInterviewId(response.data.interviewId);
      setIsInterviewStarted(true);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
       {!isInterviewStarted ? (
        <Header onStartInterview={startInterview} interviews={interviews} />
      ) : (
        <QuestionForm
          questions={questions}
          interviewId={interviewId}
          // currentQuestionIndex={currentQuestionIndex}
          onGoBack={() => setIsInterviewStarted(false)}
        />
      )}
    </div>
  );
};

export default MockInterview;
