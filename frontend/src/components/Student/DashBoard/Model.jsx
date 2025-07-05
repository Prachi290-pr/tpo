import React, { useState, useEffect } from "react";
import api from "../../../api";
// import api from "api";

const Modal = ({ show, onClose, onConfirm, companyId, companyName, studentId, type }) => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (show && companyId) {
      const cId = companyId.jobId;
      fetchQuestions(cId);
    }
  }, [show, companyId]);

  const fetchQuestions = async (cId) => {
    try {
      console.log(type);
      const response = await api.get(`/que/getquestions/${cId}`);
      const questionsData = response.data[0].question || [];
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error festching questions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleConfirm = async () => {
    const allAnswered = Object.values(answers).every((answer) => answer.trim() !== "");

    if (Object.keys(answers).length === 0) {
      alert("Please fill in all the questions before confirming.");
      return;
    }
    if (!allAnswered) {
      alert("Please fill in all the questions before confirming.");
      return;
    }

    try {
      await api.post('/ans/submit-answers', {
        studentId: studentId,
        companyId: companyId.jobId,
        answers: answers
      });
      onConfirm(answers);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full h-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">
          {companyName}
        </h2>
        <hr />
        <h2 className="text-xl my-4">Please answer the following questions:</h2>
        {questions.length === 0 && <p>No questions available for this company.</p>}
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">{question.question}</label>

            {question.type === 'text' && (
              <textarea
                rows={4}
                name={`answer_${question.id}`}
                value={answers[`answer_${question.id}`] || ''}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full resize-none shadow"
                required
              />
            )}

            {question.type === 'number' && (
              <input
                type="number"
                name={`answer_${question.id}`}
                value={answers[`answer_${question.id}`] || ''}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full shadow"
                required

              />
            )}

            {question.type === 'date' && (
              <input
                type="date"
                name={`answer_${question.id}`}
                value={answers[`answer_${question.id}`] || ''}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full shadow"
                required
              />
            )}

          {question.type === 'dropd' && (
            <>
              <select
                type="number"
                name={`answer_${question.id}`}
                value={answers[`answer_${question.id}`] || ''}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full shadow"
                required
              >
                <option value="">Select Your Answer</option>
              {
                question.options.map(
                  (option, index)=><option value={option}>{option}</option>

                )
              }
              </select>
            </>
            )}

            {question.type === 'file' && (
              <input
                type="file"
                name={`answer_${question.id}`}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full shadow"
                required
              />
            )}
          </div>
        ))}

        
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
