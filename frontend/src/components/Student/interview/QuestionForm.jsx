// // import React, { useState, useEffect } from "react";
// // import QuestionCard from "./QuestionCard";
// // import axios from "axios";
// // import api from '../api';

// // const QuestionForm = ({ questions, interviewId, onGoBack }) => {
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [isBuffering, setIsBuffering] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsBuffering(false), 5000);
// //     return () => clearTimeout(timer);
// //   }, [currentQuestionIndex]);

// //   const handleNextQuestion = (answer) => {
// //     setAnswers([...answers, { questionId: questions[currentQuestionIndex].id, content: answer }]);
// //     setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     setIsBuffering(true);
// //   };

// //   useEffect(() => {
// //     if (currentQuestionIndex >= questions.length) {
// //       // submitAnswers();
// //     }
// //   }, [currentQuestionIndex]);

// //   const submitAnswers = async () => {
// //     try {
// //       const response = await api.post("interviews/submit", {
// //         interviewId,
// //         answers,
// //       });
// //       console.log("Interview submitted successfully:", response.data);
// //     } catch (error) {
// //       console.error("Error submitting interview:", error);
// //     }
// //   };

// //   if (currentQuestionIndex >= questions.length) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen">
// //         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
// //           <p>All questions answered!</p>
// //         </div>
// //         <button
// //           onClick={onGoBack}
// //           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {isBuffering ? (
// //         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
// //           <p>Prepare yourself, the next question will appear in 5 seconds...</p>
// //         </div>
// //       ) : (
// //         <QuestionCard
// //           question={questions[currentQuestionIndex]}
// //           questionNumber={currentQuestionIndex + 1}
// //           onSubmit={handleNextQuestion}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default QuestionForm;


// // // import React, { useState, useEffect } from "react";
// // // import QuestionCard from "./QuestionCard";

// // // const QuestionForm = ({ questions, onGoBack }) => {
// // //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //   const [answers, setAnswers] = useState([]);
// // //   const [isBuffering, setIsBuffering] = useState(true);

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => setIsBuffering(false), 5000);
// // //     return () => clearTimeout(timer);
// // //   }, [currentQuestionIndex]);

// // //   const handleNextQuestion = (answer) => {
// // //     setAnswers([...answers, answer]);
// // //     setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //     setIsBuffering(true);
// // //   };

// // //   if (currentQuestionIndex >= questions.length) {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center min-h-screen">
// // //         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
// // //           <p>All questions answered!</p>
// // //         </div>
// // //         <button
// // //           onClick={onGoBack}
// // //           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
// // //         >
// // //           Go Back
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div>
// // //       {isBuffering ? (
// // //         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
// // //           <p>Prepare yourself, the next question will appear in 5 seconds...</p>
// // //         </div>
// // //       ) : (
// // //         <QuestionCard
// // //           question={questions[currentQuestionIndex]}
// // //           questionNumber={currentQuestionIndex + 1}
// // //           onSubmit={handleNextQuestion}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default QuestionForm;

// // import React, { useState, useEffect } from "react";
// // import QuestionCard from "./QuestionCard";
// // import api from '../api';

// // const QuestionForm = ({ questions, interviewId, onGoBack }) => {
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [isBuffering, setIsBuffering] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsBuffering(false), 5000);
// //     return () => clearTimeout(timer);
// //   }, [currentQuestionIndex]);

// //   const handleNextQuestion = (answer) => {
// //     setAnswers([...answers, { questionId: questions[currentQuestionIndex].id, content: answer }]);
// //     setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     setIsBuffering(true);
// //   };

// //   useEffect(() => {
// //     if (currentQuestionIndex >= questions.length) {
// //       submitAnswers();
// //     }
// //   }, [currentQuestionIndex]);

// //   const submitAnswers = async () => {
// //     try {
// //       const response = await api.post("interviews/submit", {
// //         interviewId,
// //         answers,
// //       });
// //       console.log("Interview submitted successfully:", response.data);
// //     } catch (error) {
// //       console.error("Error submitting interview:", error);
// //     }
// //   };

// //   if (currentQuestionIndex >= questions.length) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen">
// //         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
// //           <p>All questions answered!</p>
// //         </div>
// //         <button
// //           onClick={onGoBack}
// //           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {isBuffering ? (
// //         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
// //           <p>Prepare yourself, the next question will appear in 5 seconds...</p>
// //         </div>
// //       ) : (
// //         <QuestionCard
// //           question={questions[currentQuestionIndex]}
// //           questionNumber={currentQuestionIndex + 1}
// //           onSubmit={handleNextQuestion}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default QuestionForm;

// import React, { useState, useEffect } from "react";
// import QuestionCard from "./QuestionCard";
// import api from '../api';

// const QuestionForm = ({ questions, interviewId, onGoBack }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
//     const savedIndex = sessionStorage.getItem('currentQuestionIndex');
//     return savedIndex ? parseInt(savedIndex, 10) : 0;
//   });
//   const [answers, setAnswers] = useState(() => {
//     const savedAnswers = sessionStorage.getItem('answers');
//     return savedAnswers ? JSON.parse(savedAnswers) : [];
//   });
//   const [isBuffering, setIsBuffering] = useState(true);
//   const [countdown, setCountdown] = useState(5);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsBuffering(false), 5000);
//     return () => clearTimeout(timer);
//   }, [currentQuestionIndex]);

