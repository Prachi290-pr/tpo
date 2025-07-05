import React, { useState } from "react";

const CustomQuestionsForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [questionIdCounter, setQuestionIdCounter] = useState(1);

  const addQuestion = () => {
    if (question && type) {
      const newQuestion = {
        id: questionIdCounter,
        question,
        type,
      };
      onAddQuestion(newQuestion);
      setQuestion("");
      setType("");
      setQuestionIdCounter(questionIdCounter + 1);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="">
      <h2>Add Custom Questions</h2>
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question Name"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Data Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md mb-3">
        <option value="">Select Data Type</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="file">File</option>
      </select>
      <button type="button-jp" className="mt-4" onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default CustomQuestionsForm;
