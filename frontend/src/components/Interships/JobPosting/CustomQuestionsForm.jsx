// import React, { useState } from "react";

// const CustomQuestionsForm = ({ onAddQuestion }) => {
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("");
//   const [option1, setOptio1] = useState("");
//   const [option2, setOption2] = useState("");
//   const [option3, setOption3] = useState("");
//   const [option4, setOption4] = useState("");
//   const [questionIdCounter, setQuestionIdCounter] = useState(1);


//   const addQuestion = () => {
//     if (question && type) {
//       const newQuestion = {
//         id: questionIdCounter,
//         question,
//         type,
//         options:{
//           option1,
//           option2,
//           option3,
//           option4,
//         },
//       };

//       console.log(newQuestion);
//       onAddQuestion(newQuestion);
//       setQuestion("");
//       setType("");
//       setQuestionIdCounter(questionIdCounter + 1);
//     } else {
//       alert("Please fill in both fields.");
//     }
//   };

//   addOptionHandler = () =>{

//   }

//   return (
//     <div className="">
//       <h2>Add Custom Questions</h2>
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Question:</label>
//       <input
//         type="text"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Question Name"
//         className="w-full p-3 border border-gray-300 rounded-md"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Data Type:</label>
//       <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md mb-3">
//         <option value="">Select Data Type</option>
//         <option value="text">Text</option>
//         <option value="number">Number</option>
//         <option value="date">Date</option>
//         <option value="file">File</option>
//         <option value="dropd">Drop Down</option>
//       </select>

//       <input
//         type="text"
//         value={option1}
//         onChange={(e) => setOptio1(e.target.value)}
//         placeholder="Option 1"
//         className="w-full p-3 border border-gray-300 rounded-md"
//       />
//        <input
//         type="text"
//         value={option1}
//         onChange={(e) => setOptio1(e.target.value)}
//         placeholder="Option 2"
//         className="w-full p-3 border border-gray-300 rounded-md"
//       />
//        <input
//         type="text"
//         value={option1}
//         onChange={(e) => setOptio1(e.target.value)}
//         placeholder="Option 3"
//         className="w-full p-3 border border-gray-300 rounded-md"
//       />
//        <input
//         type="text"
//         value={option1}
//         onChange={(e) => setOptio1(e.target.value)}
//         placeholder="Option 4"
//         className="w-full p-3 border border-gray-300 rounded-md"
//       />

//       <button type="button-jp" className="mt-4" onClick={addOptionHandler}>
//         Add Options
//       </button>
      
//       <button type="button-jp" className="mt-4" onClick={addQuestion}>
//         Add Question
//       </button>


//     </div>
//   );
// };

// export default CustomQuestionsForm;


import React, { useState } from "react";

const IntershipCustomQuestionsForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [questionIdCounter, setQuestionIdCounter] = useState(1);

  const addQuestion = () => {
    if (question && type) {
      const newQuestion = {
        id: questionIdCounter,
        question,
        type,
        options: type === "dropd" ? options : [],
      };

      console.log(newQuestion);
      onAddQuestion(newQuestion);
      setQuestion("");
      setType("");
      setOptions([]);
      setOption("");
      setQuestionIdCounter(questionIdCounter + 1);
    } else {
      alert("Please fill in both fields.");
    }
  };

  const addOptionHandler = () => {
    if (option) {
      setOptions([...options, option]);
      setOption(""); // Reset the option input field
    }
  };

  return (
    <div className="">
      <h2>Add Custom Questions</h2>
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
        Question:
      </label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question Name"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
        Data Type:
      </label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-3"
      >
        <option value="">Select Data Type</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="file">File</option>
        <option value="dropd">Drop Down</option>
      </select>

      {type === "dropd" && (
        <div className="mt-3">
          <input
            type="text"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            placeholder="Add Option"
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
          <button
            type="button"
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={addOptionHandler}
          >
            Add Option
          </button>
          <ul className="mt-3">
            {options.map((opt, index) => (
              <li key={index} className="p-2 bg-white-200 rounded mt-2">
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={addQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

export default IntershipCustomQuestionsForm;
