// import React, { useState, useEffect } from "react";
// import { FaVolumeUp } from "react-icons/fa";

// const QuestionCard = ({ question, questionNumber, onSubmit }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsListening(true);
//     };

//     recognition.onresult = (event) => {
//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += transcript;
//         } else {
//           interim += transcript;
//         }
//       }
//       setInterimTranscript(interim);
//       setTranscript((prev) => prev + final);
//     };

//     recognition.onerror = (event) => {
//       console.error(event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     if (isListening) {
//       recognition.start();
//     } else {
//       recognition.stop();
//     }

//     return () => {
//       recognition.stop();
//     };
//   }, [isListening]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       speakQuestion();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [question]);

//   const toggleListening = () => {
//     setIsListening((prevState) => !prevState);
//   };

//   const handleAnswerSubmit = () => {
//     onSubmit(transcript);
//     setTranscript("");
//     setInterimTranscript("");
//   };

//   const speakQuestion = () => {
//     const utterance = new SpeechSynthesisUtterance(question.text);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-xl w-full">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           Question {questionNumber}
//           <button
//             onClick={speakQuestion}
//             className="ml-2 text-blue-500 hover:text-blue-700"
//           >
//             <FaVolumeUp />
//           </button>
//         </h3>
//         <p className="text-gray-800 mb-4">{question.content}</p>
//         <div className="mb-4">
//           <button
//             onClick={toggleListening}
//             className={`bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 ${
//               isListening ? "bg-red-500 hover:bg-red-600" : ""
//             }`}
//           >
//             {isListening ? "Stop Answering" : "Start Answering"}
//           </button>
//         </div>
//         <div className="mb-4">
//           <textarea
//             className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             rows="4"
//             value={transcript}
//             onChange={(e) => setTranscript(e.target.value)}
//           ></textarea>
//           <p className="text-gray-500">{interimTranscript}</p>
//         </div>
//         <button
//           onClick={handleAnswerSubmit}
//           className="bg-green-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-green-600"
//         >
//           Submit Answer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;


// import React, { useState, useEffect } from "react";
// import { FaVolumeUp } from "react-icons/fa";

// const QuestionCard = ({ question, questionNumber, onSubmit }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsListening(true);
//     };

//     recognition.onresult = (event) => {
//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += transcript;
//         } else {
//           interim += transcript;
//         }
//       }
//       setInterimTranscript(interim);
//       setTranscript((prev) => prev + final);
//     };

//     recognition.onerror = (event) => {
//       console.error(event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     if (isListening) {
//       recognition.start();
//     } else {
//       recognition.stop();
//     }

//     return () => {
//       recognition.stop();
//     };
//   }, [isListening]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       speakQuestion();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [question]);

//   const toggleListening = () => {
//     setIsListening((prevState) => !prevState);
//   };

//   const handleAnswerSubmit = () => {
//     onSubmit(transcript);
//     setTranscript("");
//     setInterimTranscript("");
//   };

//   const speakQuestion = () => {
//     const utterance = new SpeechSynthesisUtterance(question.content);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-xl w-full">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           Question {questionNumber}
//           <button
//             onClick={speakQuestion}
//             className="ml-2 text-blue-500 hover:text-blue-700"
//           >
//             <FaVolumeUp />
//           </button>
//         </h3>
//         <p className="text-gray-800 mb-4">{question.content}</p>
//         <div className="mb-4">
//           <button
//             onClick={toggleListening}
//             className={`bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 ${
//               isListening ? "bg-red-500 hover:bg-red-600" : ""
//             }`}
//           >
//             {isListening ? "Stop Answering" : "Start Answering"}
//           </button>
//         </div>
//         <div className="mb-4">
//           <textarea
//             className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             rows="4"
//             value={transcript}
//             onChange={(e) => setTranscript(e.target.value)}
//           ></textarea>
//           <p className="text-gray-500">{interimTranscript}</p>
//         </div>
//         <button
//           onClick={handleAnswerSubmit}
//           className="bg-green-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-green-600"
//         >
//           Submit Answer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;

import React, { useState, useEffect, useRef } from "react";
import { FaVolumeUp } from "react-icons/fa";

const QuestionCard = ({ question, questionNumber, onSubmit }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const hasSpoken = useRef(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      setInterimTranscript(interim);
      setTranscript((prev) => prev + final);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  useEffect(() => {
    if (!hasSpoken.current) {
      const timer = setTimeout(() => {
        speakQuestion();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [question]);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  const handleAnswerSubmit = () => {
    onSubmit(transcript);
    setTranscript("");
    setInterimTranscript("");
  };

  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(question.content);
    utterance.onstart = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };
    utterance.onend = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      hasSpoken.current = true;
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-blue-100 shadow-lg rounded-lg p-6 mb-6 max-w-xl w-full">
        <div className="mb-4 p-2 ">
          <video
            ref={videoRef}
            src="/videos/question-video.mp4"
            loop
            className="w-full"
          ></video>
        </div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          Question {questionNumber}
          <button
            onClick={speakQuestion}
            // className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <FaVolumeUp className=""/>
          </button>
        </h3>
        <p className="text-gray-800 mb-4">{question.content}</p>
        <div className="mb-4">
          <button
            onClick={toggleListening}
            className={`bg-blue-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-blue-600 ${
              isListening ? "bg-red-500 hover:bg-red-600" : ""
            }`}
          >
            {isListening ? "Stop Answering" : "Start Answering"}
          </button>
        </div>
        <div className="mb-4">
          <textarea
            className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="4"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          ></textarea>
          <p className="text-gray-500">{interimTranscript}</p>
        </div>
        <button
          onClick={handleAnswerSubmit}
          className="bg-green-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;