//   useEffect(() => {
//     let countdownTimer;
//     if (isBuffering) {
//       countdownTimer = setInterval(() => {
//         setCountdown((prevCountdown) => prevCountdown - 1);
//       }, 1000);
//     }

//     return () => clearInterval(countdownTimer);
//   }, [isBuffering]);

//   useEffect(() => {
//     sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
//     sessionStorage.setItem('answers', JSON.stringify(answers));
//   }, [currentQuestionIndex, answers]);

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       submitAnswers();
//       setIsSubmitting(true);
//       sessionStorage.clear();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [answers, interviewId]);

//   useEffect(() => {
//     if (isSubmitting) {
//       const timer = setTimeout(() => {
//         onGoBack();
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [isSubmitting, onGoBack]);

//   const handleNextQuestion = (answer) => {
//     setAnswers([...answers, { questionId: questions[currentQuestionIndex].id, content: answer }]);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     setIsBuffering(true);
//     setCountdown(5); // Reset the countdown for the next question
//   };

//   useEffect(() => {
//     if (currentQuestionIndex >= questions.length) {
//       submitAnswers();
//       setIsSubmitting(true);
//     }
//   }, [currentQuestionIndex]);

//   const submitAnswers = async () => {
//     try {
//       const response = await api.post("interviews/submit", {
//         interviewId,
//         answers,
//       });
//       console.log("Interview submitted successfully:", response.data);
//     } catch (error) {
//       console.error("Error submitting interview:", error);
//     }
//   };

//   if (isSubmitting) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
//           <p>Interview is being submitted, please wait...</p>
//           <p>Redirecting in {countdown} seconds...</p>
//         </div>
//       </div>
//     );
//   }

//   if (currentQuestionIndex >= questions.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
//           <p>All questions answered!</p>
//         </div>
//         <button
//           onClick={onGoBack}
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {isBuffering ? (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
//           <p>Prepare yourself, the next question will appear in {countdown} seconds...</p>
//         </div>
//       ) : (
//         <QuestionCard
//           question={questions[currentQuestionIndex]}
//           questionNumber={currentQuestionIndex + 1}
//           onSubmit={handleNextQuestion}
//         />
//       )}
//     </div>
//   );
// };

// export default QuestionForm;


// import React, { useState, useEffect } from "react";
// import QuestionCard from "./QuestionCard";
// import api from '../api';

// const QuestionForm = ({ questions, interviewId, onGoBack }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [isBuffering, setIsBuffering] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsBuffering(false), 5000);
//     return () => clearTimeout(timer);
//   }, [currentQuestionIndex]);

//   const handleNextQuestion = (answer) => {
//     setAnswers([...answers, { questionId: questions[currentQuestionIndex].id, content: answer }]);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     setIsBuffering(true);
//   };

//   useEffect(() => {
//     if (currentQuestionIndex >= questions.length) {
//       submitAnswers();
//     }
//   }, [currentQuestionIndex]);

//   const submitAnswers = async () => {
//     try {
//       const response = await api.post("interviews/submit", {
//         interviewId,
//         answers,
//       });
//       console.log("Interview submitted successfully:", response.data);
//     } catch (error) {
//       console.error("Error submitting interview:", error);
//     }
//   };

//   if (currentQuestionIndex >= questions.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
//           <p>All questions answered!</p>
//         </div>
//         <button
//           onClick={onGoBack}
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {isBuffering ? (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
//           <p>Prepare yourself, the next question will appear in 5 seconds...</p>
//         </div>
//       ) : (
//         <QuestionCard
//           question={questions[currentQuestionIndex]}
//           questionNumber={currentQuestionIndex + 1}
//           onSubmit={handleNextQuestion}
//         />
//       )}
//     </div>
//   );
// };

// export default QuestionForm;

import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import api from '../../../api';

const QuestionForm = ({ questions, interviewId, onGoBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = sessionStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });
  const [isBuffering, setIsBuffering] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buffering logic to simulate preparation time
  useEffect(() => {
    const timer = setTimeout(() => setIsBuffering(false), 5000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // Save current state to session storage
  useEffect(() => {
    sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    sessionStorage.setItem('answers', JSON.stringify(answers));
  }, [currentQuestionIndex, answers]);

  // Handle window unload event to submit answers
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      submitAnswers();
      setIsSubmitting(true);
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [answers, interviewId]);

  // Navigate back after submission
  useEffect(() => {
    if (isSubmitting) {
      const timer = setTimeout(() => {
        onGoBack();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, onGoBack]);

  // Handle next question
  const handleNextQuestion = (answer) => {
    console.log( questions[currentQuestionIndex].questionId);
    setAnswers([...answers, { questionId: questions[currentQuestionIndex].questionId, content: answer }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsBuffering(true);
  };

  // Submit answers when all questions are answered
  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      submitAnswers();
      setIsSubmitting(true);
    }
  }, [currentQuestionIndex, questions.length]);

  // Function to submit answers
  const submitAnswers = async () => {
    try {
      const response = await api.post("interviews/submit", {
        interviewId,
        answers,
      });
      console.log("Interview submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting interview:", error);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
          <p>Interview is being submitted in 5 seconds, please wait...</p>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-xl mx-auto">
          <p>All questions answered!</p>
        </div>
        <button
          onClick={onGoBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {isBuffering ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 max-w-xl mx-auto">
          <p>Prepare yourself, the next question will appear in 5 seconds...</p>
        </div>
      ) : (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          onSubmit={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default QuestionForm;
